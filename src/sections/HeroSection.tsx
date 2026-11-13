/**
 * HeroSection — Premium scroll-locked 4-image cinematic hero.
 *
 * Mechanics:
 *  - The hero takes exactly one full viewport height (100vh).
 *  - While the hero is in view and the gallery hasn't been fully shown,
 *    wheel / touch-swipe events are intercepted and preventDefault() is called.
 *  - Each intentional scroll step advances (or retreats) exactly one image.
 *  - A 700 ms throttle prevents skipping on fast wheels / trackpads.
 *  - After Image 4 is confirmed displayed (index === 3), the next downward
 *    event un-locks the interception and allows the browser to scroll normally.
 *  - Scrolling back up to index 0 restores the lock the next time the hero
 *    enters the viewport from above.
 *  - All 4 images are preloaded immediately on mount.
 *  - CSS transitions handle crossfade + zoom — no heavy animation libs needed
 *    for the per-frame transitions (framer-motion is kept only for initial
 *    entrance animations of text).
 *  - Touch: each swipe counted as one step; threshold 40 px.
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import GoldParticles from '../components/GoldParticles'

import pose0 from '../assets/Purana Manjari 2019.jpg.jpeg'
import pose1 from '../assets/jayashree_srinivasann_23e7b091b4e049d0b37f948f4d093fb3.jpg'
import pose2 from '../assets/jayashree_srinivasann_a9c16ced0f214959a61de7baa8fb5239.jpg'
import pose3 from '../assets/jayashree_srinivasann_5b8ced4090de456ba84f5a563bbd235b.jpg'

const HERO_FRAMES = [
  {
    src: pose0,
    alt: 'Classical Bharatanatyam recital — Arambha invocation',
    phase: 'I · ARAMBHA',
    objectPosition: 'center 18%',
  },
  {
    src: pose1,
    alt: 'Bharatanatyam sacred hasta mudra',
    phase: 'II · HASTA',
    objectPosition: 'center 20%',
  },
  {
    src: pose2,
    alt: 'Aramandi — sculptural geometry and balance',
    phase: 'III · STHITI',
    objectPosition: 'center 20%',
  },
  {
    src: pose3,
    alt: 'Grand thematic stage performance — Poornam',
    phase: 'IV · POORNAM',
    objectPosition: 'center 20%',
  },
]

const TOTAL = HERO_FRAMES.length          // 4
const THROTTLE_MS = 650                   // ms between allowed steps
const TOUCH_THRESHOLD = 35               // px swipe to count as one step

interface HeroSectionProps {
  onNavigate?: (path: string) => void
}

export default function HeroSection({ onNavigate }: HeroSectionProps = {}) {
  const sectionRef  = useRef<HTMLElement>(null)
  const [frameIdx, setFrameIdx]       = useState(0)
  const [mousePos, setMousePos]       = useState({ x: 0, y: 0 })
  const [imagesReady, setImagesReady] = useState(false)

  // Mutable refs — no re-renders needed inside event handlers
  const frameIdxRef   = useRef(0)          // mirrors frameIdx without stale closure
  const lockedRef     = useRef(true)       // true = we're intercepting scroll
  const throttledRef  = useRef(false)      // true = within throttle window
  const touchStartY   = useRef<number | null>(null)
  const touchMoving   = useRef(false)

  // ─── Keep ref in sync with state ─────────────────────────────────────────
  useEffect(() => { frameIdxRef.current = frameIdx }, [frameIdx])

  // ─── Preload all 4 images before enabling scroll interaction ─────────────
  useEffect(() => {
    let loaded = 0
    HERO_FRAMES.forEach(f => {
      const img = new Image()
      img.onload = img.onerror = () => {
        loaded++
        if (loaded === TOTAL) setImagesReady(true)
      }
      img.src = f.src
    })
    // Fallback: enable after 2 s even if one image is slow
    const timeout = setTimeout(() => setImagesReady(true), 2000)
    return () => clearTimeout(timeout)
  }, [])

  // ─── Step logic (shared by wheel + touch) ────────────────────────────────
  const step = useCallback((direction: 1 | -1) => {
    if (throttledRef.current) return          // ignore during throttle window
    throttledRef.current = true
    setTimeout(() => { throttledRef.current = false }, THROTTLE_MS)

    const current = frameIdxRef.current
    const next = current + direction

    if (next >= 0 && next < TOTAL) {
      frameIdxRef.current = next
      setFrameIdx(next)
      return
    }

    // next < 0 → user scrolled up past first image → allow normal page scroll up
    // next >= TOTAL → user scrolled past last image → unlock and let page scroll
    lockedRef.current = false
    // Re-lock when hero comes back into view from top (handled in IntersectionObserver)
  }, [])

  // ─── Wheel handler ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!imagesReady) return

    const onWheel = (e: WheelEvent) => {
      const section = sectionRef.current
      if (!section) return

      // Only intercept while the hero's top edge is near the viewport top.
      // rect.top is 0 when hero is flush with viewport top.
      // We allow a ±120 px tolerance to handle navbar offsets / sub-pixel positions.
      const rect = section.getBoundingClientRect()
      const inView = rect.top > -120 && rect.top < 120

      if (!inView) return          // hero is not at viewport top — let browser scroll

      if (!lockedRef.current) {
        // Lock is released; if the user is fully back at the page top and scrolls
        // UP, re-arm the sequence from image 1.
        if (window.scrollY === 0 && e.deltaY < 0) {
          lockedRef.current = true
          frameIdxRef.current = 0
          setFrameIdx(0)
        }
        return
      }

      e.preventDefault()
      e.stopPropagation()

      const direction: 1 | -1 = e.deltaY > 0 ? 1 : -1
      step(direction)
    }

    // { passive: false } is required so we can call preventDefault()
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [imagesReady, step])

  // ─── Touch handlers (mobile / tablet) ────────────────────────────────────
  useEffect(() => {
    if (!imagesReady) return

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchMoving.current = false
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!lockedRef.current) return

      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      // Same ±120 px tolerance as wheel handler
      const inView = rect.top > -120 && rect.top < 120
      if (!inView) return

      if (touchStartY.current === null) return

      const deltaY = touchStartY.current - e.touches[0].clientY

      if (Math.abs(deltaY) < TOUCH_THRESHOLD) {
        // Swipe too small — still prevent scroll so the page doesn't drift
        e.preventDefault()
        return
      }

      e.preventDefault()   // Prevent native scroll while we're controlling the sequence

      if (!touchMoving.current) {
        touchMoving.current = true
        const direction: 1 | -1 = deltaY > 0 ? 1 : -1
        touchStartY.current = e.touches[0].clientY     // reset for next step
        step(direction)
      }
    }

    const onTouchEnd = () => {
      touchStartY.current = null
      touchMoving.current = false
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    // passive: false required so we can call e.preventDefault() and block native scroll
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [imagesReady, step])

  // ─── Re-lock when hero scrolls back into view after unlock ───────────────
  useEffect(() => {
    if (!imagesReady) return

    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // User scrolled back up and hero is fully visible → re-arm the sequence
        // from last image so upward scrolling can reverse through the sequence.
        if (entry.isIntersecting && entry.intersectionRatio >= 0.95) {
          if (!lockedRef.current) {
            lockedRef.current = true
            // If user is back at page top, reset to first image.
            // Otherwise start from last image so they can scroll up through sequence.
            const atTop = window.scrollY < 10
            const startFrame = atTop ? 0 : TOTAL - 1
            frameIdxRef.current = startFrame
            setFrameIdx(startFrame)
          }
        }
      },
      { threshold: 0.95 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [imagesReady])

  // ─── Desktop mouse parallax ───────────────────────────────────────────────
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 16
      const y = (e.clientY / window.innerHeight - 0.5) * 12
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      {/*
        The section is exactly 100vh — no tall runway.
        Scroll-lock is handled via wheel/touch event interception, NOT by
        making the page tall and relying on scroll position.
      */}
      <section
        id="hero"
        ref={sectionRef}
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#160811',
        }}
        aria-label="Chathur Lakshana Academy — Cinematic Hero Showcase"
      >
        {/* ── Layer 1: Ambient gold glow background ── */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'radial-gradient(ellipse at 50% 38%, rgba(212,175,101,0.16) 0%, rgba(38,13,32,0.80) 55%, #160811 88%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Layer 2: Four crossfading images (CSS transitions only) ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, overflow: 'hidden' }}>
          {HERO_FRAMES.map((frame, i) => {
            const isActive = i === frameIdx
            return (
              <div
                key={frame.phase}
                style={{
                  position: 'absolute',
                  inset: '-10px',
                  /* GPU-accelerated crossfade + subtle zoom */
                  opacity:    isActive ? 1 : 0,
                  transform:  isActive
                    ? `scale(1.04) translate(${mousePos.x * 0.3}px, 0px)`
                    : `scale(1.00) translate(${mousePos.x * 0.3}px, 0px)`,
                  transition: 'opacity 0.85s cubic-bezier(0.4,0,0.2,1), transform 0.85s cubic-bezier(0.4,0,0.2,1)',
                  willChange: 'opacity, transform',
                  pointerEvents: 'none',
                }}
                aria-hidden={!isActive}
              >
                <img
                  src={frame.src}
                  alt={frame.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: frame.objectPosition,
                    filter: 'contrast(1.08) saturate(0.96)',
                    display: 'block',
                  }}
                />
              </div>
            )
          })}

          {/* Cinematic vignette — always on top of images */}
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
              background: 'linear-gradient(to bottom, rgba(22,8,17,0.6) 0%, rgba(22,8,17,0.42) 35%, rgba(22,8,17,0.82) 75%, #160811 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 11, pointerEvents: 'none',
              background: 'radial-gradient(circle at 50% 45%, transparent 30%, rgba(22,8,17,0.72) 85%)',
            }}
          />
        </div>

        {/* ── Layer 3: Sacred Geometry Mandala (decorative) ── */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 5,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none', opacity: 0.22,
          }}
          aria-hidden="true"
        >
          <svg
            width="720" height="720" viewBox="0 0 600 600"
            fill="none" stroke="#D4AF65" strokeWidth="0.75"
            style={{
              maxWidth: '90vw', maxHeight: '90vh',
              transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px) scale(1.04)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            <circle cx="300" cy="300" r="280" strokeDasharray="4 6" opacity="0.6" />
            <circle cx="300" cy="300" r="230" opacity="0.8" />
            <circle cx="300" cy="300" r="170" strokeDasharray="3 5" opacity="0.5" />
            <polygon points="300,70 530,300 300,530 70,300" opacity="0.4" />
            <polygon points="300,110 490,300 300,490 110,300" opacity="0.3" />
            <line x1="300" y1="20" x2="300" y2="580" opacity="0.3" />
            <line x1="20" y1="300" x2="580" y2="300" opacity="0.3" />
          </svg>
        </div>

        {/* ── Layer 4: Gold Particles ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none' }}>
          <GoldParticles density={32} />
        </div>

        {/* ── Layer 5: Hero Text Content ── */}
        <div
          style={{
            position: 'relative', zIndex: 12,
            textAlign: 'center',
            padding: 'clamp(90px, 12vh, 120px) clamp(16px, 4vw, 32px) clamp(60px, 8vh, 80px)',
            maxWidth: '1100px', width: '100%', boxSizing: 'border-box',
            transform: `translate3d(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px, 0)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {/* Sacred Star */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-display)', fontSize: '26px',
              color: 'var(--accent-gold)', marginBottom: '14px',
              display: 'inline-block',
              textShadow: '0 0 16px rgba(212,175,101,0.6)',
            }}
          >
            ✧
          </motion.div>

          {/* Academy Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(10px, 1.3vw, 13px)',
              fontWeight: 600,
              letterSpacing: 'clamp(0.18em, 0.4vw, 0.3em)',
              color: 'var(--accent-gold-light)',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            TRADITIONAL ARTS ACADEMY · MYLAPORE, CHENNAI
          </motion.div>

          {/* Single-line Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="hero-single-line-heading"
            style={{
              margin: '0 auto',
              color: '#FFF4E5',
              textShadow: '0 4px 28px rgba(0,0,0,0.8), 0 0 35px rgba(212,175,101,0.25)',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.45rem, 5.4vw, 4.8rem)',
              fontWeight: 400, lineHeight: 1.15,
              whiteSpace: 'nowrap',
              letterSpacing: 'clamp(0.01em, 0.4vw, 0.04em)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 'clamp(6px, 1.4vw, 18px)',
              width: '100%', maxWidth: '100%',
            }}
          >
            <span>Art</span>
            <span style={{ color: 'var(--accent-gold)', opacity: 0.9, fontSize: '0.7em' }}>·</span>
            <span>Discipline</span>
            <span style={{ color: 'var(--accent-gold)', opacity: 0.9, fontSize: '0.7em' }}>·</span>
            <span>Life</span>
          </motion.h1>

          {/* Gold Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.55 }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '12px', margin: '24px auto', width: '180px',
            }}
          >
            <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(to right, transparent, var(--accent-gold))' }} />
            <span style={{ color: 'var(--accent-gold)', fontSize: '13px', lineHeight: 1 }}>✦</span>
            <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(to left, transparent, var(--accent-gold))' }} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.7 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2.1vw, 1.65rem)',
              fontStyle: 'italic', color: 'var(--text-secondary)',
              lineHeight: 1.55, maxWidth: '640px', margin: '0 auto',
              textShadow: '0 2px 14px rgba(0,0,0,0.85)',
            }}
          >
            Rooted in culture. Guided by gurus.<br />
            Inspiring excellence in every learner.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.9 }}
            className="hero-cta-group"
            style={{
              display: 'flex', gap: '16px', justifyContent: 'center',
              marginTop: '36px', flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              className="btn-primary"
              style={{ padding: '15px 36px', cursor: 'pointer', fontSize: '12.5px' }}
              onClick={() => {
                const el = document.querySelector('#courses-preview') || document.querySelector('#courses')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
                else if (onNavigate) onNavigate('/courses')
              }}
            >
              EXPLORE COURSES
            </button>

            <button
              type="button"
              className="btn-gallery"
              style={{ padding: '15px 36px', cursor: 'pointer', fontSize: '12.5px' }}
              onClick={() => {
                if (onNavigate) onNavigate('/gallery')
                else { window.history.pushState({}, '', '/gallery'); window.dispatchEvent(new PopStateEvent('popstate')) }
              }}
            >
              VIEW GALLERY
            </button>

            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '15px 36px', cursor: 'pointer', fontSize: '12.5px' }}
              onClick={() => {
                if (onNavigate) onNavigate('/academy')
                else { window.history.pushState({}, '', '/academy'); window.dispatchEvent(new PopStateEvent('popstate')) }
              }}
            >
              OUR ACADEMY
            </button>
          </motion.div>
        </div>

        {/* ── Sequence indicator (bottom bar) ── */}
        <div
          style={{
            position: 'absolute', bottom: '24px', left: '50%',
            transform: 'translateX(-50%)', zIndex: 15,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(22,8,17,0.72)',
              border: '1px solid rgba(212,175,101,0.35)',
              padding: '6px 14px', borderRadius: '20px',
              backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            {HERO_FRAMES.map((f, i) => {
              const isActive = i === frameIdx
              return (
                <div key={f.phase} style={{ display: 'flex', alignItems: 'center', gap: '5px', transition: 'all 0.3s ease' }}>
                  <span
                    style={{
                      width: isActive ? '18px' : '6px', height: '6px',
                      borderRadius: '3px',
                      backgroundColor: isActive ? 'var(--accent-gold)' : 'rgba(212,175,101,0.3)',
                      boxShadow: isActive ? '0 0 10px rgba(212,175,101,0.8)' : 'none',
                      transition: 'all 0.35s ease',
                    }}
                  />
                  {isActive && (
                    <span style={{
                      fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 600,
                      letterSpacing: '0.18em', color: 'var(--accent-gold)',
                      textTransform: 'uppercase', whiteSpace: 'nowrap',
                    }}>
                      {f.phase}
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '9.5px',
            letterSpacing: '0.22em', color: 'var(--accent-gold-light)',
            textTransform: 'uppercase', opacity: 0.75,
          }}>
            {frameIdx < TOTAL - 1 ? 'SCROLL TO EXPERIENCE' : 'SCROLL TO CONTINUE'}
          </span>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .hero-single-line-heading {
            font-size: clamp(1.2rem, 5.2vw, 2.4rem) !important;
            gap: 6px !important;
          }
        }
      `}</style>
    </>
  )
}
