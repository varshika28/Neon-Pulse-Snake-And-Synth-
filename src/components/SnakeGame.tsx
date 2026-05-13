import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSnake } from '../hooks/useSnake';
import { Trophy, Play, RotateCcw } from 'lucide-react';

export const SnakeGame: React.FC = () => {
  const { gameState, isRunning, setIsRunning, resetGame, GRID_SIZE } = useSnake();

  return (
    <div id="snake-game-container" className="flex flex-col items-center justify-center space-y-6 w-full max-w-2xl">
      <div className="flex justify-between w-full items-end border-b border-white/5 pb-2 mb-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-mono">Current Score</span>
          <span className="text-3xl font-bold text-cyan-400 font-mono tracking-tighter">
            {gameState.score.toString().padStart(6, '0')}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center space-x-2 text-fuchsia-500">
            <Trophy size={14} />
            <span className="text-[10px] uppercase tracking-[0.4em] opacity-70 font-mono">Record</span>
          </div>
          <span className="text-2xl font-bold text-white font-mono tracking-tighter">
            {gameState.highScore.toString().padStart(6, '0')}
          </span>
        </div>
      </div>

      <div 
        className="relative aspect-square w-full max-w-[480px] bg-[#050505] border-4 border-white/5 shadow-[0_0_50px_rgba(34,211,238,0.1)] overflow-hidden"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', 
               backgroundSize: '24px 24px' 
             }} 
        />

        {/* Snake Body */}
        {gameState.snake.map((segment, index) => (
          <motion.div
            key={`${index}-${segment.x}-${segment.y}`}
            layoutId={`snake-${index}`}
            className={`
              ${index === 0 ? 'bg-cyan-400 shadow-[0_0_15px_#22d3ee]' : 'bg-cyan-400/60'}
              z-10
            `}
            style={{
              gridColumnStart: segment.x + 1,
              gridRowStart: segment.y + 1,
            }}
          />
        ))}

        {/* Food */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="bg-fuchsia-500 rounded-full shadow-[0_0_20px_#d946ef] z-10 mx-auto my-auto w-[80%] h-[80%]"
          style={{
            gridColumnStart: gameState.food.x + 1,
            gridRowStart: gameState.food.y + 1,
          }}
        />

        {/* Scanline Effect Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 z-10" 
          style={{ 
            background: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))', 
            backgroundSize: '100% 4px, 3px 100%' 
          }} 
        />

        {/* Overlays */}
        <AnimatePresence>
          {!isRunning && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
            >
              {gameState.isGameOver ? (
                <div className="text-center space-y-6 p-8 border border-white/10 bg-[#0a0a0c]">
                  <h2 className="text-5xl font-black text-fuchsia-500 tracking-tighter uppercase italic">Terminated</h2>
                  <p className="text-cyan-400 font-mono text-xs tracking-widest uppercase">Buffer Overrun: {gameState.score}</p>
                  <button
                    onClick={resetGame}
                    className="group relative px-8 py-3 bg-cyan-500 text-black font-bold uppercase tracking-widest text-xs rounded-sm transition-all hover:bg-cyan-400 active:scale-95 flex items-center space-x-2 mx-auto"
                  >
                    <RotateCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                    <span>Reboot Session</span>
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-fuchsia-500 font-mono tracking-[0.6em] uppercase mb-2">Neural Interface Ready</span>
                    <h1 className="text-6xl font-black text-white tracking-widest uppercase italic leading-none">
                      SYNTH<br/>SLITHER
                    </h1>
                  </div>
                  <button
                    onClick={() => {
                      if (gameState.isGameOver) resetGame();
                      else setIsRunning(true);
                    }}
                    className="group relative px-10 py-4 border-2 border-cyan-400 text-cyan-400 font-bold uppercase tracking-[0.3em] text-xs transition-all hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_#22d3ee] flex items-center space-x-3 mx-auto"
                  >
                    <Play size={18} fill="currentColor" />
                    <span>Initialize</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
