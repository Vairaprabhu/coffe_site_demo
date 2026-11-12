import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { BackToTop, CustomCursor, Footer, Header, PageTransition, WhatsAppButton } from "./components/Layout.jsx";
import { Home } from "./pages/Home.jsx";
import { Story } from "./pages/Story.jsx";
import { Menu } from "./pages/Menu.jsx";
import { Craft } from "./pages/Craft.jsx";
import { Gallery } from "./pages/Gallery.jsx";
import { Contact } from "./pages/Contact.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const previousBehavior = root.style.getPropertyValue("scroll-behavior");
    const previousPriority = root.style.getPropertyPriority("scroll-behavior");
    root.style.setProperty("scroll-behavior", "auto", "important");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const frame = window.requestAnimationFrame(() => {
      if (previousBehavior) {
        root.style.setProperty("scroll-behavior", previousBehavior, previousPriority);
      } else {
        root.style.removeProperty("scroll-behavior");
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduceMotion ? 80 : 720);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-loader"
          role="status"
          aria-label="Preparing a fresh page"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="intro-loader-mark">Brew & Bean<span>.</span></span>
          <span className="intro-loader-rule"><span /></span>
          <span className="intro-loader-caption">A MOMENT, PLEASE.</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <IntroLoader />
      <CustomCursor />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/story" element={<PageTransition><Story /></PageTransition>} />
          <Route path="/menu" element={<PageTransition><Menu /></PageTransition>} />
          <Route path="/craft" element={<PageTransition><Craft /></PageTransition>} />
          <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><Home /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
