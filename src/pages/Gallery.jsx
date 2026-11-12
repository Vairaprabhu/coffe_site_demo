import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Instagram, X } from "lucide-react";
import { EditorialHero, Reveal } from "../components/Layout.jsx";
import { galleryImages, unsplash } from "../data.js";

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectedIndexRef = useRef(selectedIndex);
  const closeButtonRef = useRef(null);
  const openerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const isLightboxOpen = selectedIndex !== null;

  selectedIndexRef.current = selectedIndex;

  useEffect(() => {
    if (!isLightboxOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      const currentIndex = selectedIndexRef.current;
      if (currentIndex === null) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setSelectedIndex(null);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedIndex((current) => (current + 1) % galleryImages.length);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length);
      } else if (event.key === "Tab") {
        const controls = Array.from(document.querySelectorAll(".gallery-lightbox button"));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (selectedIndexRef.current === null) openerRef.current?.focus();
    };
  }, [isLightboxOpen]);

  const openImage = (index, event) => {
    openerRef.current = event.currentTarget;
    setSelectedIndex(index);
  };
  const selectedImage = selectedIndex === null ? null : galleryImages[selectedIndex];

  return (
    <>
      <EditorialHero
        className="gallery-hero"
        image={unsplash("photo-1511920170033-f8396924c348", 1800)}
        alt="A coffee and a quiet moment in the morning"
        eyebrow="FIELD NOTES / VISUAL ARCHIVE"
        title={<>Inside the<br /><em>coffee lab.</em></>}
        description="The people, processes, and pours behind every experiment."
        number="04 — THE GALLERY"
        entrance="soften"
      />
      <section className="gallery-section section-pad">
        <Reveal className="gallery-intro" variant="soften"><span className="eyebrow">UNFILTERED / 001—008</span><h2>Proof of<br /><em>the process.</em></h2><p>Roast, ritual, result. Take a closer look at what goes into the cup.</p></Reveal>
        <div className="gallery-grid">
          {galleryImages.map((item, index) => (
            <Reveal key={item.src} className={`gallery-tile ${item.shape}`} delay={(index % 4) * 0.06} variant={index % 2 === 0 ? "scale" : "rise"}>
              <button className="gallery-tile-button" type="button" onClick={(event) => openImage(index, event)} aria-label={`View photo ${index + 1}: ${item.alt}`}>
                <img src={unsplash(item.src, 1000)} alt={item.alt} loading="lazy" decoding="async" onError={(event) => { const image = event.currentTarget; if (image.dataset.fallbackApplied) return; image.dataset.fallbackApplied = "true"; image.src = unsplash("photo-1442512595331-e89e73853f31", 1000); }} />
                <span className="gallery-tile-number">0{index + 1}</span>
                <span className="gallery-tile-open">VIEW MOMENT&nbsp; ↗</span>
              </button>
            </Reveal>
          ))}
        </div>
        <div className="gallery-follow"><span>THE LITTLE THINGS, EVERY DAY.</span><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={15} /> Follow along on Instagram <ArrowRight size={14} /></a></div>
      </section>
      <section className="gallery-end"><span className="eyebrow">YOU HAD TO BE THERE</span><h2>Next round’s on us.</h2><Link to="/contact" className="button button-cream">Find the lab <ArrowRight size={15} /></Link></section>
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedIndex(null);
            }}
          >
            <div className="gallery-lightbox-dialog" role="dialog" aria-modal="true" aria-label={`Photo ${selectedIndex + 1} of ${galleryImages.length}: ${selectedImage.alt}`}>
              <button ref={closeButtonRef} className="lightbox-control lightbox-close" type="button" onClick={() => setSelectedIndex(null)} aria-label="Close photo viewer"><X size={21} /></button>
              <button className="lightbox-control lightbox-prev" type="button" onClick={() => setSelectedIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length)} aria-label="Previous photo"><ArrowLeft size={19} /></button>
              <AnimatePresence mode="wait">
                <motion.figure
                  className="lightbox-figure"
                  key={selectedImage.src}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28 }}
                >
                  <img
                    src={unsplash(selectedImage.src, 1800)}
                    alt={selectedImage.alt}
                    onError={(event) => {
                      const image = event.currentTarget;
                      if (image.dataset.fallbackApplied) return;
                      image.dataset.fallbackApplied = "true";
                      image.src = unsplash("photo-1442512595331-e89e73853f31", 1400);
                    }}
                  />
                  <figcaption><span>{selectedImage.alt}</span><span>{String(selectedIndex + 1).padStart(2, "0")} &nbsp;/&nbsp; {String(galleryImages.length).padStart(2, "0")}</span></figcaption>
                </motion.figure>
              </AnimatePresence>
              <button className="lightbox-control lightbox-next" type="button" onClick={() => setSelectedIndex((current) => (current + 1) % galleryImages.length)} aria-label="Next photo"><ArrowRight size={19} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
