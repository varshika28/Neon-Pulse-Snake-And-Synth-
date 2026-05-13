/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Zap, Radio } from 'lucide-react';

export default function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-[#020203] text-white p-6 md:p-8 font-sans overflow-hidden select-none relative">
      
      {/* Scanline / Grid Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      {/* Header Section */}
      <header className="flex justify-between items-end border-b border-white/10 pb-4 mb-8 shrink-0 relative z-10">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 font-bold mb-1">System Status: Active</span>
          <h1 className="text-4xl font-black tracking-tighter italic">SYNTH<span className="text-fuchsia-500">SLITHER</span></h1>
        </div>
        <div className="hidden md:flex gap-12 text-right">
          <div className="flex flex-col items-end">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Grid Connection</p>
            <p className="text-sm font-mono font-bold text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              STABLE_OS
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Level</p>
            <p className="text-sm font-mono font-bold text-white tracking-widest">RANK_01</p>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex flex-1 gap-8 mb-8 overflow-hidden min-h-0 relative z-10">
        {/* Left Side: Stats/Status */}
        <aside className="hidden lg:flex w-56 flex-col gap-4">
          <div className="bg-[#0a0a0c] border border-white/5 p-4 rounded-sm">
            <h3 className="text-[10px] uppercase tracking-widest text-fuchsia-500 mb-3 font-bold">System Load</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] mb-1"><span>CPU</span><span className="text-cyan-400 tracking-tighter uppercase">Thread_0</span></div>
                <div className="h-1 bg-white/10 w-full overflow-hidden"><div className="h-full bg-cyan-400 w-[60%] shadow-[0_0_8px_#22d3ee]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1"><span>SYNC</span><span className="text-cyan-400 tracking-tighter uppercase">BPM_124</span></div>
                <div className="h-1 bg-white/10 w-full overflow-hidden"><div className="h-full bg-fuchsia-500 w-[45%] shadow-[0_0_8px_#d946ef]"></div></div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0a0a0c] border border-white/5 p-4 rounded-sm flex-1 overflow-y-auto">
            <h3 className="text-[10px] uppercase tracking-widest text-fuchsia-500 mb-3 font-bold">Protocol</h3>
            <ul className="text-[11px] leading-relaxed text-white/60 space-y-3 font-mono">
              <li className="flex gap-2"><span>[0]</span> <span>ARROW_KEYS_NAV</span></li>
              <li className="flex gap-2 text-cyan-400/80"><span>[1]</span> <span>CONSUME_ORBS</span></li>
              <li className="flex gap-2"><span>[2]</span> <span>AVOID_BOUNDS</span></li>
              <li className="flex gap-2"><span>[3]</span> <span>SYNC_WITH_BEAT</span></li>
            </ul>
          </div>
        </aside>

        {/* Center: Snake Game Board */}
        <main className="flex-1 flex justify-center items-center relative overflow-hidden">
          <SnakeGame />
        </main>

        {/* Right Side: Sidebar Branding / Stats */}
        <aside className="hidden lg:flex w-64 flex-col bg-[#0a0a0c] border border-white/5 p-4 rounded-sm">
          <h3 className="text-[10px] uppercase tracking-widest text-fuchsia-500 mb-4 font-bold">Global Ranking</h3>
          <div className="space-y-2 overflow-y-auto flex-1 font-mono">
            {[1280, 1150, 940, 820, 450].map((score, idx) => (
              <div key={idx} className={`p-3 bg-white/5 border-l-2 ${idx === 0 ? 'border-cyan-400 bg-cyan-400/5' : 'border-white/10'} flex justify-between items-center`}>
                <span className="text-[10px] text-white/40">USER_{100 + idx}</span>
                <span className={`text-[12px] font-bold ${idx === 0 ? 'text-cyan-400' : ''}`}>{score.toString().padStart(5, '0')}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-[9px] text-white/20 tracking-wider font-mono">ENCRYPTED_SESSION: {Math.random().toString(36).substring(7).toUpperCase()}</p>
          </div>
        </aside>
      </div>

      {/* Footer: Music Player Controls */}
      <footer className="shrink-0 h-auto md:h-28 relative z-10 w-full flex justify-center">
        <MusicPlayer />
      </footer>

    </div>
  );
}

