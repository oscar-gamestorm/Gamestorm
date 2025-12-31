'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'

type ToolbarProps = {
    filter: string | null
    category: string | null
    onFilterChange: (value: string) => void
    onCategoryChange: (value: string) => void
}

export default function Toolbar({
    filter,
    category,
    onFilterChange,
    onCategoryChange,
}: ToolbarProps) {
    return (
        <div style={styles.wrapper}>
            <Dropdown
                label={filter ?? 'Filter'}
                items={['Latest', 'Most Popular', 'PC Games', 'Mobile Games']}
                onSelect={onFilterChange}
            />

            <Dropdown
                label={category ?? 'Categories'}
                items={[
                    'Action',
                    'Adventure',
                    'Shooting',
                    'Simulation',
                    'Racing',
                    'Sports',
                    "RPG's",
                ]}
                onSelect={onCategoryChange}
            />
        </div>
    )
}

/* ---------- Dropdown ---------- */

function Dropdown({
    label,
    items,
    onSelect,
}: {
    label: string
    items: string[]
    onSelect: (value: string) => void
}) {
    const [open, setOpen] = useState(false)

    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={() => setOpen(!open)}
                style={styles.button}
            >
                <span>{label}</span>
                <span
                    style={{
                        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                    }}
                >
                    ▾
                </span>
            </button>

            <div
                style={{
                    ...styles.dropdown,
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateY(0)' : 'translateY(-6px)',
                    pointerEvents: open ? 'auto' : 'none',
                }}
            >
                {items.map((item) => (
                    <div
                        key={item}
                        style={styles.item}
                        onClick={() => {
                            onSelect(item)
                            setOpen(false)
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.background = '#111827')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.background = 'transparent')
                        }
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ---------- Styles ---------- */

const styles: Record<string, CSSProperties> = {
    wrapper: {
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
    },

    button: {
        backgroundColor: '#0B0F14',
        border: '1px solid #1F2937',
        color: '#E5E7EB',
        padding: '10px 14px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },

    dropdown: {
        position: 'absolute',
        top: '110%',
        left: 0,
        minWidth: '160px',
        backgroundColor: '#020617',
        border: '1px solid #1F2937',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
        transition: 'all 0.18s ease',
        overflow: 'hidden',
        zIndex: 20,
    },

    item: {
        padding: '10px 14px',
        cursor: 'pointer',
        color: '#E5E7EB',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}
