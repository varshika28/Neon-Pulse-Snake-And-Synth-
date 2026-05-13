import React from 'react';
import { motion } from 'motion/react';
import { useMusic } from '../hooks/useMusic';
import { Play, Pause, SkipForward, SkipBack, Music2 } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const { currentTrack, isPlaying, progress, togglePlay, handleNext, handlePrev } = useMusic();

  return (
    <div id="music-player-container" className="w-full h-full bg-[#0a0a0c] border border-white/5 rounded-sm flex items-center px-4 md:px-8 gap-6 md:gap-12 relative overflow-hidden group">
      
      {/* Decorative Glowing Edge */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Left: Track Info */}
      <div className="flex items-center gap-4 w-48 md:w-64 shrink-0">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center shrink-0">
          <motion.div
            animate={isPlaying ? { 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Music2 size={20} className="text-fuchsia-500" />
          </motion.div>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[12px] font-bold truncate tracking-tight text-white uppercase italic">{currentTrack.title}</span>
          <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono truncate">{currentTrack.artist}</span>
        </div>
      </div>

      {/* Center: Controls + Progress Bar */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <div className="flex justify-center items-center gap-6 md:gap-8">
          <button 
            onClick={handlePrev}
            className="text-white/40 hover:text-cyan-400 transition-colors"
          >
            <SkipBack size={18} fill="currentColor" />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:bg-cyan-400 hover:text-black transition-all"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>

          <button 
            onClick={handleNext}
            className="text-white/40 hover:text-cyan-400 transition-colors"
          >
            <SkipForward size={18} fill="currentColor" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:block text-[9px] font-mono text-white/30 w-8">0:00</span>
          <div className="flex-1 h-1 bg-white/5 rounded-sm overflow-hidden relative">
            <motion.div 
              className="h-full bg-cyan-400 rounded-sm shadow-[0_0_10px_#22d3ee] flex justify-end items-center"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            >
              <div className="w-1.5 h-1.5 bg-white shadow-[0_0_5px_white] rounded-full shrink-0" />
            </motion.div>
          </div>
          <span className="hidden md:block text-[9px] font-mono text-white/30 w-8 text-right">{currentTrack.duration}</span>
        </div>
      </div>

      {/* Right side bits: Volume visualizer dummy */}
      <div className="hidden md:flex w-40 items-center justify-end gap-3 text-white/20">
        <div className="flex items-end gap-[2px] h-4">
          {[0.4, 0.7, 0.5, 0.9, 0.3].map((h, i) => (
            <motion.div 
              key={i}
              animate={isPlaying ? { height: [`${h*100}%`, `${(1-h)*100}%`, `${h*100}%`] } : { height: `${h*100}%` }}
              transition={{ duration: 0.5 + i * 0.1, repeat: Infinity }}
              className="w-1 bg-cyan-400/40 rounded-t-[1px]" 
            />
          ))}
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest">Master_Audio</span>
      </div>

    </div>
  );
};
