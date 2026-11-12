import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EditorialHero, EyebrowLink, ImageFrame, Reveal } from "../components/Layout.jsx";
import { coffeeItems, unsplash } from "../data.js";

const categories = [
  { id: "all", label: "A little of everything" },
  { id: "espresso", label: "From the espresso bar" },
  { id: "cold", label: "The cold side" },
  { id: "bakery", label: "Something alongside" },
];

export function Menu() {
  const [category, setCategory] = useState("all");
  const reduceMotion = useReducedMotion();
  const items = useMemo(() => category === "all" ? coffeeItems : coffeeItems.filter((item) => item.category === category), [category]);

  return (
    <>
      <EditorialHero
        className="menu-hero"
        image={unsplash("photo-1509042239860-f550ce710b93", 1900)}
        alt="A cup of specialty coffee on the counter"
        eyebrow="THE LINEUP / SEASON 01"
        title={<>Built for<br /><em>the bold.</em></>}
        description="Dialed-in espresso. Wildly expressive origins. Your next favorite is in here."
        number="02 — THE MENU"
        entrance="soften"
      />
      <section className="menu-page section-pad">
        <Reveal className="menu-intro" variant="soften"><span className="eyebrow">NO ORDINARY ORDER</span><h2>Find your<br /><em>next obsession.</em></h2><p>Small-batch coffee, dialed in and ready to challenge your usual. Start with a classic or take the scenic route.</p></Reveal>
        <div className="menu-tabs" role="tablist" aria-label="Filter menu by category">
          {categories.map((item) => <button key={item.id} id={`tab-${item.id}`} type="button" role="tab" aria-selected={category === item.id} aria-controls="menu-grid" className={category === item.id ? "menu-tab active" : "menu-tab"} onClick={() => setCategory(item.id)}>{item.label}{category === item.id && <motion.span className="menu-tab-indicator" layoutId="menu-tab-indicator" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}</button>)}
        </div>
        <motion.div className="menu-grid" id="menu-grid" role="tabpanel" aria-labelledby={`tab-${category}`} layout>
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item, index) => (
              <motion.article
                className="menu-card"
                key={item.name}
                layout
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.975 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.985 }}
                transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : Math.min(index * 0.045, 0.18), layout: { duration: reduceMotion ? 0 : 0.42 } }}
              >
                <ImageFrame src={unsplash(item.image, 800)} alt={item.name} className="menu-card-image" />
                <div className="menu-card-details"><div><span className="menu-category">{categories.find((value) => value.id === item.category)?.label}</span><h3>{item.name}</h3><p>{item.note}</p></div><span className="menu-price">{item.price}</span></div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        <div className="menu-footnote"><span>* Oat, almond & whole milk available · Ask us about today’s single origin</span><a href="https://wa.me/?text=Hi%20BREW%20%26%20BEAN!%20I%27d%20love%20to%20ask%20about%20your%20menu." target="_blank" rel="noreferrer">Have a question? <ArrowRight size={14} /></a></div>
      </section>
      <section className="menu-note"><div><span className="eyebrow">FRESH FROM THE ROASTER</span><h2>One origin.<br /><em>Infinite angles.</em></h2><p>Ask what’s on the brew bar today. We’re always testing something worth talking about.</p><EyebrowLink to="/craft">See how it’s made</EyebrowLink></div><div className="menu-note-image"><ImageFrame src={unsplash("photo-1495474472287-4d71bcdd2085", 1300)} alt="A handful of carefully selected coffee beans" /></div></section>
    </>
  );
}
