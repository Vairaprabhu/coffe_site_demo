import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, MoveUpRight } from "lucide-react";
import { EyebrowLink, ImageFrame, Reveal } from "../components/Layout.jsx";
import { galleryImages, unsplash } from "../data.js";

const heroPoster = unsplash("photo-1442512595331-e89e73853f31", 2200);

const signatures = [
  { index: "01", name: "The house filter", origin: "HUILA, COLOMBIA · WASHED", tasting: "Blood orange, cocoa, a little honey.", image: "photo-1495474472287-4d71bcdd2085", category: "Pour over" },
  { index: "02", name: "Soft landing", origin: "SIDAMA, ETHIOPIA · NATURAL", tasting: "Wild strawberry, jasmine, bergamot.", image: "photo-1461023058943-07fcbe16d735", category: "Espresso" },
  { index: "03", name: "Day off", origin: "HUILA, COLOMBIA · DECAF", tasting: "Brown sugar, ripe pear, soft finish.", image: "photo-1517701604599-bb29b565090c", category: "On ice" },
];

function CoffeeDropMoment() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const dropY = useTransform(scrollYProgress, [0, 0.46, 0.64, 1], prefersReducedMotion ? ["17vh", "17vh", "17vh", "17vh"] : ["-23vh", "25vh", "37vh", "48vh"]);
  const dropOpacity = useTransform(scrollYProgress, [0, 0.14, 0.47, 0.62, 0.79, 1], prefersReducedMotion ? [1, 1, 1, 1, 1, 1] : [0, 0.9, 1, 1, 0, 0]);
  const dropScale = useTransform(scrollYProgress, [0, 0.48, 0.64, 0.75], prefersReducedMotion ? [1, 1, 1, 1] : [0.72, 0.9, 1.08, 0.76]);
  const photoScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1.08, 1]);
  const rippleScaleX = useTransform(scrollYProgress, [0.56, 0.72, 0.92], prefersReducedMotion ? [0, 0, 0] : [0.05, 1, 1.28]);
  const rippleScaleY = useTransform(scrollYProgress, [0.56, 0.72, 0.92], prefersReducedMotion ? [0, 0, 0] : [0.08, 1, 1.28]);
  const rippleOpacity = useTransform(scrollYProgress, [0.56, 0.68, 0.85, 1], prefersReducedMotion ? [0, 0, 0, 0] : [0, 0.8, 0.35, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.6, 1], prefersReducedMotion ? [0, 0, 0] : [32, 0, -22]);

  return (
    <section className="coffee-drop-scroll" ref={sectionRef} aria-label="The moment a coffee drop meets the brew">
      <div className="coffee-drop-scene">
        <motion.img
          className="coffee-drop-photo"
          src={unsplash("photo-1511537190424-bbbab87ac5eb", 1800)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          style={{ scale: photoScale }}
          onError={(event) => {
            const image = event.currentTarget;
            if (image.dataset.fallbackApplied) return;
            image.dataset.fallbackApplied = "true";
            image.src = unsplash("photo-1495474472287-4d71bcdd2085", 1800);
          }}
        />
        <div className="coffee-drop-shade" />
        <motion.div className="coffee-drop-heading" style={{ y: titleY }}>
          <span className="eyebrow">A MOMENT, IN FOUR PARTS</span>
          <h2>All that goodness.<br />In one <em>little drop.</em></h2>
          <p>Take a breath. Watch the brew. Let the morning catch up.</p>
        </motion.div>
        <span className="coffee-drop-index">01 &nbsp; THE POUR</span>
        <motion.svg
          className="coffee-drop-liquid"
          viewBox="0 0 100 130"
          aria-hidden="true"
          style={{ y: dropY, opacity: dropOpacity, scale: dropScale }}
        >
          <defs>
            <linearGradient id="coffee-liquid-gradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#9b7049" />
              <stop offset=".48" stopColor="#443323" />
              <stop offset="1" stopColor="#231d17" />
            </linearGradient>
          </defs>
          <path d="M50 3C42 19 15 50 15 78a35 35 0 0 0 70 0C85 50 58 19 50 3Z" fill="url(#coffee-liquid-gradient)" />
          <path d="M39 58c-5 8-7 14-7 22" fill="none" stroke="#f1dfbf" strokeLinecap="round" strokeOpacity=".57" strokeWidth="3" />
        </motion.svg>
        <motion.span className="coffee-drop-ripple" aria-hidden="true" style={{ scaleX: rippleScaleX, scaleY: rippleScaleY, opacity: rippleOpacity }} />
        <span className="coffee-drop-caption">FRESHLY GROUND&nbsp; · &nbsp;SLOWLY POURED&nbsp; · &nbsp;ALWAYS WORTH IT</span>
        <span className="coffee-drop-scroll-cue"><ArrowDown size={13} /> KEEP GOING</span>
      </div>
    </section>
  );
}

export function Home() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroProductY = useTransform(heroProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "12%"]);

  return (
    <>
      <section className="hero" id="top" ref={heroRef} style={{ "--hero-poster": `url("${heroPoster}")` }}>
        <motion.div
          className="hero-product"
          style={{ y: heroProductY }}
          initial={reduceMotion ? false : { opacity: 0, x: 28, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: -2 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <ImageFrame
            src={unsplash("photo-1517701604599-bb29b565090c", 900)}
            alt="A signature iced espresso, layered and ready to serve"
            className="hero-product-image"
            loading="eager"
          />
          <span className="hero-product-index">LAB POUR / 001</span>
          <span className="hero-product-caption">THE HOUSE ESPRESSO</span>
        </motion.div>
        <div className="hero-content">
          <motion.span className="eyebrow hero-eyebrow" initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.2 }}>UNDERGROUND COFFEE LAB · NYC</motion.span>
          <h1 className="hero-title">
            <span className="hero-title-line-mask"><motion.span initial={reduceMotion ? false : { opacity: 0, y: "105%" }} animate={{ opacity: 1, y: "0%" }} transition={{ delay: reduceMotion ? 0 : 0.28, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}>NOT JUST COFFEE.</motion.span></span>
            <span className="hero-title-line-mask"><motion.span initial={reduceMotion ? false : { opacity: 0, y: "105%" }} animate={{ opacity: 1, y: "0%" }} transition={{ delay: reduceMotion ? 0 : 0.42, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}>IT&apos;S A <em>RITUAL.</em></motion.span></span>
          </h1>
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.65 }}>Brewed Different. Served Bold.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.76 }}>
            <Link to="/menu" className="button button-cream">Explore our coffee <ArrowRight size={14} /></Link>
            <Link to="/story" className="button button-outline hero-story-cta">Discover our story <MoveUpRight size={13} /></Link>
          </motion.div>
        </div>
        <span className="hero-vertical">A DAILY PRACTICE IN PAYING ATTENTION</span>
        <a href="#welcome" className="scroll-cue"><ArrowDown size={14} /><span>SCROLL TO EXPLORE</span></a>
        <span className="hero-location">40°43' N&nbsp; 73°59' W</span>
      </section>

      <section className="welcome-section" id="welcome">
        <Reveal className="welcome-label" variant="left"><span className="eyebrow">NO RULES. JUST REALLY GOOD COFFEE.</span><span className="welcome-big-number">01</span></Reveal>
        <Reveal className="welcome-copy" variant="soften">
          <h2>Out of the ordinary.<br /><em>Into the ritual.</em></h2>
          <p>We chase the details: expressive beans, obsessive extraction, and the kind of flavor that makes you stop mid-sentence. No shortcuts. No coffee-as-an-afterthought.</p>
          <EyebrowLink to="/story">A note on the way we see it</EyebrowLink>
        </Reveal>
        <Reveal className="welcome-image-wrap" delay={0.12}>
          <ImageFrame src={unsplash("photo-1445116572660-236099ec97a0", 1200)} alt="A sunlit, quietly welcoming independent coffee shop" className="welcome-image" />
          <span className="image-caption">MERCER STREET, BEFORE THE DAY GETS GOING.</span>
        </Reveal>
      </section>

      <section className="favorites-section" id="coffee">
        <Reveal className="collection-intro">
          <span className="eyebrow">SMALL BATCH / BIG CHARACTER</span>
          <h2>Meet your new<br /><em>obsession.</em></h2>
          <p>Big flavor, no background noise. Meet the house pours we keep coming back to, dialed in and served on our terms.</p>
          <EyebrowLink to="/menu">See the full lineup</EyebrowLink>
          <div className="collection-image-stack" aria-label="Scenes from the coffee lab">
            <ImageFrame src={unsplash("photo-1495474472287-4d71bcdd2085", 520)} alt="Freshly roasted coffee beans" />
            <ImageFrame src={unsplash("photo-1511537190424-bbbab87ac5eb", 520)} alt="Coffee being carefully poured" />
            <ImageFrame src={unsplash("photo-1509042239860-f550ce710b93", 520)} alt="A finished espresso ready to serve" />
          </div>
          <span className="collection-margin-note">LAB NOTES<br />NO. 001—003 ↗</span>
        </Reveal>
        <div className="favorites-grid">
          {signatures.map((item, index) => (
            <Reveal key={item.index} className={`favorite-card favorite-card-${index + 1}`} variant="scale" delay={index * 0.12}>
              <Link to="/menu" className="signature-image-link" aria-label={`Discover ${item.name} in our coffee menu`}>
                <ImageFrame src={unsplash(item.image, 900)} alt={`${item.name}, a ${item.category.toLowerCase()} coffee`} className="favorite-image" />
              </Link>
              <div className="signature-meta"><span>{item.index} &nbsp; / &nbsp; {item.category}</span><span>{item.origin}</span></div>
              <div className="favorite-card-copy">
                <div><h3>{item.name}</h3><p>{item.tasting}</p></div>
                <Link to="/menu" aria-label={`View ${item.name}`}><MoveUpRight size={15} /></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CoffeeDropMoment />

      <section className="origin-section">
        <div className="origin-image" style={{ backgroundImage: `url("${unsplash("photo-1511537190424-bbbab87ac5eb", 1800)}")` }} role="img" aria-label="Careful pour-over coffee brewing by hand" />
        <div className="origin-overlay" />
        <Reveal className="origin-content">
          <span className="eyebrow">OBSERVE THE PROCESS / TASTE THE DIFFERENCE</span>
          <h2>Precision in.<br /><em>Possibility out.</em></h2>
          <p>Temperature. Time. Pressure. Every variable is a chance to pull something remarkable from the bean.</p>
          <EyebrowLink to="/craft" light>Step inside the lab</EyebrowLink>
        </Reveal>
        <span className="origin-note">OUR HANDS, YOUR MORNING.</span>
      </section>

      <section className="story-tease section-pad">
        <Reveal className="story-tease-copy" variant="left">
          <span className="eyebrow">A PLACE, A PEOPLE, A POUR</span>
          <h2>Not here to change<br />your life. Just to make<br /><em>your morning.</em></h2>
          <p>In 2016, two friends found a little shop with a lot of light and set a kettle on. We’ve been making space for good coffee and unhurried mornings ever since.</p>
          <EyebrowLink to="/story">The short version of our story</EyebrowLink>
          <span className="story-side-note">A LITTLE CORNER OF SOHO,<br />RIGHT HERE SINCE 2016.</span>
        </Reveal>
        <Reveal className="story-tease-photo" variant="right" delay={0.1}>
          <ImageFrame src={unsplash("photo-1497366754035-f200968a6e72", 1200)} alt="A bright, lived-in corner of an independent coffee shop" className="story-tease-image" />
          <span className="image-caption">SOMEWHERE TO LAND. SOMEWHERE TO STAY.</span>
        </Reveal>
      </section>

      <section className="gallery-tease">
        <div className="gallery-tease-heading"><div><span className="eyebrow">A FEW LITTLE MOMENTS &nbsp; / &nbsp; 01—04</span><h2>The in-<em>between.</em></h2></div><EyebrowLink to="/gallery">More things we notice</EyebrowLink></div>
        <div className="gallery-tease-grid">
          {galleryImages.slice(0, 4).map((image, index) => (
            <Link to="/gallery" className={`gallery-tease-tile gallery-tease-tile-${index + 1}`} key={image.src} aria-label={`Open gallery: ${image.alt}`}>
              <img src={unsplash(image.src, 850)} alt={image.alt} loading="lazy" decoding="async" onError={(event) => { const element = event.currentTarget; if (element.dataset.fallbackApplied) return; element.dataset.fallbackApplied = "true"; element.src = unsplash("photo-1442512595331-e89e73853f31", 850); }} />
              <span>0{index + 1}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="visit-strip section-pad">
        <span className="visit-index">39°43' N<br />73°59' W</span>
        <div className="visit-left"><span className="eyebrow">27 MERCER STREET / NEW YORK</span><h2>Find us<br /><em>underground.</em></h2></div>
        <div className="visit-right"><p>Monday–Sunday<br />7:30 AM—6:00 PM<br /><span>Come curious. Leave caffeinated.</span></p><Link to="/contact" className="round-link" aria-label="Visit our coffee shop"><MoveUpRight size={18} /></Link></div>
      </section>
    </>
  );
}
