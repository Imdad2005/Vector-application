// Simple Arduino Connection Test
const { spawn } = require('child_process');

console.log('Testing Arduino connection on COM7...');

// Test PowerShell serial connection
const powershellScript = `
try {
    $port = new-Object System.IO.Ports.SerialPort COM7,115200,None,8,one
    $port.Open()
    Write-Host "Successfully opened COM7"
    Start-Sleep -Seconds 2
    
    # Try to read any data
    if($port.BytesToRead -gt 0) {
        $data = $port.ReadExisting()
        Write-Host "Received data: $data"
    } else {
        Write-Host "No data received from Arduino"
    }
    
    $port.Close()
    Write-Host "Port closed successfully"
} catch {
    Write-Host "Error: $_"
}
`;

const test = spawn('powershell', ['-Command', powershellScript], {
  stdio: ['pipe', 'pipe', 'pipe']
});

test.stdout.on('data', (data) => {
  console.log('OUTPUT:', data.toString());
});

test.stderr.on('data', (data) => {
  console.log('ERROR:', data.toString());
});

test.on('close', (code) => {
  console.log(`Test completed with code ${code}`);
});