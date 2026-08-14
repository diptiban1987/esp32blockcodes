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

// 6-Pin Full Setup (IN1, IN2, ENA, IN3, IN4, ENB)
const l298nInit = {
  type: "esp32_l298n_init",
  message0: "configure L298N: IN1 %1 IN2 %2 ENA %3 IN3 %4 IN4 %5 ENB %6",
  args0: [
    { type: "field_dropdown", name: "IN1", options: PIN_OPTIONS },
    { type: "field_dropdown", name: "IN2", options: PIN_OPTIONS },
    { type: "field_dropdown", name: "ENA", options: PIN_OPTIONS },
    { type: "field_dropdown", name: "IN3", options: PIN_OPTIONS },
    { type: "field_dropdown", name: "IN4", options: PIN_OPTIONS },
    { type: "field_dropdown", name: "ENB", options: PIN_OPTIONS }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Configure L298/L298N motor driver with PWM speed pins (ENA & ENB)"
};

// 4-Pin Simple Setup (IN1, IN2, IN3, IN4 with ENA/ENB jumpers installed)
const l298nInit4Pin = {
  type: "esp32_l298n_init_4pin",
  message0: "configure L298N (4-pin): IN1 %1 IN2 %2 IN3 %3 IN4 %4",
  args0: [
    { type: "field_dropdown", name: "IN1", options: PIN_OPTIONS },
    { type: "field_dropdown", name: "IN2", options: PIN_OPTIONS },
    { type: "field_dropdown", name: "IN3", options: PIN_OPTIONS },
    { type: "field_dropdown", name: "IN4", options: PIN_OPTIONS }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Configure L298/L298N motor driver without speed pins (jumpers ON)"
};

// Run Motor with Direction & Speed
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
  tooltip: "Run selected motor(s) forward or backward at specified speed (0-100%)"
};

const l298nMotorForward = {
  type: "esp32_l298n_motor_forward",
  message0: "run %1 forward",
  args0: [
    { type: "field_dropdown", name: "MOTOR", options: MOTOR_OPTIONS }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Run motor forward"
};

const l298nMotorBackward = {
  type: "esp32_l298n_motor_backward",
  message0: "run %1 backward",
  args0: [
    { type: "field_dropdown", name: "MOTOR", options: MOTOR_OPTIONS }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Run motor backward"
};

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
  tooltip: "Set motor speed (0-100%)"
};

const l298nStopMotor = {
  type: "esp32_l298n_stop_motor",
  message0: "stop %1",
  args0: [
    { type: "field_dropdown", name: "MOTOR", options: MOTOR_OPTIONS }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Stop selected motor(s)"
};

const l298nStopAll = {
  type: "esp32_l298n_stop_all",
  message0: "stop all motors",
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Stop both motors immediately"
};

// Robot Navigation / Smart Car movements
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
  tooltip: "Drive robot chassis (Forward, Backward, Turn, Spin, Stop) with L298N"
};

const l298nRobotMoveTime = {
  type: "esp32_l298n_robot_move_time",
  message0: "robot %1 speed %2 % for %3 seconds",
  args0: [
    { type: "field_dropdown", name: "MOVE", options: ROBOT_DIR_OPTIONS },
    { type: "field_number", name: "SPEED", value: 80, min: 0, max: 100 },
    { type: "field_number", name: "TIME", value: 1, min: 0.1, max: 60, precision: 0.1 }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Drive robot chassis for a set duration, then stop automatically"
};

const l298nRobotStop = {
  type: "esp32_l298n_robot_stop",
  message0: "robot stop",
  previousStatement: null,
  nextStatement: null,
  colour: 30,
  tooltip: "Stop robot car / all motors"
};

export const l298nBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  l298nInit,
  l298nInit4Pin,
  l298nMotorRun,
  l298nMotorForward,
  l298nMotorBackward,
  l298nMotorSpeed,
  l298nStopMotor,
  l298nStopAll,
  l298nRobotMove,
  l298nRobotMoveTime,
  l298nRobotStop
]);
