
import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Tetromino } from '../types/tetrisTypes';
import { LEVEL_SPEED } from '../constants/tetrisConstants';
import {
  createEmptyBoard,
  getRandomTetromino,
  rotatePiece,
  isValidPosition,
  placePieceOnBoard,
  clearLines,
  calculateScore,
  calculateLevel
} from '../utils/tetrisUtils';

export const useTetris = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: createEmptyBoard(),
    currentPiece: getRandomTetromino(),
    nextPiece: getRandomTetromino(),
    score: 0,
    lines: 0,
    level: 0,
    isGameOver: false,
    isPaused: false
  }));

  const gameLoopRef = useRef<NodeJS.Timeout>();
  const lastDropTime = useRef<number>(Date.now());
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const dropPiece = useCallback(() => {
    setGameState(prevState => {
      if (prevState.isGameOver || prevState.isPaused || !prevState.currentPiece) {
        return prevState;
      }

      const newPosition = {
        x: prevState.currentPiece.position.x,
        y: prevState.currentPiece.position.y + 1
      };

      if (isValidPosition(prevState.board, prevState.currentPiece, newPosition)) {
        return {
          ...prevState,
          currentPiece: {
            ...prevState.currentPiece,
            position: newPosition
          }
        };
      } else {
        // Place piece and check for game over
        const newBoard = placePieceOnBoard(prevState.board, prevState.currentPiece);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        const newLines = prevState.lines + linesCleared;
        const newLevel = calculateLevel(newLines);
        const newScore = prevState.score + calculateScore(linesCleared, prevState.level);

        // Check game over
        const isGameOver = !isValidPosition(clearedBoard, prevState.nextPiece!, prevState.nextPiece!.position);

        return {
          ...prevState,
          board: clearedBoard,
          currentPiece: isGameOver ? null : prevState.nextPiece,
          nextPiece: isGameOver ? null : getRandomTetromino(),
          score: newScore,
          lines: newLines,
          level: newLevel,
          isGameOver
        };
      }
    });
  }, []);

  const movePiece = useCallback((direction: 'left' | 'right') => {
    setGameState(prevState => {
      if (prevState.isGameOver || prevState.isPaused || !prevState.currentPiece) {
        return prevState;
      }

      const newPosition = {
        x: prevState.currentPiece.position.x + (direction === 'left' ? -1 : 1),
        y: prevState.currentPiece.position.y
      };

      if (isValidPosition(prevState.board, prevState.currentPiece, newPosition)) {
        return {
          ...prevState,
          currentPiece: {
            ...prevState.currentPiece,
            position: newPosition
          }
        };
      }

      return prevState;
    });
  }, []);

  const rotatePieceAction = useCallback(() => {
    setGameState(prevState => {
      if (prevState.isGameOver || prevState.isPaused || !prevState.currentPiece) {
        return prevState;
      }

      const rotatedPiece = rotatePiece(prevState.currentPiece);

      if (isValidPosition(prevState.board, rotatedPiece, rotatedPiece.position)) {
        return {
          ...prevState,
          currentPiece: rotatedPiece
        };
      }

      return prevState;
    });
  }, []);

  const hardDrop = useCallback(() => {
    setGameState(prevState => {
      if (prevState.isGameOver || prevState.isPaused || !prevState.currentPiece) {
        return prevState;
      }

      let newY = prevState.currentPiece.position.y;
      while (isValidPosition(prevState.board, prevState.currentPiece, { 
        x: prevState.currentPiece.position.x, 
        y: newY + 1 
      })) {
        newY++;
      }

      const newBoard = placePieceOnBoard(prevState.board, {
        ...prevState.currentPiece,
        position: { x: prevState.currentPiece.position.x, y: newY }
      });

      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      const newLines = prevState.lines + linesCleared;
      const newLevel = calculateLevel(newLines);
      const dropDistance = newY - prevState.currentPiece.position.y;
      const newScore = prevState.score + calculateScore(linesCleared, prevState.level) + dropDistance * 2;

      const isGameOver = !isValidPosition(clearedBoard, prevState.nextPiece!, prevState.nextPiece!.position);

      return {
        ...prevState,
        board: clearedBoard,
        currentPiece: isGameOver ? null : prevState.nextPiece,
        nextPiece: isGameOver ? null : getRandomTetromino(),
        score: newScore,
        lines: newLines,
        level: newLevel,
        isGameOver
      };
    });
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prevState => ({
      ...prevState,
      isPaused: !prevState.isPaused
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPiece: getRandomTetromino(),
      nextPiece: getRandomTetromino(),
      score: 0,
      lines: 0,
      level: 0,
      isGameOver: false,
      isPaused: false
    });
  }, []);

  // Touch gesture handlers
  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback((event: TouchEvent) => {
    if (!touchStartRef.current || gameState.isGameOver) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Minimum swipe distance to register gesture
    const minSwipeDistance = 30;

    if (absDeltaX > minSwipeDistance || absDeltaY > minSwipeDistance) {
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
          movePiece('right');
        } else {
          movePiece('left');
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          hardDrop();
        }
      }
    } else {
      // Tap to rotate
      rotatePieceAction();
    }

    touchStartRef.current = null;
  }, [gameState.isGameOver, movePiece, hardDrop, rotatePieceAction]);

  // Game loop
  useEffect(() => {
    if (gameState.isGameOver || gameState.isPaused) {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
      return;
    }

    const dropInterval = LEVEL_SPEED[Math.min(gameState.level, LEVEL_SPEED.length - 1)];
    
    gameLoopRef.current = setInterval(() => {
      dropPiece();
    }, dropInterval);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState.level, gameState.isGameOver, gameState.isPaused, dropPiece]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState.isGameOver) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          movePiece('left');
          break;
        case 'ArrowRight':
          event.preventDefault();
          movePiece('right');
          break;
        case 'ArrowDown':
          event.preventDefault();
          dropPiece();
          break;
        case 'ArrowUp':
        case ' ':
          event.preventDefault();
          rotatePieceAction();
          break;
        case 'Enter':
          event.preventDefault();
          hardDrop();
          break;
        case 'p':
        case 'P':
          event.preventDefault();
          pauseGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.isGameOver, movePiece, dropPiece, rotatePieceAction, hardDrop, pauseGame]);

  // Touch controls
  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  return {
    gameState,
    actions: {
      movePiece,
      rotatePiece: rotatePieceAction,
      dropPiece,
      hardDrop,
      pauseGame,
      resetGame
    }
  };
};
