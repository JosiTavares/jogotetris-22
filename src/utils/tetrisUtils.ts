
import { TETROMINO_SHAPES, TETROMINO_COLORS, BOARD_WIDTH, BOARD_HEIGHT } from '../constants/tetrisConstants';
import { Tetromino, TetrominoType, Position } from '../types/tetrisTypes';

export const createEmptyBoard = (): (string | null)[][] => {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));
};

export const getRandomTetromino = (): Tetromino => {
  const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  return {
    type,
    shape: TETROMINO_SHAPES[type],
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
    color: TETROMINO_COLORS[type]
  };
};

export const rotatePiece = (piece: Tetromino): Tetromino => {
  const rotated = piece.shape[0].map((_, index) =>
    piece.shape.map(row => row[index]).reverse()
  );
  
  return {
    ...piece,
    shape: rotated
  };
};

export const isValidPosition = (
  board: (string | null)[][],
  piece: Tetromino,
  position: Position
): boolean => {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = position.x + x;
        const newY = position.y + y;
        
        if (
          newX < 0 ||
          newX >= BOARD_WIDTH ||
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX])
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

export const placePieceOnBoard = (
  board: (string | null)[][],
  piece: Tetromino
): (string | null)[][] => {
  const newBoard = board.map(row => [...row]);
  
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = piece.position.y + y;
        const boardX = piece.position.x + x;
        if (boardY >= 0) {
          newBoard[boardY][boardX] = piece.color;
        }
      }
    }
  }
  
  return newBoard;
};

export const clearLines = (board: (string | null)[][]): {
  newBoard: (string | null)[][];
  linesCleared: number;
} => {
  const newBoard = board.filter(row => row.some(cell => cell === null));
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }
  
  return { newBoard, linesCleared };
};

export const calculateScore = (linesCleared: number, level: number): number => {
  const points = [0, 40, 100, 300, 1200];
  return points[linesCleared] * (level + 1);
};

export const calculateLevel = (lines: number): number => {
  return Math.floor(lines / 10);
};
