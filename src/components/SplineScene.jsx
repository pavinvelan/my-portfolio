import { lazy, Suspense } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

/**
 * SplineScene - Embeds a Spline 3D scene.
 *
 * To get your scene URL:
 * 1. Go to https://spline.design and sign up (free)
 * 2. Create or remix a scene (search "laptop", "isometric workspace", etc.)
 * 3. Click the "Export" button (top-right) → "Web Content"
 * 4. Copy the production URL (ends in .splinecode)
 * 5. Paste it as the `scene` prop below
 *
 * Community scenes to try:
 * - Search "laptop" or "workspace" at https://spline.design/community
 */
export default function SplineScene({
  scene = '/hero-scene.spline',
  style = {},
  className = '',
}) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        ...style,
      }}
    >
      <Suspense
        fallback={
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00F0FF',
              fontSize: '14px',
              fontFamily: 'monospace',
            }}
          >
            Loading 3D scene…
          </div>
        }
      >
        <Spline scene={scene} />
      </Suspense>
    </div>
  )
}
