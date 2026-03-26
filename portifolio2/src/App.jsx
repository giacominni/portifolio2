import React, { useState, useEffect, useRef } from 'react';
import './index.css';

// ─── DATA ───────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "ProtecGera",
    category: "Web / SEO",
    desc: "Solução completa para serviços de geradores. Arquitetura focada em conversão e velocidade.",
    tags: ["React", "SEO", "UI/UX"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    link: "https://protecgera.com.br",
    year: "2025",
  },
  {
    title: "Social Media Hub",
    category: "Landing Page",
    desc: "Centraliza links, diretrizes e materiais da rotina de social media em um único ponto.",
    tags: ["React", "Node"],
    image: "https://formulario-six-xi.vercel.app/Ilustrac%CC%A7a%CC%83o_Sem_Ti%CC%81tulo%201.png",
    link: "https://formulario-six-xi.vercel.app/",
    year: "2026",
  },
  {
    title: "App Financeiro",
    category: "Dashboard",
    desc: "Sistema de controle financeiro com gráficos interativos, alertas e relatórios exportáveis.",
    tags: ["Vue", "Firebase"],
    image: "https://i.imgur.com/o0guQM5.png",
    link: "https://sulmidiadash.vercel.app/",
    year: "2026",
  },
];

const SERVICES = [
  { num: "01", title: "Desenvolvimento Web", desc: "Sites institucionais, sistemas e aplicações robustas do zero — arquitetura limpa, código que escala.", icon: "⟨/⟩" },
  { num: "02", title: "UI/UX Design",        desc: "Interfaces que encantam, convertem e criam memória. Da pesquisa ao protótipo ao pixel final.",     icon: "◈" },
  { num: "03", title: "SEO & Performance",   desc: "Otimização técnica profunda: Core Web Vitals, estrutura semântica, velocidade que o Google nota.", icon: "↗" },
];

const SKILLS_SHOWCASE = [
  // 👇 Atualizamos o ID, a label e a tag para o seu novo vídeo
  { id: "videocard", label: "Figma Prototype",   tag: "UI/UX"  },
  { id: "blob",      label: "Blob Animation",   tag: "CSS"    },
  { id: "glass",     label: "Glassmorphism",    tag: "CSS"    },
  { id: "skeleton",  label: "Skeleton Loading", tag: "UX"     },
  { id: "chart",     label: "Data Viz",         tag: "JS"     },
  { id: "darklight", label: "Theme Toggle",     tag: "React"  },
];

const TECH = ["JavaScript", "React", "Node.js", "TypeScript", "SQL", "Git", "Tailwind", "CSS3"];

const TIMELINE = [
  { year: "Atual",     role: "Customer Success Pleno",     place: "Sul Mídia",       desc: "Retenção e sucesso de clientes estratégicos. Ponte entre produto e pessoas." },
  { year: "Em curso",  role: "Análise & Des. de Sistemas", place: "Faculdade",       desc: "Transição de carreira focada em engenharia de software e arquitetura de sistemas." },
  { year: "Mar 2023",  role: "Analista CS Jr",             place: "Sul Mídia",       desc: "Início da jornada — análise, onboarding e suporte técnico a clientes." },
  { year: "Concluído", role: "Bacharel em Criminologia",   place: "Ensino Superior", desc: "Formação analítica e investigativa. Base para pensar em sistemas e comportamento." },
];

// ─── HOOKS ──────────────────────────────────────────────────────────────────
function useTypewriter(words, speed = 75, pause = 2400) {
  const [display, setDisplay] = useState('');
  const s = useRef({ wi: 0, ci: 0, del: false, last: 0 });

  useEffect(() => {
    let raf;
    const tick = (now) => {
      const st = s.current;
      const w = words[st.wi];
      const delay = st.del ? speed / 2 : st.ci === w.length ? pause : speed;
      if (now - st.last >= delay) {
        st.last = now;
        if (!st.del && st.ci < w.length)       { setDisplay(w.slice(0, ++st.ci)); }
        else if (!st.del && st.ci === w.length) { st.del = true; }
        else if (st.del && st.ci > 0)           { setDisplay(w.slice(0, --st.ci)); }
        else { st.del = false; st.wi = (st.wi + 1) % words.length; }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [words, speed, pause]);

  return display;
}

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function useScramble(original) {
  const [text, setText] = useState(original);
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#';
  const scramble = () => {
    let i = 0;
    const iv = setInterval(() => {
      setText(original.split('').map((c, idx) =>
        idx < i ? original[idx] : (c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)])
      ).join(''));
      if (i >= original.length) { clearInterval(iv); setText(original); }
      i += 0.4;
    }, 28);
  };
  return [text, scramble];
}

// ─── SHOWCASE WIDGETS ────────────────────────────────────────────────────────

// 👇 Este é o novo componente que renderiza o seu vídeo
function VideoWidget() {
  const videoRef = useRef(null);

  const onMove = () => {
    if (videoRef.current) {
      videoRef.current.style.transform = 'scale(1.08)';
    }
  };
  
  const onLeave = () => {
    if (videoRef.current) {
      videoRef.current.style.transform = 'scale(1)';
    }
  };

  return (
    <div 
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', overflow: 'hidden' }}
      onMouseEnter={onMove} 
      onMouseLeave={onLeave}
    >
      <video
        ref={videoRef}
        src="/0326.mp4" /* O caminho aponta para a pasta public */
        autoPlay
        loop
        muted
        playsInline
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' 
        }}
      />
    </div>
  );
}

function BlobWidget() {
  return (
    <div className="w-blob-wrap">
      <div className="w-blob" />
      <span className="w-blob-hint">animate()</span>
    </div>
  );
}

function GlassWidget() {
  return (
    <div className="w-glass-scene">
      <div className="w-glass-orb w-go1" />
      <div className="w-glass-orb w-go2" />
      <div className="w-glass-card">
        <p className="w-gc-title">Glass UI</p>
        <p className="w-gc-sub">backdrop-filter</p>
      </div>
    </div>
  );
}

function SkeletonWidget() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => setLoaded(p => !p), 2200);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="w-sk-wrap">
      <div className="w-sk-card">
        {loaded ? (
          <>
            <div className="w-sk-av w-sk-av--real" />
            <div>
              <div className="w-sk-name">Rafael Carneiro</div>
              <div className="w-sk-role">Frontend Dev</div>
            </div>
          </>
        ) : (
          <>
            <div className="w-sk-av w-shimmer" />
            <div style={{ flex: 1 }}>
              <div className="w-shimmer" style={{ height: 11, width: '70%', borderRadius: 3, marginBottom: 7 }} />
              <div className="w-shimmer" style={{ height: 9, width: '50%', borderRadius: 3 }} />
            </div>
          </>
        )}
      </div>
      <span className="w-sk-status">{loaded ? 'loaded ✓' : 'loading...'}</span>
    </div>
  );
}

function ChartWidget() {
  const data = [38, 72, 51, 93, 67, 84, 44];
  const days = ['S','T','Q','Q','S','S','D'];
  return (
    <div className="w-chart-wrap">
      <p className="w-chart-title">Weekly Commits</p>
      <div className="w-chart-bars">
        {data.map((h, i) => (
          <div key={i} className="w-chart-col">
            <div className="w-chart-bar" style={{ '--h': `${h}%`, animationDelay: `${i * 0.08}s` }} />
            <span className="w-chart-lbl">{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DarkLightWidget() {
  const [dark, setDark] = useState(false);
  return (
    <div className={`w-dl ${dark ? 'w-dl--dark' : 'w-dl--light'}`}>
      <div className="w-dl-bar">
        <div className="w-dl-dots"><span /><span /><span /></div>
        <button className="w-dl-btn" onClick={() => setDark(p => !p)}>{dark ? '☀' : '☾'}</button>
      </div>
      <div className="w-dl-lines">
        {[100, 72, 88, 58].map((w, i) => <div key={i} className="w-dl-line" style={{ width: `${w}%` }} />)}
      </div>
    </div>
  );
}

const WIDGETS = {
  // 👇 Mapeamos o novo ID 'videocard' para o novo componente
  videocard: VideoWidget, blob: BlobWidget, glass: GlassWidget,
  skeleton: SkeletonWidget, chart: ChartWidget, darklight: DarkLightWidget
};

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mOpen, setMOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const links = [['Sobre','#sobre'],['Skills','#skills'],['Projetos','#projetos'],['Contato','#contato']];
  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo">RC<span className="nav-logo-dot">.</span></a>
        <ul className={`nav-links ${mOpen ? 'nav-links--open' : ''}`}>
          {links.map(([l, h]) => (
            <li key={h}><a href={h} className="nav-link" onClick={() => setMOpen(false)}>{l}</a></li>
          ))}
        </ul>
        <button
          className={`nav-burger ${mOpen ? 'nav-burger--open' : ''}`}
          onClick={() => setMOpen(p => !p)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const typed = useTypewriter(['Frontend Developer','UI/UX Designer','CS Pleno','Problem Solver']);

  return (
    <section className="hero" id="inicio">
      <span className="hero-kanji" aria-hidden="true">創造</span>
      <div className="container">
        <div className="hero-meta">
          <span className="hero-avail"><span className="pulse-dot" />Disponível para projetos</span>
          <span className="hero-ver">v2.0 — 2026</span>
        </div>
        <h1 className="hero-h1">
          <span className="hero-first">Rafael</span>
          <br />
          <span className="hero-last">Carneiro<span className="hero-fullstop">.</span></span>
        </h1>
        <div className="hero-typed-row">
          <span className="hero-typed">{typed}</span>
          <span className="hero-cursor" aria-hidden="true">_</span>
        </div>
        <div className="hero-bottom">
          <p className="hero-tagline">
            Criminologia → Código.<br />
            Analiso padrões, construo<br />
            experiências que <em>funcionam</em>.
          </p>
          <div className="hero-ctas">
            <a href="#projetos" className="btn-primary">Ver Projetos</a>
            <a href="#contato" className="btn-outline">Contato →</a>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <div className="scroll-bar" />
          <span>scroll</span>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function About() {
  const [ref, vis] = useReveal();
  const [nameT, nameScramble] = useScramble('RAFAEL CARNEIRO');

  return (
    <section className="section" id="sobre" ref={ref}>
      <div className={`container reveal ${vis ? 'revealed' : ''}`}>
        <p className="eyebrow">// 001 — SOBRE</p>
        <div className="about-grid">
          <div className="about-left">
            <h2 className="section-h">
              Uma mente<br /><em>analítica</em><br />no frontend.
            </h2>
            <div className="about-stats">
              {[['2+','anos de CS'],['3+','projetos'],['∞','café']].map(([n, l]) => (
                <div key={l} className="about-stat">
                  <span className="stat-n">{n}</span>
                  <span className="stat-l">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-right">
            <p className="about-p">
              Me chamo{' '}
              <strong
                className="scramble-name"
                onMouseEnter={nameScramble}
                style={{ cursor: 'default' }}
              >
                {nameT}
              </strong>
              . Minha trajetória começa na <strong>Criminologia</strong> — onde aprendi
              a dissecar padrões, comportamentos e sistemas. Hoje aplico essa
              lógica investigativa no desenvolvimento de software.
            </p>
            <p className="about-p">
              Sou <strong>Customer Success Pleno na Sul Mídia</strong> e estudo
              Análise e Desenvolvimento de Sistemas. Construo interfaces que não
              são apenas bonitas — são estratégicas e mensuráveis.
            </p>
            <div className="tech-grid">
              {TECH.map(t => <span key={t} className="tech-chip">{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SHOWCASE ────────────────────────────────────────────────────────────────
function Showcase() {
  const [ref, vis] = useReveal();
  const [hover, setHover] = useState(null);

  return (
    <section className="showcase-section" id="skills" ref={ref}>
      <div className={`container reveal ${vis ? 'revealed' : ''}`}>
        <p className="eyebrow eyebrow--invert">// 002 — HABILIDADES</p>
        <h2 className="section-h section-h--invert">
          Frontend<br />em{' '}<em>ação</em>.
          <span className="sc-kanji" aria-hidden="true">技術</span>
        </h2>
        <p className="sc-hint">Interaja com cada demonstração abaixo.</p>
      </div>
      <div className="showcase-grid">
        {SKILLS_SHOWCASE.map(({ id, label, tag }) => {
          const W = WIDGETS[id];
          return (
            <div
              key={id}
              className={`sc-cell ${hover === id ? 'sc-cell--hot' : ''}`}
              onMouseEnter={() => setHover(id)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="sc-demo"><W /></div>
              <div className="sc-foot">
                <span className="sc-label">{label}</span>
                <span className="sc-tag">{tag}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
function Services() {
  const [ref, vis] = useReveal();
  return (
    <section className="section" id="servicos" ref={ref}>
      <div className={`container reveal ${vis ? 'revealed' : ''}`}>
        <p className="eyebrow">// 003 — SERVIÇOS</p>
        <h2 className="section-h">O que<br />eu <em>faço</em>.</h2>
        <div className="svc-list">
          {SERVICES.map(({ num, title, desc, icon }) => (
            <div className="svc-row" key={num}>
              <span className="svc-icon">{icon}</span>
              <div className="svc-body">
                <span className="svc-num">{num} //</span>
                <h3 className="svc-title">{title}</h3>
                <p className="svc-desc">{desc}</p>
              </div>
              <span className="svc-arr">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────
function Projects() {
  const [ref, vis] = useReveal();
  return (
    <section className="section section--ink" id="projetos" ref={ref}>
      <div className={`container reveal ${vis ? 'revealed' : ''}`}>
        <p className="eyebrow eyebrow--invert">// 004 — PROJETOS</p>
        <h2 className="section-h section-h--invert">Trabalho<br /><em>selecionado</em>.</h2>
        <div className="proj-list">
          {PROJECTS.map((p, i) => (
            <a href={p.link} key={i} className="proj-item" target="_blank" rel="noreferrer">
              <div className="proj-left">
                <span className="proj-num">0{i + 1}</span>
                <div>
                  <h3 className="proj-title">{p.title}</h3>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-tags">
                    {p.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
                  </div>
                </div>
              </div>
              <div className="proj-right">
                <div className="proj-img" style={{ backgroundImage: `url(${p.image})` }} />
                <div className="proj-meta">
                  <span className="proj-cat">{p.category}</span>
                  <span className="proj-year">{p.year}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TIMELINE ────────────────────────────────────────────────────────────────
function Timeline() {
  const [ref, vis] = useReveal();
  return (
    <section className="section" id="trajetoria" ref={ref}>
      <div className={`container reveal ${vis ? 'revealed' : ''}`}>
        <p className="eyebrow">// 005 — TRAJETÓRIA</p>
        <h2 className="section-h">De onde<br />eu <em>vim</em>.</h2>
        <div className="tl-track">
          {TIMELINE.map(({ year, role, place, desc }, i) => (
            <div key={i} className="tl-item">
              <div className="tl-year">{year}</div>
              <div className="tl-dot" />
              <div className="tl-content">
                <h4 className="tl-role">{role}</h4>
                <span className="tl-place">{place}</span>
                <p className="tl-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, vis] = useReveal();
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };
  return (
    <section className="section" id="contato" ref={ref}>
      <div className={`container reveal ${vis ? 'revealed' : ''}`}>
        <p className="eyebrow">// 006 — CONTATO</p>
        <h2 className="contact-h">Vamos<br /><em>conversar</em>?</h2>
        <p className="contact-sub">Aberto a projetos freelance, oportunidades e boas conversas.</p>
        <div className="contact-grid">
          <form className="contact-form" onSubmit={submit}>
            {[
              { lbl: 'Nome',     type: 'text',     ph: 'Seu nome' },
              { lbl: 'Email',    type: 'email',    ph: 'seu@email.com' },
            ].map(({ lbl, type, ph }) => (
              <div key={lbl} className="form-row">
                <label className="form-lbl">{lbl}</label>
                <input className="form-field" type={type} placeholder={ph} required />
              </div>
            ))}
            <div className="form-row">
              <label className="form-lbl">Mensagem</label>
              <textarea className="form-field form-ta" placeholder="Me conta sobre seu projeto..." required />
            </div>
            <button className={`btn-primary btn-block ${sent ? 'btn-sent' : ''}`} type="submit">
              {sent ? 'Mensagem enviada ✓' : 'Enviar →'}
            </button>
          </form>
          <div className="contact-links">
            {[
              { icon: '✉',  label: 'Email',    val: 'rflgccontato@gmail.com', href: 'mailto:rflgccontato@gmail.com' },
              { icon: 'in', label: 'LinkedIn', val: 'rafael-carneiro',        href: 'https://www.linkedin.com/in/rafaelcarneiro-ti/' },
              { icon: '<>', label: 'GitHub',   val: 'rafaelcarneiro',         href: 'https://github.com/giacominni' },
            ].map(({ icon, label, val, href }) => (
              <a key={label} href={href} className="cl-item">
                <span className="cl-icon">{icon}</span>
                <div>
                  <p className="cl-lbl">{label}</p>
                  <p className="cl-val">{val}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Showcase />
        <Services />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-name">Rafael Carneiro © 2026</span>
          <span className="footer-code">// built with React + Vite</span>
        </div>
      </footer>
    </>
  );
}