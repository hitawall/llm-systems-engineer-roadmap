import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#09090b',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top: label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#a78bfa',
            }}
          />
          <span style={{ color: '#71717a', fontSize: '18px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Learning Tracker
          </span>
        </div>

        {/* Middle: title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#fafafa',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            LLM Systems Engineer
          </div>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#a78bfa',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Roadmap
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#71717a',
              lineHeight: 1.5,
              maxWidth: '720px',
              marginTop: '8px',
            }}
          >
            From Python basics to RAG, agents, evals, and production deployment.
          </div>
        </div>

        {/* Bottom: stats */}
        <div style={{ display: 'flex', gap: '48px' }}>
          {[
            { value: '7', label: 'Levels' },
            { value: '28', label: 'Skills' },
            { value: '~19w', label: 'Full path' },
            { value: '~10w', label: 'Lite path' },
          ].map(({ value, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ color: '#fafafa', fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em' }}>
                {value}
              </span>
              <span style={{ color: '#52525b', fontSize: '16px' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
