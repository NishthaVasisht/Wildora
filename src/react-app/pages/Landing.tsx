import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';

const backgroundImage =
  'https://i.pinimg.com/1200x/d3/14/3d/d3143d354ab64e050ed262f1fce29000.jpg';

const Landing: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const particleOverlayRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Preload background image
    const img = new Image();
    img.src = backgroundImage;

    // Intro animation for text elements
    if (!titleRef.current || !subtitleRef.current || !buttonRef.current) return;

    gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
      opacity: 0,
      y: 60,
    });

    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      duration: 1.2,
      opacity: 1,
      y: 0,
      ease: 'power3.out',
    })
      .to(
        subtitleRef.current,
        {
          duration: 1,
          opacity: 1,
          y: 0,
          ease: 'power3.out',
        },
        '-=0.8'
      )
      .to(
        buttonRef.current,
        {
          duration: 0.8,
          opacity: 1,
          y: 0,
          ease: 'power3.out',
        },
        '-=0.6'
      );

    // Sparkles loop
    gsap.to('.floating-sparkle', {
      duration: 3,
      y: '-=20',
      x: '+=10',
      rotation: 360,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: 0.2,
    });

    // Background slow zoom and pan animation
    if (bgImageRef.current) {
      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.05, xPercent: 5, yPercent: 5 },
        {
          scale: 1,
          xPercent: -5,
          yPercent: -5,
          duration: 15,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
        }
      );
    }

    // Particle overlay animation
    if (particleOverlayRef.current) {
      gsap.to(particleOverlayRef.current, {
        duration: 20,
        backgroundPosition: '100% 100%',
        ease: 'linear',
        repeat: -1,
      });
    }

    // Vignette subtle pulse
    if (vignetteRef.current) {
      gsap.to(vignetteRef.current, {
        duration: 8,
        opacity: 0.3,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  const handleNavigation = (): void => {
    if (
      !titleRef.current ||
      !subtitleRef.current ||
      !buttonRef.current ||
      !heroRef.current
    )
      return;

    const tl = gsap.timeline({
      onComplete: () => {
        navigate('/eras');
      },
    });

    tl.to([titleRef.current, subtitleRef.current, buttonRef.current], {
      duration: 0.6,
      opacity: 0,
      y: -30,
      skewY: 5,
      stagger: 0.1,
      ease: 'power3.in',
    }).to(
      heroRef.current,
      {
        duration: 0.5,
        opacity: 0,
        ease: 'power2.in',
      },
      '-=0.3'
    );
  };

  return (
    <div
      ref={heroRef}
      className="min-h-screen relative overflow-hidden bg-black"
    >
      {/* Animated Background Image */}
      <img
        ref={bgImageRef}
        src={backgroundImage}
        alt="Background"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
          (e.currentTarget.src = '/fallback.jpg')
        }
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Particle Overlay */}
      <div
        ref={particleOverlayRef}
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Vignette Effect */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, transparent 0%, rgba(0, 0, 0, 0.7) 100%)',
        }}
      />

      {/* Existing Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <Sparkles
            key={i}
            className="floating-sparkle absolute text-white/30 w-6 h-6"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
          >
            Welcome to
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Wildora
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed"
          >
            Dive into the magical world of Taylor Swift. Explore her eras,
            discover lyrics, and find out which era matches your soul.
          </p>

          <div ref={buttonRef}>
            <button
              onClick={handleNavigation}
              className="group inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-lg font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300"
            >
              Explore the Eras
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
};

export default Landing;