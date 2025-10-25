'use client';

/**
 * SnakeModal — Tiny canvas Snake game
 * 20x20 grid, simple loop, closeable
 */

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, zIndex } from '@/lib/tokens';

interface SnakeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GRID_SIZE = 20;
const CELL_SIZE_DESKTOP = 20;
const CELL_SIZE_MOBILE = 14;

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface Position {
  x: number;
  y: number;
}

export default function SnakeModal({ isOpen, onClose }: SnakeModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Detect mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const snakeRef = useRef<Position[]>([{ x: 10, y: 10 }]);
  const directionRef = useRef<Direction>('RIGHT');
  const foodRef = useRef<Position>(generateFood());

  function generateFood(): Position {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }

  const resetGame = () => {
    snakeRef.current = [{ x: 10, y: 10 }];
    directionRef.current = 'RIGHT';
    foodRef.current = generateFood();
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    if (!isOpen) {
      resetGame();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CELL_SIZE = isMobile ? CELL_SIZE_MOBILE : CELL_SIZE_DESKTOP;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      const key = e.key;
      changeDirection(key);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const minSwipeDistance = 30;

      // Determine swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > minSwipeDistance) {
          changeDirection(deltaX > 0 ? 'ArrowRight' : 'ArrowLeft');
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > minSwipeDistance) {
          changeDirection(deltaY > 0 ? 'ArrowDown' : 'ArrowUp');
        }
      }

      touchStartRef.current = null;
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchend', handleTouchEnd);

    const gameLoop = setInterval(() => {
      if (gameOver) return;

      const snake = snakeRef.current;
      const head = snake[0];
      const dir = directionRef.current;

      // Calculate new head
      let newHead: Position;
      switch (dir) {
        case 'UP':
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case 'DOWN':
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case 'LEFT':
          newHead = { x: head.x - 1, y: head.y };
          break;
        case 'RIGHT':
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return;
      }

      // Check self collision
      if (snake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
        setGameOver(true);
        return;
      }

      // Add new head
      snake.unshift(newHead);

      // Check food collision
      if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
        foodRef.current = generateFood();
        setScore((s) => s + 10);
      } else {
        // Remove tail
        snake.pop();
      }

      // Draw
      ctx.fillStyle = colors.deepSpace;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = `${colors.graphite}40`;
      ctx.lineWidth = 1;
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
        ctx.stroke();
      }

      // Draw food
      ctx.fillStyle = colors.neonPink;
      ctx.fillRect(
        foodRef.current.x * CELL_SIZE + 2,
        foodRef.current.y * CELL_SIZE + 2,
        CELL_SIZE - 4,
        CELL_SIZE - 4
      );

      // Draw snake
      snake.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? colors.electricBlue : colors.violetFlux;
        ctx.fillRect(
          seg.x * CELL_SIZE + 1,
          seg.y * CELL_SIZE + 1,
          CELL_SIZE - 2,
          CELL_SIZE - 2
        );
      });
    }, 150);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', handleKeyDown);
      if (canvas) {
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isOpen, gameOver, onClose, isMobile]);

  const changeDirection = (key: string) => {
    const current = directionRef.current;

    if (key === 'ArrowUp' && current !== 'DOWN') directionRef.current = 'UP';
    if (key === 'ArrowDown' && current !== 'UP') directionRef.current = 'DOWN';
    if (key === 'ArrowLeft' && current !== 'RIGHT') directionRef.current = 'LEFT';
    if (key === 'ArrowRight' && current !== 'LEFT') directionRef.current = 'RIGHT';
  };

  const handleDirectionButton = (direction: Direction) => {
    const current = directionRef.current;

    if (direction === 'UP' && current !== 'DOWN') directionRef.current = 'UP';
    if (direction === 'DOWN' && current !== 'UP') directionRef.current = 'DOWN';
    if (direction === 'LEFT' && current !== 'RIGHT') directionRef.current = 'LEFT';
    if (direction === 'RIGHT' && current !== 'LEFT') directionRef.current = 'RIGHT';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-2 md:p-4 overflow-y-auto"
          style={{
            zIndex: zIndex.modal,
            backgroundColor: `${colors.deepSpace}e6`,
            backdropFilter: 'blur(8px)',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="border-2 rounded-lg p-3 md:p-6 flex flex-col items-center gap-3 md:gap-4 my-auto max-w-full"
            style={{
              backgroundColor: colors.gunmetal,
              borderColor: colors.electricBlue,
              boxShadow: `0 0 40px ${colors.electricBlue}40`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between w-full gap-2">
              <div className="font-mono text-xs md:text-sm" style={{ color: colors.aurumGold }}>
                SNAKE
              </div>
              <button
                onClick={onClose}
                className="text-xs font-mono px-2 py-1 rounded border transition-all"
                style={{
                  color: colors.neonPink,
                  borderColor: colors.neonPink,
                  backgroundColor: `${colors.neonPink}10`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.neonPink}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.neonPink}10`;
                }}
              >
                ✕ CLOSE
              </button>
            </div>

            <canvas
              ref={canvasRef}
              width={GRID_SIZE * (isMobile ? CELL_SIZE_MOBILE : CELL_SIZE_DESKTOP)}
              height={GRID_SIZE * (isMobile ? CELL_SIZE_MOBILE : CELL_SIZE_DESKTOP)}
              className="border"
              style={{ borderColor: colors.graphite, maxWidth: '100%' }}
            />

            <div className="flex items-center justify-between w-full gap-2">
              <div className="font-mono text-sm md:text-base font-bold" style={{ color: colors.aurumGold }}>
                SCORE: {score}
              </div>
              {gameOver && (
                <button
                  onClick={resetGame}
                  className="font-mono text-xs md:text-sm px-3 py-1.5 rounded border transition-all font-bold"
                  style={{
                    color: colors.electricBlue,
                    borderColor: colors.electricBlue,
                    backgroundColor: `${colors.electricBlue}10`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.electricBlue}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.electricBlue}10`;
                  }}
                >
                  RESTART
                </button>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="grid grid-cols-3 gap-1.5 w-full max-w-[180px] md:hidden">
              <div />
              <button
                onClick={() => handleDirectionButton('UP')}
                className="px-3 py-2 rounded border font-mono text-sm transition-all touch-manipulation"
                style={{
                  color: colors.electricBlue,
                  borderColor: colors.electricBlue,
                  backgroundColor: `${colors.electricBlue}10`,
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.electricBlue}30`;
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.electricBlue}10`;
                }}
              >
                ▲
              </button>
              <div />
              <button
                onClick={() => handleDirectionButton('LEFT')}
                className="px-3 py-2 rounded border font-mono text-sm transition-all touch-manipulation"
                style={{
                  color: colors.electricBlue,
                  borderColor: colors.electricBlue,
                  backgroundColor: `${colors.electricBlue}10`,
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.electricBlue}30`;
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.electricBlue}10`;
                }}
              >
                ◀
              </button>
              <div />
              <button
                onClick={() => handleDirectionButton('RIGHT')}
                className="px-3 py-2 rounded border font-mono text-sm transition-all touch-manipulation"
                style={{
                  color: colors.electricBlue,
                  borderColor: colors.electricBlue,
                  backgroundColor: `${colors.electricBlue}10`,
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.electricBlue}30`;
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.electricBlue}10`;
                }}
              >
                ▶
              </button>
              <div />
              <button
                onClick={() => handleDirectionButton('DOWN')}
                className="px-3 py-2 rounded border font-mono text-sm transition-all touch-manipulation"
                style={{
                  color: colors.electricBlue,
                  borderColor: colors.electricBlue,
                  backgroundColor: `${colors.electricBlue}10`,
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.electricBlue}30`;
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.electricBlue}10`;
                }}
              >
                ▼
              </button>
              <div />
            </div>

            <div className="text-[10px] md:text-xs font-mono text-center" style={{ color: colors.slateLight }}>
              <span className="md:hidden">Swipe or tap buttons to move</span>
              <span className="hidden md:inline">Arrow keys to move • ESC to exit</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
