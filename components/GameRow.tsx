'use client'
import type { CSSProperties } from 'react'
import GameCard from './GameCard'
import ArrowRight from './arrowRight'
import SkeletonGameCard from './skeletonGameCard'

export default function GameRow({
  title,
  fetchGames,
  categoryIndex,
  games,
}: {
  title: string
  fetchGames: () => Promise<any[]>
  categoryIndex: number
  games: any[] | null | undefined
}) {
  const isLoading = !games || games.length === 0
  const skeletonCount = 8

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>
        <span className="row-title">
          {title}
          <ArrowRight />
        </span>
      </h2>

      <div style={styles.hoverSpace} />

      <div style={styles.rowWrapper}>
        <div style={styles.fadeLeft} />
        <div style={styles.fadeRight} />

        <div style={styles.row} className="hide-scrollbar">
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <SkeletonGameCard
                  key={`skeleton-${categoryIndex}-${i}`}
                />
              ))
            : games
                .filter(Boolean) // <-- prevents undefined items
                .map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    categoryIndex={categoryIndex}
                  />
                ))}
        </div>
      </div>
    </section>
  )
}

const styles: Record<string, CSSProperties> = {
  section: { marginBottom: '32px' },
  title: {
    color: '#E5E7EB',
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '12px',
    position: 'relative',
    zIndex: 1,
  },
  rowWrapper: { position: 'relative', overflow: 'visible' },
  row: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    padding: '16px',
  },
  fadeLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '0px',
    background: 'linear-gradient(to right, #020617, transparent)',
    pointerEvents: 'none',
    zIndex: 2,
  },
  fadeRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '40px',
    background: 'linear-gradient(to left, #020617, transparent)',
    pointerEvents: 'none',
    zIndex: 2,
  },
  hoverSpace: { height: '14px' },
}
