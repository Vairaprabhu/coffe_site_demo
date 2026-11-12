import { useState } from "react";
import { ArrowRight, Clock3, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EditorialHero, Reveal } from "../components/Layout.jsx";

const MAP_URL = "https://maps.google.com/maps?q=27%20Mercer%20Street%2C%20New%20York%2C%20NY&t=&z=15&ie=UTF8&iwloc=&output=embed";

export function Contact() {
  const [draftReady, setDraftReady] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = encodeURIComponent(`A note from ${data.get("name")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
    window.location.href = `mailto:hello@brewandbean.com?subject=${subject}&body=${body}`;
    setDraftReady(true);
    form.reset();
  };

  return (
    <>
      <EditorialHero
        className="contact-hero"
        image="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1900&q=82"
        alt="A welcoming neighborhood coffee shop"
        eyebrow="COORDINATES / 40.72° N"
        title={<>Find the<br /><em>coffee lab.</em></>}
        description="Come curious. Leave with a new favorite."
        number="05 — COME ON IN"
        entrance="left"
      />
      <section className="contact-main section-pad">
        <Reveal className="contact-details">
          <span className="eyebrow">THE DOOR IS OPEN</span><h2>Make a<br /><em>move.</em></h2><p className="contact-welcome">Find Brew & Bean at 27 Mercer. Your next favorite cup is closer than you think.</p>
          <div className="contact-detail"><MapPin size={17} /><div><span>OUR LITTLE CORNER</span><a href="https://maps.google.com/?q=27+Mercer+Street+New+York+NY" target="_blank" rel="noreferrer">27 Mercer Street<br />New York, NY 10013</a></div></div>
          <div className="contact-detail"><Clock3 size={17} /><div><span>WHEN WE’RE HERE</span><p>Monday – Sunday<br />7:30 AM – 6:00 PM</p></div></div>
          <div className="contact-detail"><Phone size={17} /><div><span>GIVE US A RING</span><a href="tel:+12125550148">+1 212 555 0148</a></div></div>
          <a className="text-link" href="https://wa.me/?text=Hi%20BREW%20%26%20BEAN!%20I%27d%20love%20to%20know%20more." target="_blank" rel="noreferrer">Or find us on WhatsApp <ArrowRight size={15} /></a>
        </Reveal>
        <Reveal className="contact-form-wrap" delay={0.12}>
          <span className="eyebrow">SEND A SIGNAL</span><h3>Let’s talk coffee.</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" type="text" autoComplete="name" placeholder="What should we call you?" required minLength={2} />
            <label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@somewhere.com" required />
            <label htmlFor="contact-message">What’s on your mind?</label><textarea id="contact-message" name="message" rows="4" placeholder="A question, a kind word, anything at all..." required minLength={10} />
            <motion.button type="submit" className="button button-dark" whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.985 }}>Send us a little note <ArrowRight size={15} /></motion.button>
            <AnimatePresence>
              {draftReady && <motion.p className="form-note" role="status" initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }}>Your email draft is ready in your mail app. Give it a quick look, then send it our way.</motion.p>}
            </AnimatePresence>
            <p className="form-disclaimer">Your note opens in your email app so you can send it directly. We never store your details here.</p>
          </form>
        </Reveal>
      </section>
      <Reveal className="map-section" variant="scale">
        <iframe title="Map showing Brew & Bean at 27 Mercer Street in New York" src={MAP_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <a className="map-card" href="https://maps.google.com/?q=27+Mercer+Street+New+York+NY" target="_blank" rel="noreferrer"><span className="eyebrow">A LITTLE CORNER OF SOHO</span><strong>27 Mercer Street</strong><span>New York, NY 10013 <ArrowRight size={14} /></span></a>
      </Reveal>
      <section className="contact-bottom"><span className="eyebrow">SEE YOU SOON, WE HOPE</span><h2>Your seat is waiting.</h2><Link to="/menu" className="text-link text-link-light">Have a look at the menu <ArrowRight size={15} /></Link></section>
    </>
  );
}
