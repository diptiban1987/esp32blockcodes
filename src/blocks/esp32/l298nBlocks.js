// L298 & L298N Motor Driver block definitions
import * as Blockly from "blockly/core";

const PIN_OPTIONS = [
  ["2","2"],["4","4"],["5","5"],["12","12"],["13","13"],
  ["14","14"],["15","15"],["16","16"],["17","17"],["18","18"],
  ["19","19"],["21","21"],["22","22"],["23","23"],["25","25"],
  ["26","26"],["27","27"],["32","32"],["33","33"]
];

const MOTOR_OPTIONS = [
  ["Motor A", "A"],
  ["Motor B", "B"],
  ["Both Motors (A & B)", "BOTH"]
];

const DIRECTION_OPTIONS = [
  ["forward", "FORWARD"],
  ["backward", "BACKWARD"]
];

const ROBOT_DIR_OPTIONS = [
  ["drive forward ⬆️", "FORWARD"],
  ["drive backward ⬇️", "BACKWARD"],
  ["turn left ⬅️", "TURN_LEFT"],
  ["turn right ➡️", "TURN_RIGHT"],
  ["spin left 🔄", "SPIN_LEFT"],
  ["spin right 🔁", "SPIN_RIGHT"],
  ["stop ⏹️", "STOP"]
];

// ── 6-Pin Full Setup (IN1, IN2, ENA, IN3, IN4, ENB) ──────────────────────────
const l298nInit = {
  type: "esp32_l298n_init",
  message0: "configure L298N: IN1 %1 IN2 %2 ENA %3 IN3 %4 IN4 %5 ENB %6",
  args0: [
    { type: "field_number", name: "IN1", value: 12, min: 0, max: 39 },
    { type: "field_number", name: "IN2", value: 13, min: 0, max: 39 },
    { type: "field_number", name: "ENA", value: 14, min: 0, max: 39 },
    { type: "field_number", name: "IN3", value: 27, min: 0, max: 39 },
    { type: "field_number", name: "IN4", value: 26, min: 0, max: 39 },
    { type: "field_number", name: "ENB", value: 25, min: 0, max: 39 }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Configure L298/L298N motor driver with PWM speed pins (ENA & ENB). Place this block FIRST before any motor blocks."
};

// ── 4-Pin Simple Setup ────────────────────────────────────────────────────────
const l298nInit4Pin = {
  type: "esp32_l298n_init_4pin",
  message0: "configure L298N (4-pin): IN1 %1 IN2 %2 IN3 %3 IN4 %4",
  args0: [
    { type: "field_number", name: "IN1", value: 12, min: 0, max: 39 },
    { type: "field_number", name: "IN2", value: 13, min: 0, max: 39 },
    { type: "field_number", name: "IN3", value: 27, min: 0, max: 39 },
    { type: "field_number", name: "IN4", value: 26, min: 0, max: 39 }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Configure L298/L298N without speed pins (jumpers ON). Place this block FIRST."
};

// ── Run Motor: direction + speed (continuous) ─────────────────────────────────
const l298nMotorRun = {
  type: "esp32_l298n_motor_run",
  message0: "run %1 %2 at speed %3 %",
  args0: [
    { type: "field_dropdown", name: "MOTOR", options: MOTOR_OPTIONS },
    { type: "field_dropdown", name: "DIR", options: DIRECTION_OPTIONS },
    { type: "field_number", name: "SPEED", value: 80, min: 0, max: 100 }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Run selected motor(s) continuously. Use inside a loop or with a stop block."
};

// ── Run Motor: direction + speed + time → auto-stop (RUNS ONCE in setup) ──────
const l298nMotorRunTime = {
  type: "esp32_l298n_motor_run_time",
  message0: "run %1 %2 at speed %3 % for %4 seconds ⏱",
  args0: [
    { type: "field_dropdown", name: "MOTOR", options: MOTOR_OPTIONS },
    { type: "field_dropdown", name: "DIR", options: DIRECTION_OPTIONS },
    { type: "field_number", name: "SPEED", value: 80, min: 0, max: 100 },
    { type: "field_number", name: "TIME", value: 1, min: 0.1, max: 600, precision: 0.1 }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Run motor(s) for N seconds, then STOP automatically. Runs once when ESP32 starts."
};

// ── Simple directional shortcuts ──────────────────────────────────────────────
const l298nMotorForward = {
  type: "esp32_l298n_motor_forward",
  message0: "run %1 forward",
  args0: [{ type: "field_dropdown", name: "MOTOR", options: MOTOR_OPTIONS }],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Run motor forward at full speed. Use inside a loop."
};

const l298nMotorBackward = {
  type: "esp32_l298n_motor_backward",
  message0: "run %1 backward",
  args0: [{ type: "field_dropdown", name: "MOTOR", options: MOTOR_OPTIONS }],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Run motor backward at full speed. Use inside a loop."
};

// ── Turn left / right (continuous) ───────────────────────────────────────────
const l298nTurnLeft = {
  type: "esp32_l298n_turn_left",
  message0: "turn left ⬅️ at speed %1 %",
  args0: [
    { type: "field_number", name: "SPEED", value: 70, min: 0, max: 100 }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Turn robot left: Motor A forward, Motor B backward. Use inside a loop."
};

const l298nTurnRight = {
  type: "esp32_l298n_turn_right",
  message0: "turn right ➡️ at speed %1 %",
  args0: [
    { type: "field_number", name: "SPEED", value: 70, min: 0, max: 100 }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Turn robot right: Motor A backward, Motor B forward. Use inside a loop."
};

// ── Turn left / right for N seconds → auto-stop ──────────────────────────────
const l298nTurnLeftTime = {
  type: "esp32_l298n_turn_left_time",
  message0: "turn left ⬅️ at speed %1 % for %2 seconds ⏱",
  args0: [
    { type: "field_number", name: "SPEED", value: 70, min: 0, max: 100 },
    { type: "field_number", name: "TIME", value: 1, min: 0.1, max: 60, precision: 0.1 }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Turn robot left for N seconds then stop. Runs once when ESP32 starts."
};

const l298nTurnRightTime = {
  type: "esp32_l298n_turn_right_time",
  message0: "turn right ➡️ at speed %1 % for %2 seconds ⏱",
  args0: [
    { type: "field_number", name: "SPEED", value: 70, min: 0, max: 100 },
    { type: "field_number", name: "TIME", value: 1, min: 0.1, max: 60, precision: 0.1 }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Turn robot right for N seconds then stop. Runs once when ESP32 starts."
};

// ── Speed / Stop ──────────────────────────────────────────────────────────────
const l298nMotorSpeed = {
  type: "esp32_l298n_motor_speed",
  message0: "set %1 speed to %2 %",
  args0: [
    { type: "field_dropdown", name: "MOTOR", options: MOTOR_OPTIONS },
    { type: "field_number", name: "SPEED", value: 75, min: 0, max: 100 }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Change motor speed without changing direction (0=stop, 100=full speed)."
};

const l298nStopMotor = {
  type: "esp32_l298n_stop_motor",
  message0: "stop %1",
  args0: [{ type: "field_dropdown", name: "MOTOR", options: MOTOR_OPTIONS }],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Stop selected motor(s)."
};

const l298nStopAll = {
  type: "esp32_l298n_stop_all",
  message0: "stop all motors",
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Stop both motors immediately."
};

// ── Robot Navigation / Smart Car movements ────────────────────────────────────
const l298nRobotMove = {
  type: "esp32_l298n_robot_move",
  message0: "robot %1 speed %2 %",
  args0: [
    { type: "field_dropdown", name: "MOVE", options: ROBOT_DIR_OPTIONS },
    { type: "field_number", name: "SPEED", value: 80, min: 0, max: 100 }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Drive robot (Forward/Backward/Turn Left/Turn Right/Spin). Use inside a loop."
};

const l298nRobotMoveTime = {
  type: "esp32_l298n_robot_move_time",
  message0: "robot %1 speed %2 % for %3 seconds ⏱",
  args0: [
    { type: "field_dropdown", name: "MOVE", options: ROBOT_DIR_OPTIONS },
    { type: "field_number", name: "SPEED", value: 80, min: 0, max: 100 },
    { type: "field_number", name: "TIME", value: 1, min: 0.1, max: 60, precision: 0.1 }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Drive robot for N seconds then stop. Runs once when ESP32 starts. Stack multiple for a sequence!"
};

const l298nRobotStop = {
  type: "esp32_l298n_robot_stop",
  message0: "robot stop",
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Stop robot car / all motors."
};

export const l298nBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  l298nInit,
  l298nInit4Pin,
  l298nMotorRun,
  l298nMotorRunTime,
  l298nTurnLeft,
  l298nTurnRight,
  l298nTurnLeftTime,
  l298nTurnRightTime,
  l298nMotorForward,
  l298nMotorBackward,
  l298nMotorSpeed,
  l298nStopMotor,
  l298nStopAll,
  l298nRobotMove,
  l298nRobotMoveTime,
  l298nRobotStop
]);
