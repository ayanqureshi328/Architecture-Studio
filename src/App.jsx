import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'

const projects = [
  {
    number: '01', title: 'The Long House', type: 'Residential · Mill Valley, CA', year: '2025',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
    alt: 'Quiet modern home opening to a garden through wide glass doors', shape: 'tall',
  },
  {
    number: '02', title: 'Casa Oliva', type: 'Hospitality · Mallorca, ES', year: '2024',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
    alt: 'Warm, tactile living space with natural materials and soft light', shape: 'short',
  },
  {
    number: '03', title: 'Stillwater House', type: 'Residential · Hudson Valley, NY', year: '2024',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
    alt: 'Sculptural timber and stone interior looking out to the landscape', shape: 'medium',
  },
  {
    number: '04', title: 'Atelier No. 8', type: 'Workplace · Brooklyn, NY', year: '2023',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85',
    alt: 'Sunlit contemporary interior with a restrained palette and crafted details', shape: 'tall',
  },
  {
    number: '05', title: 'Casa del Vento', type: 'Residential · Puglia, IT', year: '2023',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85&sat=-15',
    alt: 'Mediterranean-inspired interior with natural stone and warm wood', shape: 'short',
  },
]

const team = [
  { name: 'Mara Ellis', role: 'Founding Partner', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=85' },
  { name: 'Jonah Park', role: 'Design Director', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85' },
  { name: 'Camila Reyes', role: 'Project Architect', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85' },
]

function App() {
  const trackRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formState, setFormState] = useState('idle')
  const [formMessage, setFormMessage] = useState('')

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.8 })
    let frameId
    const raf = (time) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }
    frameId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  const moveProjects = (direction) => {
    trackRef.current?.scrollBy({ left: direction * trackRef.current.clientWidth * 0.72, behavior: 'smooth' })
  }

  const closeMenu = () => setMenuOpen(false)

  async function submitInquiry(event) {
    event.preventDefault()
    const form = event.currentTarget
    setFormState('sending')
    setFormMessage('')
    const data = Object.fromEntries(new FormData(form))
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Something went wrong. Please try again.')
      setFormState('sent')
      setFormMessage(result.message)
      form.reset()
    } catch (error) {
      setFormState('error')
      setFormMessage(error.message)
    }
  }

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="FORMA Studio home">
          <span className="wordmark-main">FORMA</span><span className="wordmark-sub">ARCHITECTURE<br />& PLACE</span>
        </a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}<span>{menuOpen ? 'Close' : 'Menu'}</span>
        </button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#studio" onClick={closeMenu}>Studio</a>
          <a href="#team" onClick={closeMenu}>People</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Start a project <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top" aria-label="FORMA Architecture Studio">
          <img className="hero-image" src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90" alt="A quiet, sunlit modern home framed by the landscape" />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> Independent architecture studio · Est. 2012</p>
            <h1>Spaces that<br /><em>stay with you.</em></h1>
            <div className="hero-foot">
              <p>Architecture shaped by place,<br />made for the way we live.</p>
              <a href="#work" className="hero-scroll">Discover our work <ArrowDown size={15} /></a>
            </div>
          </div>
          <span className="hero-index">37°54' N &nbsp; 122°32' W</span>
        </section>

        <section className="work-section section-pad" id="work">
          <div className="section-heading work-heading">
            <div><p className="eyebrow"><span className="eyebrow-number">01</span> Selected work</p><h2>Made of <em>meaning.</em></h2></div>
            <p className="section-intro">A considered collection of homes, places<br className="desktop-only" /> to gather, and spaces to work.</p>
          </div>
          <div className="project-controls">
            <span>2023 — 2025 <i /> {projects.length} projects</span>
            <div className="arrow-pair">
              <button type="button" onClick={() => moveProjects(-1)} aria-label="Previous projects"><ArrowLeft size={17} /></button>
              <button type="button" onClick={() => moveProjects(1)} aria-label="Next projects"><ArrowRight size={17} /></button>
            </div>
          </div>
          <div className="project-track" ref={trackRef} aria-label="Selected projects">
            {projects.map((project) => (
              <article className={`project-card ${project.shape}`} key={project.number}>
                <a className="project-image-wrap" href="#contact" aria-label={`Ask us about ${project.title}`}>
                  <img src={project.image} alt={project.alt} loading="lazy" />
                  <span className="project-link"><ArrowUpRight size={18} /></span>
                </a>
                <div className="project-caption">
                  <div><span className="project-number">{project.number} / {project.year}</span><h3>{project.title}</h3></div>
                  <p>{project.type}</p>
                </div>
              </article>
            ))}
            <a className="project-end" href="#contact"><span>Have a place<br />in mind?</span><ArrowDownRight size={26} /><small>Tell us about it</small></a>
          </div>
          <div className="drag-note"><span /> Drag or scroll to explore</div>
        </section>

        <section className="manifesto" id="studio">
          <div className="manifesto-top"><p className="eyebrow"><span className="eyebrow-number">02</span> The studio</p><p className="manifesto-location">San Francisco · Working everywhere</p></div>
          <p className="manifesto-copy">We believe good architecture makes room for <em>life</em> to happen. Quietly confident spaces, built around what matters — <span>light, material, and the people who call them home.</span></p>
          <div className="manifesto-bottom"><span>Thoughtful by nature.<br />Lasting by design.</span><a href="#contact">A little more about us <ArrowUpRight size={15} /></a></div>
          <img className="manifesto-image" src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1300&q=85" alt="Subtle afternoon light moving across a considered living space" loading="lazy" />
        </section>

        <section className="team-section section-pad" id="team">
          <div className="section-heading team-heading">
            <div><p className="eyebrow"><span className="eyebrow-number">03</span> The people</p><h2>Small team.<br /><em>Open minds.</em></h2></div>
            <p className="section-intro">Close collaboration, different perspectives,<br className="desktop-only" /> and a shared belief in doing things well.</p>
          </div>
          <div className="team-grid">
            {team.map((person, index) => (
              <article className="team-card" key={person.name}>
                <div className="team-image"><img src={person.image} alt={person.name} loading="lazy" /><span>0{index + 1}</span></div>
                <div className="team-caption"><h3>{person.name}</h3><p>{person.role}</p><ArrowUpRight size={15} /></div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-left">
            <p className="eyebrow"><span className="eyebrow-number">04</span> Start a conversation</p>
            <h2>Every good thing<br />starts <em>somewhere.</em></h2>
            <p className="contact-intro">Tell us what you’re imagining. We’ll take it from there.</p>
            <a className="contact-email" href="mailto:studio@forma.archi">studio@forma.archi <ArrowUpRight size={15} /></a>
            <p className="contact-address">San Francisco, California<br />Available for select projects worldwide</p>
          </div>
          <form className="contact-form" onSubmit={submitInquiry}>
            <label>Your name<input name="name" type="text" placeholder="Name" autoComplete="name" required maxLength="120" /></label>
            <label>Email address<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required maxLength="254" /></label>
            <label>What are you thinking?<select name="projectType" defaultValue=""><option value="" disabled>Select a project type</option><option>Private residence</option><option>Hospitality</option><option>Workplace</option><option>Something else</option></select></label>
            <label>A little about your project<textarea name="message" placeholder="Place, hopes, timing — whatever feels useful." rows="3" required maxLength="4000" /></label>
            <div className="form-submit-row"><button className="submit-button" type="submit" disabled={formState === 'sending'}>{formState === 'sending' ? 'Sending…' : 'Send your note'} <ArrowUpRight size={17} /></button><span>We usually reply within two working days.</span></div>
            {formMessage && <p className={`form-message ${formState}`} role="status">{formMessage}</p>}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-mark" href="#top">FORMA<span>®</span></a>
        <p>Architecture & Place<br />© 2025 FORMA Studio</p>
        <div className="footer-links"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><a href="mailto:studio@forma.archi">Email <ArrowUpRight size={13} /></a></div>
        <a className="back-top" href="#top">Back to top <ArrowDown size={13} /></a>
      </footer>
    </>
  )
}

export default App
