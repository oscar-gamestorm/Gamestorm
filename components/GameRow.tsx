'use client'
import type { CSSProperties } from 'react'
import GameCard from './GameCard'
import SkeletonGameCard from './skeletonGameCard'

export default function GameRow({
  title,
  games,
}: {
  title: string
  games: any[] | null | undefined
}) {
  const isLoading = !games || games.length === 0
  const skeletonCount = 8

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>{title}</h2>

      <div style={styles.rowWrapper}>
        <div style={styles.fadeLeft} />
        <div style={styles.fadeRight} />

        <div style={styles.row} className="hide-scrollbar">
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <SkeletonGameCard key={`skeleton-${title}-${i}`} />
              ))
            : games!.map((game, i) => (
                <GameCard key={game.id ?? i} game={game} categoryIndex={0} />
              ))}
        </div>
      </div>
    </section>
  )
}

const styles: Record<string, CSSProperties> = {
  section: { marginBottom: '32px' },
  title: { color: '#E5E7EB', fontSize: 20, fontWeight: 600, marginBottom: 12 },
  rowWrapper: { position: 'relative' },
  row: {
    display: 'flex',
    gap: 16,
    overflowX: 'auto',
    padding: 16,
  },
  fadeLeft: { display: 'none' },
  fadeRight: { display: 'none' },
}
