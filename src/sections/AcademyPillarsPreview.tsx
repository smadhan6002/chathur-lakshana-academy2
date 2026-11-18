import { ArrowRight } from 'lucide-react'
import academyImage from '../img/imp 2.jpeg'

interface AcademyPillarsPreviewProps {
  onNavigateToAcademy: () => void
}

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

        {/* Centered Framed Academy Photography */}
        <div
          style={{
            maxWidth: '640px',
            margin: '0 auto 44px',
          }}
        >
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
            {/* Corner Gold Motifs */}
            <div style={{ position: 'absolute', top: '-3px', left: '-3px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
            <div style={{ position: 'absolute', top: '-3px', right: '-3px', width: '10px', height: '10px', borderTop: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />
            <div style={{ position: 'absolute', bottom: '-3px', left: '-3px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderLeft: '2px solid var(--accent-gold)' }} />
            <div style={{ position: 'absolute', bottom: '-3px', right: '-3px', width: '10px', height: '10px', borderBottom: '2px solid var(--accent-gold)', borderRight: '2px solid var(--accent-gold)' }} />
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
    </section>
  )
}
