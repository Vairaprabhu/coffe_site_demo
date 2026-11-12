import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { EditorialHero, EyebrowLink, ImageFrame, Reveal } from "../components/Layout.jsx";
import { unsplash } from "../data.js";

const milestones = [
  { year: "2016", title: "We found the keys.", text: "One narrow shop, two friends, one very good coffee machine.", image: "photo-1501339847302-ac426a4a7cbb" },
  { year: "2019", title: "A few more seats.", text: "A bigger table, the first direct-farm relationships, many new regulars.", image: "photo-1445116572660-236099ec97a0" },
  { year: "2022", title: "Finding our rhythm.", text: "Small-batch roasting brought the whole coffee journey a little closer.", image: "photo-1559056199-641a0ac8b55e" },
  { year: "TODAY", title: "Still making time.", text: "The kettle's on, the door's open, and there's always room for one more.", image: "photo-1495474472287-4d71bcdd2085" },
];

function StoryTimeline() {
  const timelineRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 76%", "end 48%"],
  });
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="story-timeline section-pad" ref={timelineRef}>
      <Reveal className="timeline-intro" variant="soften">
        <span className="eyebrow">A FEW PAGES FROM OUR NOTEBOOK</span>
        <h2>One little year<br />at a <em>time.</em></h2>
      </Reveal>
      <div className="timeline-track" aria-hidden="true"><motion.span style={{ scaleX: reduceMotion ? 1 : progressScale }} /></div>
      <div className="timeline-events">
        {milestones.map((milestone, index) => (
          <Reveal className={`timeline-event timeline-event-${index + 1}`} key={milestone.year} variant={index % 2 === 0 ? "rise" : "soften"} delay={index * 0.1}>
            <img src={unsplash(milestone.image, 650)} alt="" aria-hidden="true" loading="lazy" decoding="async" onError={(event) => { const image = event.currentTarget; if (image.dataset.fallbackApplied) return; image.dataset.fallbackApplied = "true"; image.src = unsplash("photo-1442512595331-e89e73853f31", 650); }} />
            <span className="timeline-year">{milestone.year}</span>
            <h3>{milestone.title}</h3>
            <p>{milestone.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Story() {
  return (
    <>
      <EditorialHero
        className="story-hero"
        image={unsplash("photo-1445116572660-236099ec97a0", 2000)}
        alt="A warmly lit independent coffee shop"
        eyebrow="THE ORIGIN / BREW & BEAN"
        title={<>We broke the<br /><em>coffee routine.</em></>}
        description="One machine, a few uncompromising ideas, and a belief that coffee should make you feel something."
        number="01 — OUR STORY"
        entrance="left"
      />
      <section className="story-intro section-pad">
        <Reveal variant="soften"><span className="eyebrow">BUILT ON CURIOSITY</span><h2>We wanted coffee<br />with a little more <em>edge.</em></h2></Reveal>
        <Reveal delay={0.12} variant="left" className="story-intro-copy"><p>In 2016, two friends set out to do coffee on their own terms. We opened on Mercer Street with one machine, a lot of late nights, and a clear point of view: source with intention, roast with precision, and never settle for predictable.</p><p>That instinct still drives the lab. Better questions lead to better cups. The rest is just noise.</p><Link to="/contact" className="text-link">Meet us in person <ArrowRight size={15} /></Link></Reveal>
      </section>
      <StoryTimeline />
      <section className="story-image-split">
        <ImageFrame src={unsplash("photo-1501339847302-ac426a4a7cbb", 1400)} alt="The original Brew & Bean shop, warm and full of sunlight" className="story-photo" />
        <Reveal variant="left" className="story-side-copy"><span className="eyebrow">2016 / MERCER STREET</span><h2>One machine.<br /><em>Zero compromises.</em></h2><p>What started as a tiny coffee counter became a place to experiment, trade ideas, and rethink what a daily cup could be.</p><span className="handwritten">Still curious. Still brewing.</span></Reveal>
      </section>
      <section className="values-section section-pad">
        <Reveal className="values-heading"><span className="eyebrow">THE LAB CODE</span><h2>Our rules.<br /><em>Our ritual.</em></h2></Reveal>
        <div className="values-grid">
          {[["01", "People first.", "The farms we work with. The team behind the bar. The neighbor who knows your usual. Good things are always made together."], ["02", "Take your time.", "Coffee is farming, roasting, and craft. It deserves patience — and so do you. Pull up a chair."], ["03", "Leave it better.", "We try to make thoughtful choices, waste a little less, and leave the places we touch a bit brighter."]].map(([number, title, copy], index) => <Reveal className="value-card" key={number} delay={index * 0.08}><span className="value-number">{number}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
        </div>
      </section>
      <section className="page-end-cta"><span className="eyebrow">THE NEXT CHAPTER IS YOURS</span><h2>Come taste what’s next.</h2><EyebrowLink to="/contact" light>Find the lab</EyebrowLink></section>
    </>
  );
}
