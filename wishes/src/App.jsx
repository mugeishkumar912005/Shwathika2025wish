import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import bg from './assets/bgvid2.mp4';
import "./App.css"
const App = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/server/audio-message")
      .then(response => response.blob())
      .then(blob => {
        const audioFileUrl = URL.createObjectURL(blob);
        setAudioUrl(audioFileUrl);
      })
      .catch(error => {
        console.error("Error fetching audio:", error);
      });

    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setAudioEnded(true);
  };

  return (
    <div className="vidbg-bdy" style={{ height: '100vh', position: 'relative' }}>
      <video 
        src={bg} 
        autoPlay 
        loop 
        muted 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0
        }}
      />
      
      <div className="content" style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}>
        <div className="top-txt">
          <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>
            Hey Princess Welcome This Message is For You
          </h3>
          <h5 style={{ fontSize: '18px', marginBottom: '24px' }}>
            Play it with headphones....
          </h5>
        </div>

        {audioUrl && (
          <div className="audio-controls" style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <button
              onClick={togglePlay}
              style={{
                padding: '12px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isPlaying ? <Pause color="white" size={24} /> : <Play color="white" size={24} />}
            </button>
            
            <button
              onClick={toggleMute}
              style={{
                padding: '12px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isMuted ? <VolumeX color="white" size={24} /> : <Volume2 color="white" size={24} />}
            </button>

            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={handleAudioEnd}
              style={{ display: 'none' }}
            />
          </div>
        )}

        {audioEnded && (
          <div className="final-text">
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              opacity: 0,
              animation: 'fadeIn 1s forwards'
            }}>
              Shwathika You're my home Dear you go win the world let me wait for you as i said my 50 years will be worth only with you 
            </h2>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          button:hover {
            background-color: rgba(255, 255, 255, 0.2) !important;
          }
        `}
      </style>
    </div>
  );
};

export default App;