import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './FiveHundredths.module.css';
import RennsportLogo from "/rennsport.png";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FiveHundredths({ 
  screenshotUrl = "../assets/lapShot.png",
  videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-sports-car-racing-on-a-track-34377-large.mp4" ,
  enableAudio = false
}) {
  const containerRef = useRef(null);
  const mediaContainerRef = useRef(null);
  const imageRef = useRef(null);
  const textContainerRef = useRef(null);
  const headingLinesRef = useRef([]);
  const paragraphRef = useRef(null);
  const overlayRef = useRef(null);
  const playBtnRef = useRef(null);
  const metaRef = useRef(null);
  const videoRef = useRef(null);
  
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(!enableAudio); 
  const [currentTime, setCurrentTime] = useState('0:00');
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current, 
        { scale: 1.08 },
        {
          scale: 1.00,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(headingLinesRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.4, stagger: 0.15, ease: "power4.out" }
      )
      .fromTo(paragraphRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.8"
      );

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onLeave: () => handleExitMedia(),
        onLeaveBack: () => handleExitMedia()
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (videoActive) return;
    gsap.killTweensOf([imageRef.current, overlayRef.current, playBtnRef.current, metaRef.current]);

    gsap.to(imageRef.current, { scale: 1.03, duration: 0.8, ease: "power2.out" });
    gsap.to(overlayRef.current, { opacity: 0.45, duration: 0.5, ease: "power2.out" });
    gsap.to(playBtnRef.current, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" });
    gsap.to(metaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.05 });
  };

  const handleMouseLeave = () => {
    if (videoActive) return;
    gsap.killTweensOf([imageRef.current, overlayRef.current, playBtnRef.current, metaRef.current]);

    gsap.to(imageRef.current, { scale: 1.0, duration: 0.8, ease: "power2.out" });
    gsap.to(overlayRef.current, { opacity: 0.2, duration: 0.5, ease: "power2.out" });
    gsap.to(playBtnRef.current, { scale: 0.8, opacity: 0, y: 10, duration: 0.4, ease: "power2.in" });
    gsap.to(metaRef.current, { opacity: 0, y: 15, duration: 0.4, ease: "power2.in" });
  };

  const handlePlayClick = () => {
    setLoadVideo(true);
    setVideoActive(true);
    setIsPlaying(true);

    gsap.to(overlayRef.current, { opacity: 0, duration: 0.6 });
    gsap.to(playBtnRef.current, { scale: 0.8, opacity: 0, duration: 0.3 });
    gsap.to(metaRef.current, { opacity: 0, duration: 0.3 });
  };

  useEffect(() => {
    if (videoActive && videoRef.current) {
      videoRef.current.play()
        .then(() => triggerControlIndicator())
        .catch(err => console.log("Autoplay prevented:", err));
    }
  }, [loadVideo, videoActive]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, loadVideo]);

  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
    triggerControlIndicator();
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(prev => !prev);
    triggerControlIndicator();
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    
    const mins = Math.floor(current / 60);
    const secs = Math.floor(current % 60).toString().padStart(2, '0');
    setCurrentTime(`${mins}:${secs}`);
    setProgress((current / duration) * 100);
  };

  const handleVideoEnded = () => {
    handleExitMedia();
  };

  const handleExitMedia = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setVideoActive(false);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('0:00');
    
    gsap.to(overlayRef.current, { opacity: 0.2, duration: 0.6 });
  };

  const triggerControlIndicator = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  const handleMouseMoveMedia = () => {
    if (videoActive) {
      triggerControlIndicator();
    }
  };

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.editorialGrid}>
        
        <div ref={textContainerRef} className={styles.contentCol}>
          <h2 className={styles.heading}>
            {["5 HUNDREDTHS", "OF A", "SECOND."].map((line, idx) => (
              <span key={idx} className={styles.headingRow}>
                <span 
                  ref={el => headingLinesRef.current[idx] = el} 
                  className={styles.headingLine}
                >
                  {line}
                </span>
              </span>
            ))}
          </h2>
          
          <div ref={paragraphRef} className={styles.descWrapper}>
            <p className={styles.paragraph}>
              The gap between a good lap and a great one isn't measured in seconds. 
              It's measured in tiny decisions made hundreds of times.
            </p>
            <div className={styles.detailsMeta}>
                <span>CHASING PERFECTION / 0.05s</span>
                <span>CONTINUOUS EVOLUTION</span>
            </div>

            <div className={styles.rennsportLogo}>
                <img src={RennsportLogo} alt="Rennsport" />
                <span className={styles.tooltip}>Rennsport</span>
            </div>
          </div>
        </div>

        <div 
          ref={mediaContainerRef}
          className={`${styles.mediaCol} ${videoActive ? styles.mediaActive : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMoveMedia}
          onClick={!videoActive ? handlePlayClick : undefined}
        >
          <img 
            ref={imageRef} 
            src={screenshotUrl} 
            alt="Porsche 963 visual study" 
            className={`${styles.screenshot} ${videoActive ? styles.screenshotHidden : ''}`}
          />

          <div ref={overlayRef} className={styles.overlay} />

          {loadVideo && (
            <video
                ref={videoRef}
                src={videoUrl}
                className={`${styles.video} ${videoActive ? styles.videoVisible : ''}`}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                playsInline
                muted={isMuted}
            />
          )}

          <div ref={metaRef} className={styles.hoverMeta}>
            <span className={styles.metaLabel}>EXHIBIT REPLAY</span>
            <h3 className={styles.metaTitle}>FUJI SPEEDWAY</h3>
            <span className={styles.metaSpec}>PORSCHE 963 LMDH</span>
          </div>

          <div ref={playBtnRef} className={styles.playTrigger}>
            <div className={styles.playCircle}>
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.playIcon}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <div className={`${styles.customControls} ${showControls && videoActive ? styles.controlsVisible : ''}`}>
            <button className={styles.controlBtn} onClick={togglePlayPause} aria-label="Toggle Playback">
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.controlIcon}>
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.controlIcon}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            
            <div className={styles.timelineTrack}>
              <div className={styles.timelineProgress} style={{ width: `${progress}%` }} />
            </div>

            <span className={styles.timestamp}>{currentTime}</span>

            <button className={`${styles.controlBtn} ${styles.muteBtn}`} onClick={toggleMute} aria-label="Toggle Audio">
              {isMuted ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.controlIcon}>
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.03c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.controlIcon}>
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}