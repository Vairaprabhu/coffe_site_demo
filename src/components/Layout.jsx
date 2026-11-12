import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUp, Instagram, Menu as MenuIcon, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/story", label: "Our story" },
  { to: "/menu", label: "Coffee menu" },
  { to: "/craft", label: "Our craft" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Visit us" },
];

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 42, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 500, damping: 42, mass: 0.35 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return undefined;
    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [reduceMotion, x, y]);

  if (reduceMotion) return null;

  return (
    <div className={`custom-cursor ${visible ? "is-visible" : ""}`} aria-hidden="true">
      <motion.span className="custom-cursor-ring" style={{ x: springX, y: springY }} />
      <motion.span className="custom-cursor-dot" style={{ x, y }} />
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <motion.header className="site-header" initial={false} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <Link to="/" className="wordmark" aria-label="Brew and Bean home" onClick={closeMenu}>
        <span className="wordmark-main">Brew & Bean<span className="wordmark-period">.</span></span>
        <span className="wordmark-caption">UNDERGROUND COFFEE LAB</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(({ to, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            {({ isActive }) => <>{label}{isActive && <motion.span className="nav-active-indicator" layoutId="active-navigation-indicator" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}</>}
          </NavLink>
        ))}
      </nav>
      <Link className="header-cta" to="/menu">VIEW THE MENU <ArrowRight size={13} /></Link>
      <button
        className="mobile-menu-toggle"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
      >
        {open ? <X size={21} /> : <MenuIcon size={21} />}
      </button>
      <div className={`mobile-nav ${open ? "is-open" : ""}`} id="mobile-navigation" aria-hidden={!open}>
        <span className="eyebrow">A LITTLE MORE THAN COFFEE.</span>
        {links.map(({ to, label }, index) => (
          <motion.div key={to} initial={false} animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }} transition={{ delay: reduceMotion ? 0 : open ? index * 0.06 : 0, duration: reduceMotion ? 0 : 0.25 }}>
            <NavLink to={to} onClick={closeMenu}>{label}<ArrowRight size={17} /></NavLink>
          </motion.div>
        ))}
        <a className="mobile-social" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={16} /> Follow along</a>
      </div>
    </motion.header>
  );
}

export function PageTransition({ children }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.main
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
      transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

const revealVariants = {
  rise: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  soften: {
    hidden: { opacity: 0, filter: "blur(9px)", y: 10 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function Reveal({ children, className = "", delay = 0, once = true, variant = "rise" }) {
  const reduceMotion = useReducedMotion();
  const animation = revealVariants[variant] ?? revealVariants.rise;

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : animation.hidden}
      whileInView={animation.visible}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      exit={{ opacity: 0, transition: { duration: 0.18 } }}
    >
      {children}
    </motion.div>
  );
}

export function EditorialHero({ image, alt, eyebrow, title, description, number, className = "", entrance = "rise" }) {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["0%", "13%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.08, 1]);
  const initial = entrance === "left"
    ? { opacity: 0, x: -28 }
    : entrance === "right"
      ? { opacity: 0, x: 28 }
      : entrance === "soften"
        ? { opacity: 0, filter: "blur(8px)", y: 10 }
        : { opacity: 0, y: 22 };

  return (
    <section className={`page-hero ${className}`} ref={sectionRef}>
      <motion.div
        className="page-hero-image"
        role={alt ? "img" : undefined}
        aria-label={alt}
        style={{ backgroundImage: `url("${image}")`, y: imageY, scale: imageScale }}
      />
      <div className="page-hero-shade" />
      <div className="page-hero-copy">
        <motion.div
          initial={reduceMotion ? false : initial}
          animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
          transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 9 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.25 }}
          >
            {eyebrow}
          </motion.span>
          <h1>{title}</h1>
          <p>{description}</p>
        </motion.div>
      </div>
      <span className="page-hero-number">{number}</span>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, italic, copy, light = false }) {
  return (
    <div className={`section-heading ${light ? "heading-light" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title} {italic && <em>{italic}</em>}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

export function EyebrowLink({ to, children, light = false }) {
  return <Link to={to} className={`text-link ${light ? "text-link-light" : ""}`}>{children}<ArrowRight size={15} /></Link>;
}

export function ImageFrame({ src, alt, className = "", loading = "lazy" }) {
  const reduceMotion = useReducedMotion();
  const useFallback = (event) => {
    const image = event.currentTarget;
    if (image.dataset.fallbackApplied) return;
    image.dataset.fallbackApplied = "true";
    image.src = "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=82";
  };

  return (
    <motion.div
      className={`image-frame ${className}`}
      initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onError={useFallback}
        initial={reduceMotion ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        whileHover={reduceMotion ? undefined : { scale: 1.045 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}

export function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.footer
      className="site-footer"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/" className="footer-wordmark">BREW & BEAN<span>.</span></Link>
          <p>Underground coffee lab.<br />No ordinary cup.</p>
        </div>
        <div className="footer-links">
          <div><span className="footer-label">TAKE A LOOK AROUND</span><Link to="/menu">Coffee & things</Link><Link to="/craft">The making</Link><Link to="/story">Our story</Link><Link to="/gallery">Little moments</Link></div>
          <div><span className="footer-label">FIND THE DOOR</span><Link to="/contact">27 Mercer Street<br />New York, NY 10013</Link><a href="mailto:hello@brewandbean.com">hello@brewandbean.com</a><a href="tel:+12125550148">+1 212 555 0148</a></div>
        </div>
        <a className="footer-up" href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="Back to top"><ArrowDown size={17} /></a>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} BREW & BEAN, MADE WITH A LITTLE CARE.</span><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={13} /> KEEP IN TOUCH</a><span>NEW YORK, NY&nbsp; · &nbsp;EST. 2016</span></div>
    </motion.footer>
  );
}

export function WhatsAppButton() {
  const message = encodeURIComponent("Hi BREW & BEAN! I'd love to know more about your coffee.");
  return <a className="whatsapp-button" href={`https://wa.me/?text=${message}`} target="_blank" rel="noreferrer" aria-label="Enquire via WhatsApp">A QUESTION? <span>WE’RE HERE.</span></a>;
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button className={`back-to-top ${visible ? "is-visible" : ""}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top" tabIndex={visible ? 0 : -1}>
      <ArrowUp size={17} />
    </button>
  );
}
