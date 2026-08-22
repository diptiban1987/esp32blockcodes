// Board state management — single source of truth for the active target board
// Supported boards: 'esp32' | 'pico'

let _currentBoard = 'esp32';

export function getCurrentBoard() {
  return _currentBoard;
}

export function setCurrentBoard(board) {
  if (board === 'esp32' || board === 'pico') {
    _currentBoard = board;
  }
}

export function isPico() {
  return _currentBoard === 'pico';
}

export function isESP32() {
  return _currentBoard === 'esp32';
}
