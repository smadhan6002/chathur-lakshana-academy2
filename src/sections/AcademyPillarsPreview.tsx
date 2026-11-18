import { ArrowRight } from 'lucide-react'
import academyImage from '../img/imp 2.jpeg'

interface AcademyPillarsPreviewProps {
  onNavigateToAcademy: () => void
}

const pillars = [
  { name: 'ANGIKAM', title: 'Body & Form', desc: 'Precision of limb, gaze (drishti bhedam), and sculpted physical geometry.' },
  { name: 'VACHIKAM', title: 'Rhythm & Song', desc: 'Musicality, tala recitation, and deep resonance with the Carnatic sahityam.' },
  { name: 'AHARYAM', title: 'Aesthetic Lineage', desc: 'Sacred adornment, traditional costume, and reverent stage presentation.' },
  { name: 'SATVIKAM', title: 'Emotion & Devotion', desc: 'Inner abhinaya, bhava, and spiritual surrender to the divine.' },
]

export default function AcademyPillarsPreview({ onNavigateToAcademy }: AcademyPillarsPreviewProps) {
  return (
    <section
      id="pillars-preview"
      style={{
        backgroundColor: '#260D20', // Secondary rich plum background
        padding: 'clamp(80px, 10vw, 130px) 0',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(212, 175, 101, 0.2)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 48px)', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(44px, 7vw, 68px)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 5.2vw, 4.6rem)',
              fontWeight: 400,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              marginBottom: '18px',
            }}
          >
            Four Pillars of a Complete Artiste
          </h2>

          <div
            style={{
              width: '70px',
              height: '1.5px',
              background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)',
              margin: '0 auto 20px',
            }}
          />

          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 1.9vw, 1.5rem)',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            Chathur Lakshana embodies the classical doctrine: form, rhythm, aesthetic integrity, and devotional expression.
          </p>
        </div>

        {/* Two Column Preview: Academy Photo + 4 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '5fr 7fr',
            gap: 'clamp(32px, 5vw, 60px)',
            alignItems: 'center',
            marginBottom: '40px',
          }}
          className="pillars-preview-grid"
        >
          {/* Left: Framed Academy Photo */}
          <div
            style={{
              position: 'relative',
              backgroundColor: '#301326',
              padding: '12px',
              border: '1px solid rgba(212, 175, 101, 0.35)',
              borderRadius: '2px',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            }}
          >
            <img
              src={academyImage}
              alt="Classical Bharatanatyam discipline at Chathur Lakshana Academy"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'contrast(1.06) saturate(0.96)',
              }}
            />
          </div>

          {/* Right: 4 Pillars Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="four-pillars-cards">
            {pillars.map((p) => (
              <div
                key={p.name}
                style={{
                  backgroundColor: '#301326',
                  border: '1px solid rgba(212, 175, 101, 0.28)',
                  padding: '24px 20px',
                  borderRadius: '2px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.65)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 101, 0.28)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    color: 'var(--accent-gold)',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  ✦ {p.name}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    marginBottom: '8px',
                  }}
                >
                  {p.title}
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '13.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Link to Dedicated Academy Page */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={onNavigateToAcademy}
            className="btn-secondary"
            style={{
              padding: '14px 36px',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span>DISCOVER OUR ACADEMY JOURNEY &amp; VALUES</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pillars-preview-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .four-pillars-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
