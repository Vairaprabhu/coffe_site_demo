import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EditorialHero, EyebrowLink, ImageFrame, Reveal } from "../components/Layout.jsx";
import { unsplash } from "../data.js";

const coffeeStages = [
  { number: "01", name: "The beans", title: "It starts at the source.", description: "Seasonal coffees, thoughtfully grown and chosen for the character of each harvest.", image: "photo-1495474472287-4d71bcdd2085", alt: "Fresh coffee beans selected for the daily brew" },
  { number: "02", name: "The roast", title: "A little warmth. A lot of care.", description: "Small-batch roasting lets every coffee tell its own story, slowly, without rushing the good bits.", image: "photo-1559056199-641a0ac8b55e", alt: "Coffee beans as they are carefully roasted" },
  { number: "03", name: "The grind", title: "Fresh, just before the pour.", description: "We grind for the cup in front of us, so the lovely little details have somewhere to go.", image: "photo-1511537190424-bbbab87ac5eb", alt: "Ground coffee prepared for a fresh pour-over" },
  { number: "04", name: "The brew", title: "And then, a moment to yourself.", description: "A slow pour, a warm cup, and a little room for the rest of the world to catch up.", image: "photo-1442512595331-e89e73853f31", alt: "A fresh cup of filter coffee ready to enjoy" },
];

function CoffeeJourney() {
  const sectionRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.08, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["6%", "-6%"]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextStage = Math.min(Math.floor(progress * coffeeStages.length), coffeeStages.length - 1);
    setActiveStage((current) => current === nextStage ? current : nextStage);
  });

  const goToStage = (index) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: sectionTop + scrollableDistance * (index / coffeeStages.length),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const stage = coffeeStages[activeStage];

  return (
    <section className="craft-journey" ref={sectionRef} aria-label="The journey from coffee bean to cup">
      <div className={`craft-journey-scene ${videoFailed ? "craft-video-failed" : ""}`}>
        <video className="craft-journey-video" autoPlay muted loop playsInline preload="metadata" poster={unsplash(stage.image, 1400)} onError={() => setVideoFailed(true)} aria-label="Coffee being carefully prepared in a cafe">
          <source src="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="craft-journey-shade" />
        <div className="craft-journey-inner">
          <div className="craft-journey-intro">
            <span className="eyebrow">FROM FIRST BEAN TO FIRST SIP</span>
            <h2>Four small things.<br /><em>One lovely cup.</em></h2>
            <span className="craft-journey-scroll"><ArrowDown size={13} /> FOLLOW THE PROCESS</span>
          </div>
          <div className="craft-stage-feature">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                className="craft-stage-copy"
                key={stage.number}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 17, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -11, filter: "blur(3px)" }}
                transition={{ duration: reduceMotion ? 0 : 0.34 }}
              >
                <span className="eyebrow">{stage.number} &nbsp; / &nbsp; THE JOURNEY</span>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div className="craft-stage-photo" key={`${stage.number}-image`} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(5% 0 0 0)" }} animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }} exit={{ opacity: 0, clipPath: "inset(0 0 5% 0)" }} transition={{ duration: reduceMotion ? 0 : 0.48 }}>
                <motion.img src={unsplash(stage.image, 1200)} alt={stage.alt} loading="lazy" decoding="async" style={{ y: imageY }} onError={(event) => { const image = event.currentTarget; if (image.dataset.fallbackApplied) return; image.dataset.fallbackApplied = "true"; image.src = unsplash("photo-1442512595331-e89e73853f31", 1200); }} />
                <span>{stage.name.toUpperCase()}</span>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="craft-journey-controls">
            <div className="craft-progress-track" aria-hidden="true"><motion.span style={{ scaleX: progressScale }} /></div>
            <nav className="craft-stage-nav" aria-label="Coffee making stages">
              {coffeeStages.map((item, index) => (
                <button key={item.number} type="button" className={index === activeStage ? "is-active" : ""} aria-current={index === activeStage ? "step" : undefined} onClick={() => goToStage(index)}>
                  <span>{item.number}</span>{item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Craft() {
  return (
    <>
      <EditorialHero
        className="craft-hero"
        image={unsplash("photo-1559056199-641a0ac8b55e", 2000)}
        alt="A selection of carefully roasted coffee beans"
        eyebrow="PROCESS / PRECISION / PLAY"
        title={<>The science<br />of <em>good coffee.</em></>}
        description="We follow the bean from its first crack to the first sip. No step left to chance."
        number="03 — OUR CRAFT"
        entrance="right"
      />
      <section className="craft-intro section-pad">
        <Reveal variant="soften"><span className="eyebrow">THE METHOD</span><h2>Bean to brew.<br /><em>All signal.</em></h2></Reveal>
        <Reveal delay={0.1} variant="right" className="craft-intro-copy"><p>Great coffee is a chain reaction. We get close to every link: the farm, the roast curve, the grind, the water, the pressure.</p><p>Then we pull a shot, taste, adjust, and do it again. The ritual is in the refinement.</p><Link to="/contact" className="text-link">Talk shop with us <ArrowRight size={15} /></Link></Reveal>
      </section>
      <CoffeeJourney />
      <section className="craft-origin">
        <div className="craft-origin-image"><ImageFrame src={unsplash("photo-1495474472287-4d71bcdd2085", 1500)} alt="Single-origin green and roasted coffee beans" /></div>
        <Reveal variant="left" className="craft-origin-copy"><span className="eyebrow">01 / A GOOD PLACE TO BEGIN</span><h2>Good coffee<br />has <em>good roots.</em></h2><p>We seek out thoughtful growers and small lots with a story to tell. Seasonal, traceable, and chosen for the way it tastes — never for a label alone.</p><EyebrowLink to="/story">Our people & our place</EyebrowLink></Reveal>
      </section>
      <section className="craft-steps section-pad">
        <Reveal className="steps-heading"><span className="eyebrow">CONTROL THE VARIABLES</span><h2>Fine-tuned<br /><em>by hand.</em></h2></Reveal>
        <div className="steps-grid">{[["02", "Roasted in small batches", "We keep it close and keep it fresh. Our approach to roasting is patient, precise, and always led by what the coffee wants to be."], ["03", "Made by hand, every day", "Our baristas taste, tweak, and tend to every cup. No rush, no shortcuts — just a little craft in the everyday."], ["04", "Better, together", "By making considered choices at every step, we try to build a coffee ritual that feels good to be part of."]].map(([number, title, text], index) => <Reveal className="craft-step" key={number} variant={index === 0 ? "rise" : "left"} delay={index * 0.12}><span>{number} / THE DETAILS</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div>
      </section>
      <section className="craft-quote"><div className="craft-quote-photo" style={{ backgroundImage: `url("${unsplash("photo-1442512595331-e89e73853f31", 1700)}")` }} /><div className="craft-quote-copy"><span className="eyebrow">A NOTE TO THE CURIOUS</span><h2>“A little care<br />changes <em>everything.”</em></h2><Link to="/menu" className="text-link text-link-light">Taste the difference <ArrowRight size={15} /></Link></div></section>
    </>
  );
}
