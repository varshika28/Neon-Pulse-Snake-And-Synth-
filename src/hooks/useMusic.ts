import { useState, useRef, useEffect, useCallback } from 'react';
import { Track } from '../types';

const TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'CyberSynth AI',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: '6:12',
  },
  {
    id: '2',
    title: 'Midnight Pulse',
    artist: 'Drift Engine',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: '7:05',
  },
  {
    id: '3',
    title: 'Digital Horizon',
    artist: 'Vector Core',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: '5:48',
  },
];

export const useMusic = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    audioRef.current = new Audio(currentTrack.url);
    audioRef.current.addEventListener('timeupdate', () => {
      if (audioRef.current) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    });
    audioRef.current.addEventListener('ended', handleNext);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentTrack.url]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.log('Playback blocked or failed', e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrack.url]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentTrackIndex(prev => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentTrackIndex(prev => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  }, []);

  return {
    currentTrack,
    isPlaying,
    progress,
    togglePlay,
    handleNext,
    handlePrev,
    tracks: TRACKS,
  };
};
