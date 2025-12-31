'use client'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import SkeletonGameCard from './skeletonGameCard'

export default function GameCard({
    game,
    categoryIndex,
}: {
    game: any
    categoryIndex: number
}) {
    if (!game) return null;

    const ref = useRef<HTMLDivElement | null>(null)

    // First 4 categories render immediately — others lazy load
    const [visible, setVisible] = useState(categoryIndex < 4)
    const [hovered, setHovered] = useState(false)

    // Ensure skeleton shows first and content loads only when visible
    useEffect(() => {
        if (categoryIndex < 4) return // no lazy load for first 4

        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '200px' }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [categoryIndex])

    // If not visible yet → render skeleton only
    if (!visible) {
        return (
            <div ref={ref}>
                <SkeletonGameCard />
            </div>
        )
    }

    // Resolve image URL
    const imageSrc =
        game?.cover_image_url?.startsWith('http')
            ? game.cover_image_url
            : game?.cover_image_url
                ? `https://pesavzbaetcdyhaatemw.supabase.co/storage/v1/object/public/game-covers/${game.cover_image_url}`
                : '/placeholder.jpg'

    return (
        <div
            ref={ref}
            style={{
                ...styles.card,
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                zIndex: hovered ? 10 : 1,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={styles.imageWrap}>
                <img src={game?.cover_image_url} alt={game?.title ?? ''} style={styles.image} />
            </div>

            <div style={styles.meta}>
                <div style={styles.name}>{game?.title}</div>
                <div style={styles.genre}>
                    {Array.isArray(game?.genres) ? game.genres.join(', ') : ''}
                </div>
            </div>
        </div>
    )
}

const styles: Record<string, CSSProperties> = {
    card: {
        width: 180,
        flexShrink: 0,
        backgroundColor: '#020617',
        borderRadius: '22px',
        overflow: 'hidden',
        transformOrigin: 'center',
        transition: 'transform .25s ease, box-shadow .25s ease',
    },

    imageWrap: {
        width: '100%',
        height: 240,
        borderRadius: '22px',
        overflow: 'hidden',
    },

    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },

    meta: {
        padding: 8,
    },

    name: {
        color: '#E5E7EB',
        fontSize: 14,
        fontWeight: 600,
    },

    genre: {
        fontSize: 12,
        color: '#9CA3AF',
        marginTop: 2,
    },
}
