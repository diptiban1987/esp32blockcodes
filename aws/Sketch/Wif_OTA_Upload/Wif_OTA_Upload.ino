// ── TechyGuide OTA (ArduinoOTA over WiFi) ─────────────────────────────────
#include <WiFi.h>
#include <ArduinoOTA.h>
#include <esp_wifi.h>

const char* _ota_ssid = "Diptiban Mobile";
const char* _ota_pass = "Indian@2021";
const char* _ota_hostname = "techyguide";
bool _otaReady = false;

void _setupOTA() {
  WiFi.mode(WIFI_STA);
  WiFi.setHostname(_ota_hostname);
  WiFi.begin(_ota_ssid, _ota_pass);
  Serial.print("Connecting to WiFi");
  unsigned long _t = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - _t < 15000) {
    delay(500); Serial.print(".");
  }
  Serial.println();
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("OTA: WiFi connection failed! Check SSID/password.");
    return;
  }
  Serial.print("WiFi connected! IP: "); Serial.println(WiFi.localIP());

  // Disable power saving — keeps connection stable during OTA flash
  esp_wifi_set_ps(WIFI_PS_NONE);

  ArduinoOTA.setHostname(_ota_hostname);
  ArduinoOTA.setPort(3232);

  ArduinoOTA.onStart([]() {
    String type = (ArduinoOTA.getCommand() == U_FLASH) ? "firmware" : "filesystem";
    Serial.println("OTA START: " + type);
  });
  ArduinoOTA.onEnd([]() {
    Serial.println("\nOTA END — Rebooting...");
  });
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress * 100) / total);
    yield();
  });
  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("OTA ERROR [%u]: ", error);
    if      (error == OTA_AUTH_ERROR)    Serial.println("Auth Failed");
    else if (error == OTA_BEGIN_ERROR)   Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR)     Serial.println("End Failed");
  });

  ArduinoOTA.begin();
  _otaReady = true;
  Serial.println("─────────────────────────────────");
  Serial.print("OTA ready at http://"); Serial.println(WiFi.localIP());
  Serial.print("  ArduinoOTA: "); Serial.print(_ota_hostname); Serial.println(".local:3232");
  Serial.println("─────────────────────────────────");
}


void setup() {
  Serial.begin(115200);
  _setupOTA();
  pinMode(13, OUTPUT);
}

void loop() {
  if (_otaReady) ArduinoOTA.handle();
  digitalWrite(13, HIGH);
  delay((long)(3 * 1000));
  digitalWrite(13, LOW);
}
