// components/SkeletonGameCard.tsx
'use client'
import type { CSSProperties } from 'react'

export default function SkeletonGameCard() {
  return (
    <div style={styles.card}>
      <div style={styles.imageShimmer} />
      <div style={styles.meta}>
        <div style={styles.lineShort} />
        <div style={styles.lineLong} />
      </div>
    </div>
  )
}

const shimmer =
  'linear-gradient(90deg, #111827 0%, #1f2937 50%, #111827 100%)'

const styles: Record<string, CSSProperties> = {
  card: {
    width: 180,
    height: 300,
    borderRadius: '22px',
    backgroundColor: '#020617',
    overflow: 'hidden',
  },

  imageShimmer: {
    height: 240,
    background: shimmer,
    backgroundSize: '400% 100%',
    animation: 'shimmer 1.4s ease-in-out infinite',
  },

  meta: {
    padding: 8,
  },

  lineShort: {
    width: '60%',
    height: 12,
    borderRadius: 8,
    background: shimmer,
    backgroundSize: '400% 100%',
    animation: 'shimmer 1.4s ease-in-out infinite',
  },

  lineLong: {
    width: '80%',
    height: 10,
    marginTop: 6,
    borderRadius: 8,
    background: shimmer,
    backgroundSize: '400% 100%',
    animation: 'shimmer 1.4s ease-in-out infinite',
  },
}
