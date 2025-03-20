import { useEffect, useRef, useState } from 'react';
import styles from './MainContent.module.css';

const teamMembers = {
  owner: {
    name: 'loubae',
    role: 'השליט העליון',
    avatar: '/membersskins/loubae.png'
  },
  coLeaders: [
    { name: 'ubb', role: 'הקבינט', avatar: '/membersskins/ubb.png' },
    { name: 'Hpx', role: 'הקבינט', avatar: '/membersskins/hpx.png' },
    { name: 'ilykami', role: 'הקבינט', avatar: '/membersskins/ilykami.png' },
    { name: '_Shaked', role: 'הקבינט', avatar: '/membersskins/shaked.png' }
  ],
  members: [
    { name: 'mishakelev', role: 'חבר טים', avatar: '/membersskins/mishakelev.png' },
    { name: 'fuzetea2', role: 'חבר טים', avatar: '/membersskins/fuzetea2.png'},
    { name: 'mordi972', role: 'חבר טים', avatar: '/membersskins/mordi972.png', badge: 'שריף' },
    { name: 'ktsitsa', role: 'חבר טים', avatar: '/membersskins/ktsitsa.png', badge: 'שריף' },
    { name: 'ItsCatCafe', role: 'חבר טים', avatar: '/membersskins/itscatcafe.png' },
    { name: 'ItamarPizzaKing', role: 'חבר טים', avatar: '/membersskins/itamarpizzaking.png' },
    { name: 'PBIL', role: 'חבר טים', avatar: '/membersskins/pbil.png' },
    { name: 'BiffleZ', role: 'חבר טים', avatar: '/membersskins/bifflez.png' },
    { name: 'ItsPiko_', role: 'חבר טים', avatar: '/membersskins/itspiko.png' },
    { name: 'Yan1One', role: 'חבר טים', avatar: '/membersskins/yan1one.png' },
    { name: 'ImEmotionless', role: 'חבר טים', avatar: '/membersskins/imemotionless.png' },
    { name: 'Big4Lord', role: 'חבר טים', avatar: '/membersskins/big4lord.png' },
    { name: 'NADAVmood_XD', role: 'חבר טים', avatar: '/membersskins/nadavmoodxd.png' },
    { name: 'foxyfrozen', role: 'חבר טים', avatar: '/membersskins/foxyfrozen.png' }
  ]
};

const galleryImages = [
  '2025-03-17_21.19.33.png',
  '2025-03-17_21.18.55.png',
  '2025-03-17_21.18.28.png',
  '2025-03-17_21.18.14.png',
  '2025-03-17_21.17.56.png',
  '2025-03-17_21.17.16.png',
  '2025-03-17_21.17.05.png',
  '2025-03-17_21.16.59.png',
  '2025-03-17_21.16.16.png',
  '2025-03-17_21.15.42.png',
  '2025-03-17_21.15.11.png',
  '2025-03-17_21.15.05.png',
  '2025-03-17_21.15.00.png',
  '2025-03-17_21.14.36.png',
  '2025-03-17_21.14.29.png',
  '2025-03-17_21.14.22.png',
  '2025-03-17_21.14.05.png',
  '2025-03-17_21.13.46.png',
  '2025-03-17_21.13.32.png',
  '2025-03-17_21.13.02.png',
  '2025-03-17_21.12.49.png',
  '2025-03-17_21.12.35.png',
  '2025-03-17_21.11.57.png',
  '2025-03-17_21.11.42.png',
  '2025-03-17_21.11.24.png',
  '2025-03-17_21.11.00.png',
  '2025-03-17_21.10.53.png',
  '2025-03-17_21.10.29.png'
].map((filename, i) => ({
  url: `/snowimages/${filename}`,
  alt: `Team Snow Screenshot ${i + 1}`
}));

const SNOWFLAKE_COUNT = 50;

export const MainContent: React.FC = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Preload images
    galleryImages.forEach((image) => {
      const img = new Image();
      img.src = image.url;
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [image.url]: true }));
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${image.url}`);
        setFailedImages(prev => new Set([...prev, image.url]));
      };
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animateBlob = () => {
      if (blobRef.current) {
        // Smooth interpolation
        currentPosition.current.x = lerp(
          currentPosition.current.x,
          mousePosition.current.x,
          0.15
        );
        currentPosition.current.y = lerp(
          currentPosition.current.y,
          mousePosition.current.y,
          0.15
        );

        const x = currentPosition.current.x - 175; // Half of blob width
        const y = currentPosition.current.y - 175;

        blobRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      animationRef.current = requestAnimationFrame(animateBlob);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animateBlob);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const generateSnowflakes = () => {
    return Array.from({ length: SNOWFLAKE_COUNT }).map((_, index) => {
      const left = `${Math.random() * 100}%`;
      const animationDuration = `${Math.random() * 3 + 7}s`;
      // Distribute snowflakes across the entire viewport height initially
      const initialTop = `${Math.random() * 100}vh`;
      // Add a random animation delay to create a more natural effect
      const animationDelay = `${Math.random() * -20}s`;
      const style = {
        left,
        animationDuration,
        animation: `${styles.snowfall} ${animationDuration} linear infinite`,
        animationDelay,
        top: initialTop
      };
      return <div key={index} className={styles.snowflake} style={style} />;
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const src = e.currentTarget.src;
    console.error(`Failed to load image: ${src}`);
    setFailedImages(prev => new Set([...prev, src]));
  };

  // Filter out failed images from the gallery
  const validGalleryImages = galleryImages.filter(image => !failedImages.has(image.url));

  return (
    <>
      <div className="cursor-blob" ref={blobRef} />
      <a href="https://discord.com/invite/topstrix" target="_blank" rel="noopener noreferrer">
        <img src="/TPSRX.svg" alt="TPSRX Logo" className={styles.tpsrxLogo} />
      </a>
      <main className={styles.main}>
        <section className={styles.hero}>
          {generateSnowflakes()}
          <h1>Team Snow</h1>
          <a href="https://discord.gg/AnPYn83DnR" className={styles.discordButton}>
            הצטרפו לשרת הדיסקורד
          </a>
        </section>
        
        <section className={styles.members}>
          <h2>חברי הקבוצה</h2>
          <div className={styles.memberGrid}>
            <div className={styles.ownerRow}>
              <div className={styles.memberCard}>
                <img src={teamMembers.owner.avatar} alt={teamMembers.owner.name} />
                <h3>{teamMembers.owner.name}</h3>
                <span className={styles.ownerBadge}>השליט העליון</span>
              </div>
            </div>

            <div className={styles.coLeaderRow}>
              {teamMembers.coLeaders.map((member) => (
                <div key={member.name} className={styles.memberCard}>
                  <img src={member.avatar} alt={member.name} />
                  <h3>{member.name}</h3>
                  <span className={styles.cabinetBadge}>הקבינט</span>
                </div>
              ))}
            </div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <div className={styles.membersRow}>
                {teamMembers.members.map((member) => (
                  <div key={member.name} className={styles.memberCard}>
                    <img src={member.avatar} alt={member.name} />
                    <h3>{member.name}</h3>
                    {member.badge ? (
                      <span className={styles.sheriffBadge}>{member.badge}</span>
                    ) : (
                      <span className={styles.memberBadge}>חבר טים</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.gallery}>
          <h2>הבייס שלנו</h2>
          <div className={styles.galleryScroll}>
            <div className={styles.galleryInner}>
              {[...validGalleryImages, ...validGalleryImages].map((image, index) => (
                <div key={`gallery-${index}`} className={styles.galleryItem}>
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    loading="lazy"
                    onError={handleImageError}
                    style={{
                      opacity: imagesLoaded[image.url] ? 1 : 0,
                      transition: 'opacity 0.3s ease'
                    }}
                    onLoad={(e) => {
                      setImagesLoaded(prev => ({ ...prev, [image.url]: true }));
                      e.currentTarget.style.opacity = '1';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <footer className={styles.footer}>
            <p>© 2025 Team Snow. All rights reserved.</p>
          </footer>
        </section>
      </main>
    </>
  );
}; 