// Simple Arduino Test Code for EMG Integration
// Upload this to your Arduino to test the connection

void setup() {
  Serial.begin(115200);
  // Initialize analog pins
  pinMode(A0, INPUT);
  pinMode(A2, INPUT);
}

void loop() {
  // Read analog values from EMG channels
  int ch1 = analogRead(A0);
  int ch2 = analogRead(A2);
  
  // Simple gesture detection based on threshold
  int gesture = 0;
  
  if (ch1 > 512 && ch2 > 512) {
    gesture = 3; // Both channels active
  } else if (ch1 > 512) {
    gesture = 1; // Channel 1 dominant
  } else if (ch2 > 512) {
    gesture = 2; // Channel 2 dominant
  } else if (ch1 > 256 || ch2 > 256) {
    gesture = 4; // Low activity
  } else {
    gesture = 0; // Idle
  }
  
  // Send gesture value to serial
  Serial.println(gesture);
  
  delay(100); // Send data every 100ms
}