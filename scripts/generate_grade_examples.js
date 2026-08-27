const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'blocks');
const publicBaseDir = path.join(__dirname, '..', 'public', 'blocks');

const makeProject = (blocks) => JSON.stringify({
  version: 2,
  mode: 'board',
  project: {
    spriteStore: {
      sprites: [{
        name: 'Cat', x: 0, y: 0, direction: 90, size: 100, visible: true, opacity: 1,
        rotationStyle: 'all around', costumes: [{ name: 'cat', src: '' }],
        currentCostumeIndex: 0, sayBubble: null, penDown: false, penColor: '#4C97FF', penSize: 1, penTrails: []
      }],
      selectedSpriteIndex: 0, currentBackdrop: null, backdrops: []
    },
    scratchWorkspace: null,
    boardWorkspace: { blocks: { languageVersion: 0, blocks: blocks } }
  }
}, null, 2);

const examples = [
  {
    grade: 3,
    title: 'Simple LED Turn ON',
    file: '01_simple_led_on.techyguide',
    ino: 'void setup() {\n  pinMode(13, OUTPUT);\n  digitalWrite(13, HIGH);\n}\nvoid loop() {\n}\n',
    blocks: [{
      type: 'esp32_when_starts', id: 'start_g3_1', x: 60, y: 30,
      inputs: {
        SETUP: {
          block: { type: 'esp32_set_digital_pin', id: 'led_13_on', fields: { PIN: 13, STATE: '1' } }
        }
      }
    }]
  },
  {
    grade: 4,
    title: 'LED Blinking (1 Second)',
    file: '01_led_blinking_pin13.techyguide',
    ino: 'void setup() {\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}\n',
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
                    next: {
                      block: { type: 'wait_block', id: 'w2', fields: { TIME: 1 } }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }]
  },
  {
    grade: 5,
    title: 'Push Button LED Toggle',
    file: '01_push_button_led.techyguide',
    ino: 'void setup() {\n  pinMode(4, INPUT_PULLUP);\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  if (digitalRead(4) == LOW) {\n    digitalWrite(13, HIGH);\n  } else {\n    digitalWrite(13, LOW);\n  }\n}\n',
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
  },
  {
    grade: 6,
    title: 'Ultrasonic Distance Alert Radar',
    file: '01_ultrasonic_distance_alert.techyguide',
    ino: 'void setup() {\n  Serial.begin(115200);\n  pinMode(14, OUTPUT);\n  pinMode(27, INPUT);\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(14, LOW); delayMicroseconds(2);\n  digitalWrite(14, HIGH); delayMicroseconds(10); digitalWrite(14, LOW);\n  long dist = pulseIn(27, HIGH) / 58;\n  Serial.println(dist);\n  if (dist < 20) {\n    digitalWrite(13, HIGH);\n  } else {\n    digitalWrite(13, LOW);\n  }\n  delay(100);\n}\n',
    blocks: [{
      type: 'esp32_when_starts', id: 'start_g6_1', x: 60, y: 30,
      inputs: {
        SETUP: {
          block: { type: 'esp32_ultrasonic_setup', id: 'us_init', fields: { TRIG: '14', ECHO: '27' } }
        },
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
  },
  {
    grade: 7,
    title: 'Smart Street Light (LDR Sensor)',
    file: '01_smart_street_light_ldr.techyguide',
    ino: 'void setup() {\n  Serial.begin(115200);\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  int lightVal = analogRead(34);\n  Serial.print("LDR: "); Serial.println(lightVal);\n  if (lightVal < 1500) {\n    digitalWrite(13, HIGH);\n  } else {\n    digitalWrite(13, LOW);\n  }\n  delay(200);\n}\n',
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
  },
  {
    grade: 8,
    title: 'DHT11 Climate Monitor',
    file: '01_dht11_temp_humidity.techyguide',
    ino: 'void setup() {\n  Serial.begin(115200);\n}\nvoid loop() {\n  delay(2000);\n}\n',
    blocks: [{
      type: 'esp32_when_starts', id: 'start_g8_1', x: 60, y: 30,
      inputs: {
        SETUP: {
          block: { type: 'esp32_dht_setup', id: 'dht_init', fields: { PIN: '33', TYPE: 'DHT11' } }
        }
      }
    }]
  },
  {
    grade: 9,
    title: 'Smart Plant Watering & Soil Moisture',
    file: '01_smart_plant_watering.techyguide',
    ino: 'void setup() {\n  Serial.begin(115200);\n  pinMode(23, OUTPUT);\n}\nvoid loop() {\n  int soil = analogRead(32);\n  Serial.println(soil);\n  if (soil > 2500) {\n    digitalWrite(23, HIGH);\n  } else {\n    digitalWrite(23, LOW);\n  }\n  delay(500);\n}\n',
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
  },
  {
    grade: 10,
    title: 'PIR Motion Intruder Alarm',
    file: '01_pir_motion_intruder_alarm.techyguide',
    ino: 'void setup() {\n  Serial.begin(115200);\n  pinMode(19, INPUT);\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  if (digitalRead(19) == HIGH) {\n    digitalWrite(13, HIGH);\n  } else {\n    digitalWrite(13, LOW);\n  }\n  delay(100);\n}\n',
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
  },
  {
    grade: 11,
    title: 'L298N Dual Motor Robot Drive',
    file: '01_l298n_robot_car_dual_motor.techyguide',
    ino: 'void setup() {\n  pinMode(26, OUTPUT); pinMode(27, OUTPUT);\n  pinMode(14, OUTPUT); pinMode(12, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(26, HIGH); digitalWrite(27, LOW);\n  digitalWrite(14, HIGH); digitalWrite(12, LOW);\n  delay(2000);\n  digitalWrite(26, LOW); digitalWrite(27, LOW);\n  digitalWrite(14, LOW); digitalWrite(12, LOW);\n  delay(1000);\n}\n',
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
                        next: {
                          block: { type: 'wait_block', id: 'w_fwd', fields: { TIME: 2 } }
                        }
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
  },
  {
    grade: 12,
    title: 'IoT WiFi & Cloud Automation',
    file: '01_esp32_wifi_web_server.techyguide',
    ino: 'void setup() {\n  Serial.begin(115200);\n  pinMode(13, OUTPUT);\n}\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}\n',
    blocks: [{
      type: 'esp32_when_starts', id: 'start_g12_1', x: 60, y: 30,
      inputs: {
        LOOP: {
          block: {
            type: 'esp32_set_digital_pin', id: 'iot_led_13', fields: { PIN: 13, STATE: '1' },
            next: {
              block: {
                type: 'wait_block', id: 'w_iot', fields: { TIME: 1 },
                next: {
                  block: { type: 'esp32_set_digital_pin', id: 'iot_led_off', fields: { PIN: 13, STATE: '0' } }
                }
              }
            }
          }
        }
      }
    }]
  }
];

examples.forEach(ex => {
  const dir = path.join(baseDir, 'grade_' + ex.grade);
  const pubDir = path.join(publicBaseDir, 'grade_' + ex.grade);
  fs.mkdirSync(dir, { recursive: true });
  fs.mkdirSync(pubDir, { recursive: true });

  const projContent = makeProject(ex.blocks);
  const inoName = ex.file.replace('.techyguide', '.ino');

  fs.writeFileSync(path.join(dir, ex.file), projContent);
  fs.writeFileSync(path.join(dir, inoName), ex.ino);

  fs.writeFileSync(path.join(pubDir, ex.file), projContent);
  fs.writeFileSync(path.join(pubDir, inoName), ex.ino);
});

console.log('Successfully created all grade-wise projects from Grade 3 to Grade 12!');
