// Enhanced Arduino code with JSON output (OPTIONAL - your current code works perfectly!)
// Only use this if you want more detailed data

// Add this at the top with your existing includes
// #include <ArduinoJson.h>  // Only if you want JSON output

// Replace the Serial.println() calls in your main loop with this function:
void sendGestureData(int gesture, int envelope1, int envelope2) {
  // Option 1: Simple output (your current working approach)
  Serial.println(gesture);
  
  /* Option 2: JSON output for more detailed data (uncomment if needed)
  StaticJsonDocument<200> doc;
  doc["gesture"] = gesture;
  doc["envelope1"] = envelope1;
  doc["envelope2"] = envelope2;
  doc["timestamp"] = millis();
  doc["threshold1"] = threshold1;
  doc["threshold2"] = threshold2;
  doc["deviceId"] = "emg_001";
  
  String jsonString;
  serializeJson(doc, jsonString);
  Serial.println(jsonString);
  */
}

// Then in your main loop, replace the Serial.println() calls:
// Instead of: Serial.println("1");
// Use: sendGestureData(1, envelope1, envelope2);

// Your current code is perfect and doesn't need these changes!