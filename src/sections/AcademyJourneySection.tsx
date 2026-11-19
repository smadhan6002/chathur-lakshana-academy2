import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Landmark, Flame, Award, Sparkles, Theater, Calendar, Compass } from 'lucide-react'
import studioEnsembleImg from '../img/imp 1.jpeg'

// Chronological Academy Milestones of Chathur Lakshana Academy of Fine Arts
// Uses only verified project information and client-specified milestones — no invented dates or fabricated details.
const academyMilestones = [
  {
    step: '01',
    eraTag: 'Founding Chapter',
    title: 'Establishment & Early Development of Chathur Lakshana',
    icon: Landmark,
    category: 'FOUNDATION',
    desc: 'Founded by Smt. Dr. Radhika Vairavelavan in Mylapore, Chennai, Chathur Lakshana Academy of Fine Arts was established to uphold the authentic Kalakshetra lineage and the sacred Guru-Shishya parampara, building a strong foundation in classical Bharatanatyam education.',
  },
  {
    step: '02',
    eraTag: 'Academy Milestone',
    title: 'Samarpanam',
    icon: Flame,
    category: 'MILESTONE PRESENTATION',
    desc: 'A cherished milestone in the academy’s journey, Samarpanam marked an offering of artistic devotion and collective student presentation, reflecting the discipline and spirit nurtured at Chathur Lakshana.',
  },
  {
    step: '03',
    eraTag: 'Landmark Debut',
    title: "The Academy's First Arangetram",
    icon: Award,
    category: 'FIRST ARANGETRAM',
    desc: 'A defining chapter in the academy’s pedagogical journey, celebrating the first Arangetram — the formal classical solo debut of a disciple guided through a complete margam in the Kalakshetra tradition.',
  },
  {
    step: '04',
    eraTag: 'Jan 16, 2025',
    title: 'Panniru Thingalum Payindridu Vizhaakkalum',
    icon: Sparkles,
    category: 'MAJOR PRODUCTION',
    desc: 'A major thematic production choreographed and staged for Nada Sudha Trust, celebrating the sacred cycle of traditional temple festivals across the twelve Tamil months.',
  },
  {
    step: '05',
    eraTag: 'January 2026',
    title: 'Anbe Jeevadharam',
    icon: Theater,
    category: 'MAJOR PRODUCTION',
    desc: 'Love, the essence of life — Staged in January 2026, Bharatiya Vidya Bhavan. Four stories, one theme, LOVE.',
  },
  {
    step: '06',
    eraTag: 'Through the Years',
    title: 'Performances & Cultural Events',
    icon: Calendar,
    category: 'STAGE & CULTURE',
    desc: 'Across recitals, temple offerings, thematic showcases, and cultural gatherings, the academy has continually created meaningful performance platforms for learners to experience live classical art and stage discipline.',
  },
  {
    step: '07',
    eraTag: 'Present & Beyond',
    title: 'Continued Artistic & Educational Development',
    icon: Compass,
    category: 'CONTINUING GROWTH',
    desc: 'Today, Chathur Lakshana continues to grow through both in-person training in Mylapore, Chennai and live interactive online sessions — guiding children, young adults, and adult learners across Bharatanatyam, Nattuvangam, Dance Theory, Choreography, and Mentorship.',
  },
]

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function AcademyJourneySection() {
  return (
    <section
      id="academy-journey"
      style={{
        backgroundColor: '#160811', // Deep burgundy background
        padding: 'clamp(90px, 12vw, 140px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212, 175, 101, 0.2)',
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '750px',
          height: '750px',
          background: 'radial-gradient(circle, rgba(212, 175, 101, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 7vw, 72px)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 5.4vw, 5.2rem)',
                fontWeight: 400,
                color: '#F5DDA0',
                textShadow: '0 0 25px rgba(212, 175, 101, 0.3)',
                lineHeight: 1.15,
                marginBottom: '20px',
              }}
            >
              Our Journey Through the Years
            </h2>
            <div
              style={{
                width: '70px',
                height: '1.5px',
                background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
                margin: '0 auto',
              }}
            />
          </div>
        </FadeIn>

        {/* Featured Editorial Visual Banner */}
        <FadeIn delay={0.1}>
          <div
            style={{
              maxWidth: '880px',
              margin: '0 auto clamp(48px, 7vw, 72px)',
              position: 'relative',
              backgroundColor: '#301326',
              padding: '10px',
              border: '1px solid rgba(212, 175, 101, 0.35)',
              borderRadius: '2px',
              boxShadow: '0 20px 55px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{ position: 'absolute', top: '-3px', left: '-3px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
            <div style={{ position: 'absolute', top: '-3px', right: '-3px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />
            <div style={{ position: 'absolute', bottom: '-3px', left: '-3px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
            <div style={{ position: 'absolute', bottom: '-3px', right: '-3px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />
            <div style={{ overflow: 'hidden', maxHeight: '380px' }}>
              <img
                src={studioEnsembleImg}
                alt="Chathur Lakshana Academy of Fine Arts ensemble"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '380px',
                  objectFit: 'cover',
                  objectPosition: 'center 30%',
                  display: 'block',
                  filter: 'contrast(1.05) saturate(0.95)',
                }}
              />
            </div>
          </div>
        </FadeIn>

        {/* Chronological Timeline */}
        <div
          className="academy-journey-timeline"
          style={{ position: 'relative', maxWidth: '880px', margin: '0 auto', paddingLeft: '44px' }}
        >
          {/* Animated Gold Vertical Spine */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: '10px',
              top: '16px',
              bottom: '16px',
              width: '1.5px',
              background: 'linear-gradient(to bottom, transparent, var(--accent-gold) 4%, var(--accent-gold) 96%, transparent)',
              transformOrigin: 'top',
              boxShadow: '0 0 10px rgba(212, 175, 101, 0.4)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {academyMilestones.map((m, idx) => {
              const IconComp = m.icon
              return (
                <FadeIn key={m.title} delay={0.08 + idx * 0.06}>
                  <div style={{ position: 'relative' }}>
                    {/* Gold Node Marker */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '-42px',
                        top: '26px',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: '#160811',
                        border: '2.5px solid var(--accent-gold)',
                        boxShadow: '0 0 12px rgba(212, 175, 101, 0.5), inset 0 0 6px rgba(212, 175, 101, 0.4)',
                        zIndex: 3,
                      }}
                    />

                    {/* Editorial Milestone Card */}
                    <div
                      style={{
                        backgroundColor: '#301326',
                        border: '1px solid rgba(212, 175, 101, 0.32)',
                        borderRadius: '2px',
                        padding: 'clamp(22px, 3.8vw, 34px)',
                        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(6px)'
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.72)'
                        e.currentTarget.style.boxShadow =
                          '0 18px 45px rgba(0, 0, 0, 0.55), 0 0 25px rgba(212, 175, 101, 0.15)'
                        e.currentTarget.style.backgroundColor = '#38162D'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)'
                        e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.32)'
                        e.currentTarget.style.boxShadow = '0 12px 36px rgba(0, 0, 0, 0.4)'
                        e.currentTarget.style.backgroundColor = '#301326'
                      }}
                    >
                      {/* Subtle Gold Left Accent */}
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: '3px',
                          background: 'linear-gradient(to bottom, var(--accent-gold), transparent)',
                        }}
                      />

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '12px',
                          flexWrap: 'wrap',
                          gap: '8px',
                        }}
                      >
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.18em',
                            color: 'var(--accent-gold)',
                            textTransform: 'uppercase',
                          }}
                        >
                          <IconComp size={14} />
                          <span>
                            {m.step} &bull; {m.category}
                          </span>
                        </div>

                        <span
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            color: 'var(--accent-gold-light)',
                            background: 'rgba(212, 175, 101, 0.12)',
                            border: '1px solid rgba(212, 175, 101, 0.25)',
                            padding: '3px 10px',
                            borderRadius: '2px',
                          }}
                        >
                          {m.eraTag}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(21px, 2.8vw, 27px)',
                          fontWeight: 500,
                          color: 'var(--text-primary)',
                          marginBottom: '10px',
                          lineHeight: 1.25,
                        }}
                      >
                        {m.title}
                      </h3>

                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'clamp(14px, 1.5vw, 15.5px)',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .academy-journey-timeline {
            padding-left: 34px !important;
          }
        }
      `}</style>
    </section>
  )
}
