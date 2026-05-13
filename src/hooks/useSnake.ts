import { useState, useCallback, useEffect, useRef } from 'react';
import { Point, Direction, GameState } from '../types';

const GRID_SIZE = 20;
const INITIAL_SPEED = 200;
const MIN_SPEED = 100;

const getRandomPosition = (exclude: Point[]): Point => {
  let newPos: Point;
  do {
    newPos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (exclude.some(p => p.x === newPos.x && p.y === newPos.y));
  return newPos;
};

export const useSnake = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }],
    food: { x: 5, y: 5 },
    direction: 'UP',
    isGameOver: false,
    score: 0,
    highScore: 0,
  });

  const [isRunning, setIsRunning] = useState(false);
  const directionRef = useRef<Direction>('UP');

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
    setGameState(prev => ({
      ...prev,
      snake: initialSnake,
      food: getRandomPosition(initialSnake),
      direction: 'UP',
      isGameOver: false,
      score: 0,
    }));
    directionRef.current = 'UP';
    setIsRunning(true);
  }, []);

  const moveSnake = useCallback(() => {
    setGameState(prev => {
      if (prev.isGameOver) return prev;

      const newSnake = [...prev.snake];
      const head = { ...newSnake[0] };

      switch (directionRef.current) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      // Check wall collisions
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setIsRunning(false);
        return { ...prev, isGameOver: true, highScore: Math.max(prev.highScore, prev.score) };
      }

      // Check self collision
      if (newSnake.some(p => p.x === head.x && p.y === head.y)) {
        setIsRunning(false);
        return { ...prev, isGameOver: true, highScore: Math.max(prev.highScore, prev.score) };
      }

      newSnake.unshift(head);

      // Check food
      if (head.x === prev.food.x && head.y === prev.food.y) {
        const nextScore = prev.score + 10;
        return {
          ...prev,
          snake: newSnake,
          food: getRandomPosition(newSnake),
          score: nextScore,
          direction: directionRef.current,
        };
      }

      newSnake.pop();
      return { 
        ...prev, 
        snake: newSnake,
        direction: directionRef.current 
      };
    });
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const currentSpeed = Math.max(MIN_SPEED, INITIAL_SPEED - Math.floor(gameState.score / 50) * 5);
    const interval = setInterval(moveSnake, currentSpeed);
    return () => clearInterval(interval);
  }, [isRunning, moveSnake, gameState.score]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (gameState.direction !== 'DOWN') directionRef.current = 'UP'; break;
        case 'ArrowDown': if (gameState.direction !== 'UP') directionRef.current = 'DOWN'; break;
        case 'ArrowLeft': if (gameState.direction !== 'RIGHT') directionRef.current = 'LEFT'; break;
        case 'ArrowRight': if (gameState.direction !== 'LEFT') directionRef.current = 'RIGHT'; break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.direction]);

  return {
    gameState,
    isRunning,
    setIsRunning,
    resetGame,
    GRID_SIZE
  };
};
