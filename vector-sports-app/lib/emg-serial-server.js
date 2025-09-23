const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const WebSocket = require('ws');
const http = require('http');

// Configuration
const ARDUINO_BAUD_RATE = 115200;
const WEBSOCKET_PORT = 3001;

// Store connected WebSocket clients
const clients = new Set();

// EMG gesture mappings
const GESTURE_MAPPING = {
  '0': { name: 'Idle', description: 'No muscle activity detected', color: '#6b7280' },
  '1': { name: 'Gesture 1', description: 'Channel 1 dominant', color: '#ef4444' },
  '2': { name: 'Gesture 2', description: 'Channel 2 dominant', color: '#3b82f6' },
  '3': { name: 'Gesture 3', description: 'Low activity both channels', color: '#10b981' },
  '4': { name: 'Gesture 4', description: 'Channel 1 + some Channel 2', color: '#f59e0b' },
  '5': { name: 'Gesture 5', description: 'Channel 2 + some Channel 1', color: '#8b5cf6' }
};

// WebSocket server setup
const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Variables to track EMG data
let currentGesture = '0';
let gestureHistory = [];
let connectionStatus = {
  arduino: false,
  lastData: null,
  port: null
};

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('Frontend client connected');
  clients.add(ws);
  
  // Send current status to new client
  ws.send(JSON.stringify({
    type: 'connection_status',
    arduino: connectionStatus.arduino,
    currentGesture: currentGesture,
    timestamp: Date.now()
  }));
  
  ws.on('close', () => {
    console.log('Frontend client disconnected');
    clients.delete(ws);
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
});

// Broadcast data to all connected clients
function broadcastData(data) {
  const message = JSON.stringify(data);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Find Arduino port automatically
async function findArduinoPort() {
  try {
    const ports = await SerialPort.list();
    console.log('Available ports:', ports.map(p => `${p.path} (${p.manufacturer})`));
    
    // Look for common Arduino identifiers
    const arduinoPort = ports.find(port => 
      port.manufacturer && (
        port.manufacturer.toLowerCase().includes('arduino') ||
        port.manufacturer.toLowerCase().includes('ch340') ||
        port.manufacturer.toLowerCase().includes('cp210') ||
        port.manufacturer.toLowerCase().includes('ftdi')
      )
    );
    
    if (arduinoPort) {
      console.log(`Found Arduino on port: ${arduinoPort.path}`);
      return arduinoPort.path;
    }
    
    // If no Arduino found, try common ports
    const commonPorts = ['COM3', 'COM4', 'COM5', '/dev/ttyUSB0', '/dev/ttyACM0'];
    for (const port of commonPorts) {
      const availablePort = ports.find(p => p.path === port);
      if (availablePort) {
        console.log(`Trying common port: ${port}`);
        return port;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error finding Arduino port:', error);
    return null;
  }
}

// Connect to Arduino
async function connectToArduino() {
  try {
    const portPath = await findArduinoPort();
    
    if (!portPath) {
      console.log('No Arduino port found. Please check connection.');
      setTimeout(connectToArduino, 5000); // Retry in 5 seconds
      return;
    }
    
    const port = new SerialPort({
      path: portPath,
      baudRate: ARDUINO_BAUD_RATE,
    });
    
    const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));
    
    port.on('open', () => {
      console.log(`Connected to Arduino on ${portPath}`);
      connectionStatus.arduino = true;
      connectionStatus.port = portPath;
      
      broadcastData({
        type: 'connection_status',
        arduino: true,
        port: portPath,
        timestamp: Date.now()
      });
    });
    
    port.on('error', (err) => {
      console.error('Arduino connection error:', err);
      connectionStatus.arduino = false;
      
      broadcastData({
        type: 'connection_status',
        arduino: false,
        error: err.message,
        timestamp: Date.now()
      });
      
      // Retry connection after 5 seconds
      setTimeout(connectToArduino, 5000);
    });
    
    port.on('close', () => {
      console.log('Arduino connection closed');
      connectionStatus.arduino = false;
      
      broadcastData({
        type: 'connection_status',
        arduino: false,
        timestamp: Date.now()
      });
      
      // Retry connection after 3 seconds
      setTimeout(connectToArduino, 3000);
    });
    
    // Parse incoming data
    parser.on('data', (data) => {
      const gesture = data.trim();
      
      // Validate gesture data
      if (!/^[0-5]$/.test(gesture)) {
        return; // Ignore invalid data
      }
      
      currentGesture = gesture;
      connectionStatus.lastData = Date.now();
      
      // Add to history (keep last 100 readings)
      gestureHistory.push({
        gesture: gesture,
        timestamp: Date.now(),
        gestureInfo: GESTURE_MAPPING[gesture]
      });
      
      if (gestureHistory.length > 100) {
        gestureHistory.shift();
      }
      
      // Broadcast EMG data
      broadcastData({
        type: 'emg_data',
        gesture: gesture,
        gestureInfo: GESTURE_MAPPING[gesture],
        timestamp: Date.now(),
        history: gestureHistory.slice(-20) // Send last 20 readings
      });
    });
    
  } catch (error) {
    console.error('Failed to connect to Arduino:', error);
    setTimeout(connectToArduino, 5000);
  }
}

// Start WebSocket server
server.listen(WEBSOCKET_PORT, () => {
  console.log(`EMG WebSocket server running on port ${WEBSOCKET_PORT}`);
  console.log('Searching for Arduino...');
  
  // Start Arduino connection
  connectToArduino();
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down EMG server...');
  wss.close();
  server.close();
  process.exit(0);
});

module.exports = { broadcastData, GESTURE_MAPPING };