// ExamplesModal — Interactive curriculum library for Grade 3 to Grade 12 projects.
import { refreshIcons } from './icons';
import { loadProjectData } from '../project';
import { showToast } from './ModeSwitcher';

let _overlay = null;
let _workspace = null;
let _currentGrade = 4;
let _searchQuery = '';

export const GRADE_CURRICULUM = [
  {
    grade: 3,
    level: 'Primary',
    topic: 'Introduction to Signals & Visual Logic',
    color: '#10B981',
    examples: [
      {
        id: 'g3_led_on',
        title: 'Simple LED Turn ON',
        board: 'ESP32 / Pico',
        pins: 'Pin 13 (LED)',
        desc: 'Sets digital Pin 13 HIGH on startup to turn ON an LED continuously.',
        file: 'blocks/grade_3/01_simple_led_on.techyguide',
        cpp: 'void setup() {\n  pinMode(13, OUTPUT);\n  digitalWrite(13, HIGH);\n}\nvoid loop() {\n}',
        py: 'from machine import Pin\nled = Pin(13, Pin.OUT)\nled.value(1)',
        blocks: {
          languageVersion: 0,
          blocks: [{
            type: 'esp32_when_starts', id: 'start_g3_1', x: 60, y: 30,
            inputs: {
              SETUP: { block: { type: 'esp32_set_digital_pin', id: 'led_13_on', fields: { PIN: 13, STATE: '1' } } }
            }
          }]
        }
      }
    ]
  },
  {
    grade: 4,
    level: 'Primary',
    topic: 'Loops, Timing & Sequences',
    color: '#0284C7',
    examples: [
      {
        id: 'g4_led_blink',
        title: 'LED Blinking (1 Second Interval)',
        board: 'ESP32 / Pico',
        pins: 'Pin 13 (LED)',
        desc: 'Blinks an LED on Pin 13 ON for 1 second and OFF for 1 second in a continuous loop.',
        file: 'blocks/grade_4/01_led_blinking_pin13.techyguide',
        cpp: 'void setup() {\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}',
        py: 'from machine import Pin\nimport time\nled = Pin(13, Pin.OUT)\nwhile True:\n    led.value(1)\n    time.sleep(1)\n    led.value(0)\n    time.sleep(1)',
        blocks: {
          languageVersion: 0,
          blocks: [{
            type: 'esp32_when_starts', id: 'start_g4_1', x: 60, y: 30,
            inputs: {
              LOOP: {
                block: {
                  type: 'esp32_set_digital_pin', id: 'led_13_h', fields: { PIN: 13, STATE: '1' },
                  next: {
                    block: {
                      type: 'wait_block', id: 'w1', fields: { TIME: 1 },
                      next: {
                        block: {
                          type: 'esp32_set_digital_pin', id: 'led_13_l', fields: { PIN: 13, STATE: '0' },
                          next: { block: { type: 'wait_block', id: 'w2', fields: { TIME: 1 } } }
                        }
                      }
                    }
                  }
                }
              }
            }
          }]
        }
      }
    ]
  },
  {
    grade: 5,
    level: 'Middle',
    topic: 'Digital Inputs & Interactive Controls',
    color: '#6366F1',
    examples: [
      {
        id: 'g5_button_led',
        title: 'Push Button LED Toggle',
        board: 'ESP32 / Pico',
        pins: 'Pin 4 (Button), Pin 13 (LED)',
        desc: 'Reads digital input from tactile push button on Pin 4 to light up the LED on Pin 13 when pressed.',
        file: 'blocks/grade_5/01_push_button_led.techyguide',
        cpp: 'void setup() {\n  pinMode(4, INPUT_PULLUP);\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  if (digitalRead(4) == LOW) {\n    digitalWrite(13, HIGH);\n  } else {\n    digitalWrite(13, LOW);\n  }\n}',
        py: 'from machine import Pin\nbtn = Pin(4, Pin.IN, Pin.PULL_UP)\nled = Pin(13, Pin.OUT)\nwhile True:\n    led.value(1 if btn.value() == 0 else 0)',
        blocks: {
          languageVersion: 0,
          blocks: [{
            type: 'esp32_when_starts', id: 'start_g5_1', x: 60, y: 30,
            inputs: {
              LOOP: {
                block: {
                  type: 'controls_if', id: 'if_btn', extraState: { hasElse: true },
                  inputs: {
                    IF0: { block: { type: 'esp32_tactile_switch', id: 'btn_pin4', fields: { PIN: '4' } } },
                    DO0: { block: { type: 'esp32_set_digital_pin', id: 'led_on_btn', fields: { PIN: 13, STATE: '1' } } },
                    ELSE: { block: { type: 'esp32_set_digital_pin', id: 'led_off_btn', fields: { PIN: 13, STATE: '0' } } }
                  }
                }
              }
            }
          }]
        }
      }
    ]
  },
  {
    grade: 6,
    level: 'Middle',
    topic: 'Ultrasonic Sonar & Distance Detection',
    color: '#8B5CF6',
    examples: [
      {
        id: 'g6_sonar',
        title: 'Ultrasonic Distance Alert Radar',
        board: 'ESP32 / Pico',
        pins: 'Trig: 14, Echo: 27, Buzzer: 13',
        desc: 'Measures obstacle distance in cm. If an object comes closer than 20cm, it activates the alert on Pin 13.',
        file: 'blocks/grade_6/01_ultrasonic_distance_alert.techyguide',
        cpp: 'void setup() {\n  Serial.begin(115200);\n  pinMode(14, OUTPUT);\n  pinMode(27, INPUT);\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(14, LOW); delayMicroseconds(2);\n  digitalWrite(14, HIGH); delayMicroseconds(10); digitalWrite(14, LOW);\n  long dist = pulseIn(27, HIGH) / 58;\n  if (dist < 20) { digitalWrite(13, HIGH); } else { digitalWrite(13, LOW); }\n  delay(100);\n}',
        py: '# Ultrasonic Radar\nimport time',
        blocks: {
          languageVersion: 0,
          blocks: [{
            type: 'esp32_when_starts', id: 'start_g6_1', x: 60, y: 30,
            inputs: {
              SETUP: { block: { type: 'esp32_ultrasonic_setup', id: 'us_init', fields: { TRIG: '14', ECHO: '27' } } },
              LOOP: {
                block: {
                  type: 'controls_if', id: 'if_dist', extraState: { hasElse: true },
                  inputs: {
                    IF0: { block: { type: 'esp32_ultrasonic_obstacle_detected', id: 'us_obs', fields: { DISTANCE: 20 } } },
                    DO0: { block: { type: 'esp32_set_digital_pin', id: 'buz_on', fields: { PIN: 13, STATE: '1' } } },
                    ELSE: { block: { type: 'esp32_set_digital_pin', id: 'buz_off', fields: { PIN: 13, STATE: '0' } } }
                  }
                }
              }
            }
          }]
        }
      }
    ]
  },
  {
    grade: 7,
    level: 'Middle',
    topic: 'Analog Sensors & Smart Lighting (LDR)',
    color: '#EC4899',
    examples: [
      {
        id: 'g7_street_light',
        title: 'Smart Street Light (LDR Sensor)',
        board: 'ESP32 / Pico',
        pins: 'LDR Analog: Pin 34, Light: Pin 13',
        desc: 'Reads analog ambient light level from LDR sensor. Automatically turns ON the street light when darkness falls.',
        file: 'blocks/grade_7/01_smart_street_light_ldr.techyguide',
        cpp: 'void setup() {\n  Serial.begin(115200);\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  int lightVal = analogRead(34);\n  if (lightVal < 1500) {\n    digitalWrite(13, HIGH);\n  } else {\n    digitalWrite(13, LOW);\n  }\n  delay(200);\n}',
        py: '# LDR Street Light',
        blocks: {
          languageVersion: 0,
          blocks: [{
            type: 'esp32_when_starts', id: 'start_g7_1', x: 60, y: 30,
            inputs: {
              LOOP: {
                block: {
                  type: 'controls_if', id: 'if_dark', extraState: { hasElse: true },
                  inputs: {
                    IF0: {
                      block: {
                        type: 'logic_compare', id: 'comp_ldr', fields: { OP: 'LT' },
                        inputs: {
                          A: { block: { type: 'esp32_read_analog_pin', id: 'ldr_pin34', fields: { PIN: 34 } } },
                          B: { block: { type: 'math_number', id: 'thresh_1500', fields: { NUM: 1500 } } }
                        }
                      }
                    },
                    DO0: { block: { type: 'esp32_set_digital_pin', id: 'light_on', fields: { PIN: 13, STATE: '1' } } },
                    ELSE: { block: { type: 'esp32_set_digital_pin', id: 'light_off', fields: { PIN: 13, STATE: '0' } } }
                  }
                }
              }
            }
          }]
        }
      }
    ]
  },
  {
    grade: 8,
    level: 'High',
    topic: 'Climate Monitoring & Actuators',
    color: '#F59E0B',
    examples: [
      {
        id: 'g8_dht11',
        title: 'DHT11 Climate & Environment Station',
        board: 'ESP32 / Pico',
        pins: 'DHT11 Data: Pin 33',
        desc: 'Initializes and reads temperature (°C) and humidity (%) from the digital DHT11 sensor.',
        file: 'blocks/grade_8/01_dht11_temp_humidity.techyguide',
        cpp: 'void setup() {\n  Serial.begin(115200);\n}\nvoid loop() {\n  delay(2000);\n}',
        py: '# DHT11 Sensor',
        blocks: {
          languageVersion: 0,
          blocks: [{
            type: 'esp32_when_starts', id: 'start_g8_1', x: 60, y: 30,
            inputs: {
              SETUP: { block: { type: 'esp32_dht_setup', id: 'dht_init', fields: { PIN: '33', TYPE: 'DHT11' } } }
            }
          }]
        }
      }
    ]
  },
  {
    grade: 9,
    level: 'High',
    topic: 'Smart Agriculture & Automation',
    color: '#10B981',
    examples: [
      {
        id: 'g9_watering',
        title: 'Smart Plant Watering System',
        board: 'ESP32 / Pico',
        pins: 'Soil Sensor: Pin 32, Water Pump Relay: Pin 23',
        desc: 'Monitors soil dryness. Automatically triggers the water pump relay when soil moisture drops below threshold.',
        file: 'blocks/grade_9/01_smart_plant_watering.techyguide',
        cpp: 'void setup() {\n  Serial.begin(115200);\n  pinMode(23, OUTPUT);\n}\nvoid loop() {\n  int soil = analogRead(32);\n  if (soil > 2500) {\n    digitalWrite(23, HIGH);\n  } else {\n    digitalWrite(23, LOW);\n  }\n  delay(500);\n}',
        py: '# Plant Watering',
        blocks: {
          languageVersion: 0,
          blocks: [{
            type: 'esp32_when_starts', id: 'start_g9_1', x: 60, y: 30,
            inputs: {
              LOOP: {
                block: {
                  type: 'controls_if', id: 'if_dry', extraState: { hasElse: true },
                  inputs: {
                    IF0: {
                      block: {
                        type: 'logic_compare', id: 'comp_dry', fields: { OP: 'GT' },
                        inputs: {
                          A: { block: { type: 'esp32_read_analog_pin', id: 'soil_pin32', fields: { PIN: 32 } } },
                          B: { block: { type: 'math_number', id: 'dry_2500', fields: { NUM: 2500 } } }
                        }
                      }
                    },
                    DO0: { block: { type: 'esp32_set_digital_pin', id: 'pump_on', fields: { PIN: 23, STATE: '1' } } },
                    ELSE: { block: { type: 'esp32_set_digital_pin', id: 'pump_off', fields: { PIN: 23, STATE: '0' } } }
                  }
                }
              }
            }
          }]
        }
      }
    ]
  },
  {
    grade: 10,
    level: 'High',
    topic: 'Security Systems & PIR Sensors',
    color: '#EF4444',
    examples: [
      {
        id: 'g10_pir',
        title: 'PIR Motion Intruder Security Alarm',
        board: 'ESP32 / Pico',
        pins: 'PIR Sensor: Pin 19, Alarm Buzzer: Pin 13',
        desc: 'Detects infrared radiation from moving human bodies and sounds an alarm when motion is sensed.',
        file: 'blocks/grade_10/01_pir_motion_intruder_alarm.techyguide',
        cpp: 'void setup() {\n  Serial.begin(115200);\n  pinMode(19, INPUT);\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  if (digitalRead(19) == HIGH) {\n    digitalWrite(13, HIGH);\n  } else {\n    digitalWrite(13, LOW);\n  }\n  delay(100);\n}',
        py: '# PIR Alarm',
        blocks: {
          languageVersion: 0,
          blocks: [{
            type: 'esp32_when_starts', id: 'start_g10_1', x: 60, y: 30,
            inputs: {
              LOOP: {
                block: {
                  type: 'controls_if', id: 'if_pir', extraState: { hasElse: true },
                  inputs: {
                    IF0: {
                      block: {
                        type: 'logic_compare', id: 'comp_pir', fields: { OP: 'EQ' },
                        inputs: {
                          A: { block: { type: 'esp32_read_digital_pin', id: 'pir_pin19', fields: { PIN: 19 } } },
                          B: { block: { type: 'math_number', id: 'one', fields: { NUM: 1 } } }
                        }
                      }
                    },
                    DO0: { block: { type: 'esp32_set_digital_pin', id: 'alarm_on', fields: { PIN: 13, STATE: '1' } } },
                    ELSE: { block: { type: 'esp32_set_digital_pin', id: 'alarm_off', fields: { PIN: 13, STATE: '0' } } }
                  }
                }
              }
            }
          }]
        }
      }
    ]
  },
  {
    grade: 11,
    level: 'Senior',
    topic: 'Robotics & Dual Motor Drivers (L298N)',
    color: '#06B6D4',
    examples: [
      {
        id: 'g11_robot_car',
        title: 'L298N Robot Car Forward & Stop Sequence',
        board: 'ESP32 / Pico',
        pins: 'Motor Left: 26/27, Motor Right: 14/12',
        desc: 'Controls dual H-bridge motor driver to drive 2 DC motors forward for 2 seconds, then halt.',
        file: 'blocks/grade_11/01_l298n_robot_car_dual_motor.techyguide',
        cpp: 'void setup() {\n  pinMode(26, OUTPUT); pinMode(27, OUTPUT);\n  pinMode(14, OUTPUT); pinMode(12, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(26, HIGH); digitalWrite(27, LOW);\n  digitalWrite(14, HIGH); digitalWrite(12, LOW);\n  delay(2000);\n  digitalWrite(26, LOW); digitalWrite(27, LOW);\n  digitalWrite(14, LOW); digitalWrite(12, LOW);\n  delay(1000);\n}',
        py: '# Robot Car',
        blocks: {
          languageVersion: 0,
          blocks: [{
            type: 'esp32_when_starts', id: 'start_g11_1', x: 60, y: 30,
            inputs: {
              LOOP: {
                block: {
                  type: 'esp32_set_digital_pin', id: 'm1a', fields: { PIN: 26, STATE: '1' },
                  next: {
                    block: {
                      type: 'esp32_set_digital_pin', id: 'm1b', fields: { PIN: 27, STATE: '0' },
                      next: {
                        block: {
                          type: 'esp32_set_digital_pin', id: 'm2a', fields: { PIN: 14, STATE: '1' },
                          next: {
                            block: {
                              type: 'esp32_set_digital_pin', id: 'm2b', fields: { PIN: 12, STATE: '0' },
                              next: { block: { type: 'wait_block', id: 'w_fwd', fields: { TIME: 2 } } }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }]
        }
      }
    ]
  },
  {
    grade: 12,
    level: 'Senior',
    topic: 'IoT Web Server & Cloud OTA Automation',
    color: '#3B82F6',
    examples: [
      {
        id: 'g12_iot',
        title: 'IoT WiFi & Cloud Automation',
        board: 'ESP32',
        pins: 'WiFi STA + Pin 13 Output',
        desc: 'Connects ESP32 to wireless cloud network for remote telemetry and automated firmware updates.',
        file: 'blocks/grade_12/01_esp32_wifi_web_server.techyguide',
        cpp: 'void setup() {\n  Serial.begin(115200);\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}',
        py: '# IoT Cloud',
        blocks: {
          languageVersion: 0,
          blocks: [{
            type: 'esp32_when_starts', id: 'start_g12_1', x: 60, y: 30,
            inputs: {
              LOOP: {
                block: {
                  type: 'esp32_set_digital_pin', id: 'iot_led_13', fields: { PIN: 13, STATE: '1' },
                  next: {
                    block: {
                      type: 'wait_block', id: 'w_iot', fields: { TIME: 1 },
                      next: { block: { type: 'esp32_set_digital_pin', id: 'iot_led_off', fields: { PIN: 13, STATE: '0' } } }
                    }
                  }
                }
              }
            }
          }]
        }
      }
    ]
  }
];

export function initExamplesModal(workspace) {
  _workspace = workspace;
}

export function openExamplesModal(defaultGrade = 4) {
  if (!_overlay) _createModal();
  _currentGrade = defaultGrade;
  _renderBody();
  _overlay.classList.add('open');
  refreshIcons();
}

export function closeExamplesModal() {
  if (_overlay) _overlay.classList.remove('open');
}

function _createModal() {
  _overlay = document.createElement('div');
  _overlay.className = 'modal-overlay';
  _overlay.id = 'examplesModalOverlay';
  _overlay.innerHTML = `
    <div class="modal-content" style="max-width:940px;width:95vw;max-height:88vh;display:flex;flex-direction:column;border-radius:16px;overflow:hidden;background:#0F172A;border:1px solid #334155;box-shadow:0 25px 50px -12px rgba(0,0,0,0.7);">
      <!-- Header -->
      <div class="modal-header" style="padding:16px 24px;border-bottom:1px solid #334155;background:#1E293B;display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:38px;height:38px;border-radius:10px;background:#2563EB;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 2px 8px rgba(37,99,235,0.4);">
            <i data-lucide="book-open" style="width:20px;height:20px;"></i>
          </div>
          <div>
            <h3 style="margin:0;font-size:18px;font-weight:800;color:#FFFFFF;letter-spacing:0.2px;">Grade-Wise Project Examples</h3>
            <span style="font-size:12.5px;color:#94A3B8;font-weight:500;">Curated STEM &amp; Robotics experiments from Grade 3 to Grade 12</span>
          </div>
        </div>
        <button class="modal-close" id="examplesModalClose" style="background:#0F172A;border:1px solid #334155;color:#94A3B8;cursor:pointer;padding:6px 10px;border-radius:8px;display:flex;align-items:center;justify-content:center;">
          <i data-lucide="x" style="width:18px;height:18px;"></i>
        </button>
      </div>

      <!-- Main Layout: Sidebar Grades + Examples Grid -->
      <div style="display:flex;flex:1;overflow:hidden;">
        <!-- Grade Selector Sidebar -->
        <div id="examplesGradeSidebar" style="width:230px;border-right:1px solid #334155;background:#0F172A;padding:12px;overflow-y:auto;display:flex;flex-direction:column;gap:7px;">
        </div>

        <!-- Right Content Area -->
        <div style="flex:1;display:flex;flex-direction:column;background:#020617;overflow:hidden;">
          <!-- Search & Filter Bar -->
          <div style="padding:14px 20px;border-bottom:1px solid #1E293B;background:#0F172A;display:flex;align-items:center;justify-content:space-between;gap:12px;">
            <div style="position:relative;flex:1;max-width:380px;">
              <i data-lucide="search" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);width:16px;height:16px;color:#38BDF8;"></i>
              <input type="text" id="examplesSearchInput" placeholder="Search examples, pins, sensors…" style="width:100%;padding:9px 12px 9px 36px;border-radius:9px;border:1px solid #334155;background:#1E293B;color:#FFFFFF;font-size:13px;font-weight:600;outline:none;">
            </div>
            <div id="examplesGradeBadge" style="font-size:13px;font-weight:700;padding:6px 14px;border-radius:20px;background:#1E293B;border:1px solid #3B82F6;color:#38BDF8;"></div>
          </div>

          <!-- Cards Grid -->
          <div id="examplesGrid" style="flex:1;padding:20px;overflow-y:auto;display:grid;grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));gap:16px;align-content:start;">
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(_overlay);

  _overlay.querySelector('#examplesModalClose').addEventListener('click', closeExamplesModal);
  _overlay.addEventListener('click', e => { if (e.target === _overlay) closeExamplesModal(); });

  const searchInput = _overlay.querySelector('#examplesSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      _searchQuery = e.target.value.toLowerCase().trim();
      _renderCards();
    });
  }
}

function _renderBody() {
  _renderSidebar();
  _renderCards();
  refreshIcons();
}

function _renderSidebar() {
  const sidebar = document.getElementById('examplesGradeSidebar');
  if (!sidebar) return;

  sidebar.innerHTML = GRADE_CURRICULUM.map(g => {
    const active = g.grade === _currentGrade;
    return `
      <button class="grade-pill-btn ${active ? 'is-active' : ''}" data-grade="${g.grade}" style="
        display:flex;align-items:center;justify-content:space-between;padding:11px 14px;border-radius:10px;
        border:1px solid ${active ? '#3B82F6' : '#334155'};
        background:${active ? '#2563EB' : '#1E293B'};
        color:${active ? '#FFFFFF' : '#F1F5F9'};
        cursor:pointer;text-align:left;transition:all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        font-size:13.5px;font-weight:${active ? '800' : '700'};
        box-shadow:${active ? '0 4px 14px rgba(37,99,235,0.45)' : '0 1px 3px rgba(0,0,0,0.2)'};
      ">
        <div style="display:flex;align-items:center;gap:9px;">
          <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${active ? '#FFFFFF' : g.color};box-shadow:0 0 6px ${g.color};"></span>
          <span style="color:${active ? '#FFFFFF' : '#F8FAFC'};">Grade ${g.grade}</span>
        </div>
        <span style="font-size:11px;font-weight:700;padding:3px 7px;border-radius:8px;background:${active ? 'rgba(255,255,255,0.25)' : '#0F172A'};color:${active ? '#FFFFFF' : '#94A3B8'};">${g.level}</span>
      </button>
    `;
  }).join('');

  sidebar.querySelectorAll('.grade-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      _currentGrade = parseInt(btn.dataset.grade, 10);
      _renderBody();
    });
  });
}

function _renderCards() {
  const grid = document.getElementById('examplesGrid');
  const badge = document.getElementById('examplesGradeBadge');
  if (!grid) return;

  const currentGradeData = GRADE_CURRICULUM.find(g => g.grade === _currentGrade);
  if (badge && currentGradeData) {
    badge.textContent = `Grade ${_currentGrade} — ${currentGradeData.topic}`;
  }

  let list = currentGradeData ? currentGradeData.examples : [];
  if (_searchQuery) {
    // Global search across all grades if search active
    list = [];
    GRADE_CURRICULUM.forEach(g => {
      g.examples.forEach(ex => {
        if (
          ex.title.toLowerCase().includes(_searchQuery) ||
          ex.desc.toLowerCase().includes(_searchQuery) ||
          ex.pins.toLowerCase().includes(_searchQuery)
        ) {
          list.push({ ...ex, fromGrade: g.grade });
        }
      });
    });
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:40px 20px;color:#94A3B8;">
        <i data-lucide="folder-open" style="width:40px;height:40px;margin-bottom:10px;opacity:0.6;"></i>
        <div style="font-size:16px;font-weight:700;color:#F8FAFC;">No examples found</div>
        <div style="font-size:13px;margin-top:4px;color:#94A3B8;">Try searching for a different component or select another grade.</div>
      </div>
    `;
    refreshIcons();
    return;
  }

  grid.innerHTML = list.map((ex, idx) => {
    return `
      <div class="example-card" style="
        background:#1E293B;border:1px solid #334155;border-radius:14px;padding:18px;display:flex;flex-direction:column;
        justify-content:space-between;box-shadow:0 4px 14px rgba(0,0,0,0.3);transition:transform 0.2s, border-color 0.2s;
      ">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
            <span style="font-size:11.5px;font-weight:800;padding:3px 9px;border-radius:6px;background:rgba(56, 189, 248, 0.2);border:1px solid #38BDF8;color:#38BDF8;">
              ${ex.fromGrade ? `Grade ${ex.fromGrade}` : `Grade ${_currentGrade}`}
            </span>
            <span style="font-size:11.5px;font-weight:700;color:#E2E8F0;background:#0F172A;border:1px solid #334155;padding:3px 9px;border-radius:6px;">
              ${ex.board}
            </span>
          </div>

          <h4 style="margin:0 0 8px 0;font-size:16px;font-weight:800;color:#FFFFFF;">${ex.title}</h4>
          <p style="margin:0 0 14px 0;font-size:13px;line-height:1.5;color:#CBD5E1;">${ex.desc}</p>

          <div style="margin-bottom:14px;background:#0F172A;border:1px solid #334155;padding:8px 12px;border-radius:8px;font-size:12px;color:#38BDF8;font-family:var(--font-mono, monospace);">
            🔌 <strong>Connections:</strong> <span style="color:#F8FAFC;">${ex.pins}</span>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:8px;margin-top:12px;">
          <button class="btn-open-example" data-ex-id="${ex.id}" style="
            flex:1;padding:10px 14px;border-radius:8px;border:none;background:#2563EB;color:#FFFFFF;
            font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:7px;
            box-shadow:0 3px 10px rgba(37,99,235,0.45);transition:all 0.15s;
          ">
            <i data-lucide="play" style="width:15px;height:15px;"></i> Open in Workspace
          </button>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.btn-open-example').forEach(btn => {
    btn.addEventListener('click', () => {
      const exId = btn.dataset.exId;
      const found = list.find(e => e.id === exId);
      if (found && _workspace) {
        const projData = {
          version: 2,
          mode: 'board',
          project: {
            spriteStore: null,
            scratchWorkspace: null,
            boardWorkspace: { blocks: found.blocks }
          }
        };
        loadProjectData(projData, _workspace);
        closeExamplesModal();
        showToast(`Loaded "${found.title}" into workspace!`);
      }
    });
  });

  refreshIcons();
}
