import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
  const { currentMusic } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentMusic.url;
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log('Autoplay blocked:', err));
      }
    }
  }, [currentMusic]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log('Playback failed:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <audio ref={audioRef} src={currentMusic.url} loop />
      
      <button
        onClick={toggleMute}
        className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors border border-gray-200"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX size={20} className="text-gray-600" />
        ) : (
          <Volume2 size={20} className="text-pesantren-green" />
        )}
      </button>

      <button
        onClick={togglePlay}
        className="p-4 bg-pesantren-green rounded-full shadow-lg hover:bg-pesantren-darkGreen transition-colors text-white"
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Pause size={24} />
        ) : (
          <Play size={24} />
        )}
      </button>

      <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200">
        <Music size={18} className="text-pesantren-green" />
        <span className="text-sm font-medium text-gray-700">{currentMusic.name}</span>
      </div>
    </div>
  );
};

export default MusicPlayer;
