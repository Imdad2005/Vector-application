// Simple EMG Server without external dependencies
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

// Configuration
const WEBSOCKET_PORT = 3001;
const HTTP_PORT = 3002;

// Store connected clients
const clients = new Set();

// EMG gesture mappings based on your Arduino code
const GESTURE_MAPPING = {
  '0': { name: 'Idle', description: 'No muscle activity detected', color: '#6b7280', envelope1: 0, envelope2: 0 },
  '1': { name: 'Channel 1 Dominant', description: 'Strong signal on Channel 1', color: '#ef4444', envelope1: 70, envelope2: 15 },
  '2': { name: 'Channel 2 Dominant', description: 'Strong signal on Channel 2', color: '#3b82f6', envelope1: 15, envelope2: 80 },
  '3': { name: 'Low Activity Both', description: 'Low activity on both channels', color: '#10b981', envelope1: 25, envelope2: 25 },
  '4': { name: 'Mixed Signal 1', description: 'Ch1 dominant + some Ch2', color: '#f59e0b', envelope1: 60, envelope2: 25 },
  '5': { name: 'Mixed Signal 2', description: 'Ch2 dominant + some Ch1', color: '#8b5cf6', envelope1: 25, envelope2: 70 }
};

// Variables to track EMG data
let currentGesture = '0';
let gestureHistory = [];
let connectionStatus = {
  arduino: false,
  lastData: null,
  port: null,
  envelope1: 0,
  envelope2: 0
};

// Simple WebSocket implementation
function createWebSocketServer() {
  const server = http.createServer((req, res) => {
    // Handle HTTP requests
    if (req.method === 'GET' && req.url === '/status') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        connected: connectionStatus.arduino,
        currentGesture,
        lastData: connectionStatus.lastData
      }));
      return;
    }
    
    res.writeHead(404);
    res.end('Not Found');
  });

  server.on('upgrade', (request, socket, head) => {
    // Simple WebSocket handshake
    const key = request.headers['sec-websocket-key'];
    const acceptKey = require('crypto')
      .createHash('sha1')
      .update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
      .digest('base64');

    socket.write([
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${acceptKey}`,
      '', ''
    ].join('\r\n'));

    clients.add(socket);
    
    // Send current status
    sendToClient(socket, {
      type: 'connection_status',
      arduino: connectionStatus.arduino,
      currentGesture,
      timestamp: Date.now()
    });

    socket.on('close', () => {
      clients.delete(socket);
    });

    socket.on('error', () => {
      clients.delete(socket);
    });
  });

  return server;
}

// Send data to a specific client
function sendToClient(socket, data) {
  try {
    const message = JSON.stringify(data);
    const messageBuffer = Buffer.from(message);
    const frame = Buffer.alloc(2 + messageBuffer.length);
    
    frame[0] = 0x81; // Text frame
    frame[1] = messageBuffer.length;
    messageBuffer.copy(frame, 2);
    
    socket.write(frame);
  } catch (error) {
    console.error('Error sending to client:', error);
  }
}

// Broadcast data to all connected clients
function broadcastData(data) {
  clients.forEach((client) => {
    sendToClient(client, data);
  });
}

// Find Arduino port (Windows specific)
function findArduinoPort() {
  // Arduino detected on COM7 (USB Serial Device with VID_2341)
  const arduinoPort = 'COM7';
  console.log(`Using Arduino port: ${arduinoPort}`);
  return arduinoPort;
}

// Connect to Arduino using PowerShell
function connectToArduino() {
  const portPath = findArduinoPort();
  console.log(`Attempting to connect to Arduino on ${portPath}`);
  
  // Use PowerShell to read from serial port with error handling
  const powershellScript = `
    try {
      $port = new-Object System.IO.Ports.SerialPort ${portPath},115200,None,8,one
      $port.Open()
      Write-Host "Connected to Arduino on ${portPath}"
      
      while($port.IsOpen) {
        try {
          if($port.BytesToRead -gt 0) {
            $data = $port.ReadLine()
            if($data -match '^[0-5]$') {
              Write-Output $data.Trim()
            }
          }
          Start-Sleep -Milliseconds 50
        } catch {
          # Continue if read fails
        }
      }
      $port.Close()
    } catch {
      Write-Host "Failed to connect to ${portPath}: $_"
      exit 1
    }
  `;
  
  const arduino = spawn('powershell', ['-Command', powershellScript], {
    stdio: ['pipe', 'pipe', 'pipe']
  });
  
  arduino.stdout.on('data', (data) => {
    const output = data.toString().trim();
    
    // Debug: Log all received data
    console.log('RAW DATA FROM ARDUINO:', JSON.stringify(output));
    
    // Check for connection success message
    if (output.includes('Connected to Arduino')) {
      if (!connectionStatus.arduino) {
        connectionStatus.arduino = true;
        connectionStatus.port = portPath;
        console.log(`✓ Arduino connected on ${portPath}`);
        
        broadcastData({
          type: 'connection_status',
          arduino: true,
          port: portPath,
          timestamp: Date.now()
        });
      }
      return;
    }
    
    // Process gesture data - check for any numeric value
    const gesture = output;
    console.log('PROCESSING GESTURE:', gesture);
    
    if (!/^[0-5]$/.test(gesture)) {
      console.log('INVALID GESTURE DATA - Expected 0-5, got:', gesture);
      return; // Ignore invalid data
    }
    
    console.log('✓ VALID GESTURE RECEIVED:', gesture);
    
    currentGesture = gesture;
    connectionStatus.lastData = Date.now();
    
    // Simulate envelope values based on gesture
    const gestureInfo = GESTURE_MAPPING[gesture];
    connectionStatus.envelope1 = gestureInfo.envelope1;
    connectionStatus.envelope2 = gestureInfo.envelope2;
    
    console.log('ENVELOPE VALUES:', { envelope1: gestureInfo.envelope1, envelope2: gestureInfo.envelope2 });
    
    // Add to history
    gestureHistory.push({
      gesture: gesture,
      timestamp: Date.now(),
      gestureInfo: gestureInfo,
      envelope1: gestureInfo.envelope1,
      envelope2: gestureInfo.envelope2
    });
    
    if (gestureHistory.length > 100) {
      gestureHistory.shift();
    }
    
    // Broadcast EMG data
    broadcastData({
      type: 'emg_data',
      gesture: gesture,
      gestureInfo: gestureInfo,
      envelope1: gestureInfo.envelope1,
      envelope2: gestureInfo.envelope2,
      timestamp: Date.now(),
      history: gestureHistory.slice(-20)
    });
    
    console.log('✓ DATA BROADCASTED TO CLIENTS');
  });
  
  arduino.stderr.on('data', (data) => {
    console.error(`Arduino error: ${data}`);
    connectionStatus.arduino = false;
    
    broadcastData({
      type: 'connection_status',
      arduino: false,
      error: data.toString(),
      timestamp: Date.now()
    });
  });
  
  arduino.on('close', (code) => {
    console.log(`Arduino connection closed with code ${code}`);
    connectionStatus.arduino = false;
    
    broadcastData({
      type: 'connection_status',
      arduino: false,
      timestamp: Date.now()
    });
    
    // Retry connection after 3 seconds
    setTimeout(connectToArduino, 3000);
  });
}

// Start the server
const server = createWebSocketServer();

server.listen(WEBSOCKET_PORT, () => {
  console.log(`EMG WebSocket server running on port ${WEBSOCKET_PORT}`);
  console.log('Searching for Arduino...');
  
  // Start Arduino connection
  connectToArduino();
  
  // Test mode - simulate gestures if no real data received
  let testGesture = 0;
  let lastDataTime = Date.now();
  
  setInterval(() => {
    const timeSinceLastData = Date.now() - (connectionStatus.lastData || 0);
    
    // If no real data received for 5 seconds, start test mode
    if (timeSinceLastData > 5000 && connectionStatus.arduino) {
      console.log('⚠️  No real Arduino data - Starting test mode');
      
      testGesture = (testGesture + 1) % 6;
      const gestureInfo = GESTURE_MAPPING[testGesture.toString()];
      
      currentGesture = testGesture.toString();
      connectionStatus.lastData = Date.now();
      connectionStatus.envelope1 = gestureInfo.envelope1;
      connectionStatus.envelope2 = gestureInfo.envelope2;
      
      // Add to history
      gestureHistory.push({
        gesture: testGesture.toString(),
        timestamp: Date.now(),
        gestureInfo: gestureInfo,
        envelope1: gestureInfo.envelope1,
        envelope2: gestureInfo.envelope2
      });
      
      if (gestureHistory.length > 100) {
        gestureHistory.shift();
      }
      
      // Broadcast test data
      broadcastData({
        type: 'emg_data',
        gesture: testGesture.toString(),
        gestureInfo: gestureInfo,
        envelope1: gestureInfo.envelope1,
        envelope2: gestureInfo.envelope2,
        timestamp: Date.now(),
        history: gestureHistory.slice(-20)
      });
      
      console.log(`📊 Test gesture ${testGesture} sent (envelope1: ${gestureInfo.envelope1}, envelope2: ${gestureInfo.envelope2})`);
    }
  }, 2000); // Check every 2 seconds
  
  // Demo mode - simulate gestures when no Arduino connected
  let demoGesture = 0;
  setInterval(() => {
    if (!connectionStatus.arduino) {
      // Simulate gesture cycling in demo mode
      demoGesture = (demoGesture + 1) % 6;
      const gestureInfo = GESTURE_MAPPING[demoGesture.toString()];
      
      currentGesture = demoGesture.toString();
      connectionStatus.lastData = Date.now();
      connectionStatus.envelope1 = gestureInfo.envelope1;
      connectionStatus.envelope2 = gestureInfo.envelope2;
      
      // Add to history
      gestureHistory.push({
        gesture: demoGesture.toString(),
        timestamp: Date.now(),
        gestureInfo: gestureInfo,
        envelope1: gestureInfo.envelope1,
        envelope2: gestureInfo.envelope2
      });
      
      if (gestureHistory.length > 100) {
        gestureHistory.shift();
      }
      
      // Broadcast demo data
      broadcastData({
        type: 'emg_data',
        gesture: demoGesture.toString(),
        gestureInfo: gestureInfo,
        envelope1: gestureInfo.envelope1,
        envelope2: gestureInfo.envelope2,
        timestamp: Date.now(),
        history: gestureHistory.slice(-20)
      });
      
      // Send demo connection status
      broadcastData({
        type: 'connection_status',
        arduino: true, // Show as connected in demo mode
        port: 'DEMO_MODE',
        timestamp: Date.now()
      });
    }
  }, 2000); // Change gesture every 2 seconds in demo mode
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down EMG server...');
  server.close();
  process.exit(0);
});