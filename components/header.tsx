'use client'

import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'
import SideMenu from './sideMenu'
import GameStormLogo from './gamestormLogo'
import { useRef } from 'react'
import SearchSuggestions from './searchSuggestions'
import { hover } from 'framer-motion'

export default function Header() {
    const [menuPressed, setMenuPressed] = useState(false)
    const [focused, setFocused] = useState(false)
    const [value, setValue] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const scrollPosRef = useRef(0)
    const [hovered, setHovered] = useState(false);


    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])


    useEffect(() => {
        const scrollEl = document.getElementById('app-scroll')
        if (!scrollEl) return

        if (menuOpen) {
            scrollPosRef.current = scrollEl.scrollTop
            scrollEl.style.overflowY = 'hidden'
        } else {
            scrollEl.style.overflowY = 'auto'
            scrollEl.scrollTop = scrollPosRef.current
        }
    }, [menuOpen])

    return (
        <>
            <header
                style={{
                    ...styles.navbar,
                    boxShadow: scrolled
                        ? '0 8px 30px rgba(0,0,0,0.45)'
                        : 'none',
                    backdropFilter: scrolled ? 'blur(8px)' : 'none',
                }}
            >

                <div style={styles.navInner}>
                    {/* Brand */}
                    <div style={styles.brand}>
                        <GameStormLogo size={35} />
                        <span>GameStorm</span>
                    </div>


                    {/* Right side */}
                    <div style={styles.rightArea}>
                        {/* Search */}
                        <div style={{ ...styles.searchWrapper, position: "relative" }}>
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#9CA3AF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={styles.searchIcon}
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>

                            <input
                                value={value}
                                id="searchInput"
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Search games..."
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                autoComplete="off"
                                style={{
                                    ...styles.search,
                                    backgroundColor: "inherit",
                                    border: focused ? "1px solid #334155" : "1px solid #334155",
                                    boxShadow: focused ? "0 0 0.05px 0.5px #334155" : "none",
                                }}
                            />

                            {value && (
                                <button
                                    id='searchBarCancel'
                                    onClick={() => setValue("")}
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        fontSize: "14px",
                                        color: "#9CA3AF",
                                        background: hovered ? "#334155" : "#222b3a",
                                        height: "30px",
                                        width: "30px",
                                        borderRadius: "5px",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    ✕
                                </button>
                            )}
                            <SearchSuggestions query={value} />
                        </div>


                        {/* Menu */}
                        <button
                            style={{
                                ...styles.menuButton,
                                background: menuPressed ? '#111827' : 'inherit',
                            }}
                            onMouseDown={() => setMenuPressed(true)}
                            onMouseUp={() => setMenuPressed(false)}
                            onMouseLeave={() => setMenuPressed(false)}
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <span>Menu</span>

                            <span style={styles.hamburger}>
                                <span
                                    style={{
                                        ...styles.line,
                                        transform: menuOpen ? 'rotate(45deg)' : 'translateY(-5px)',
                                    }}
                                />
                                <span
                                    style={{
                                        ...styles.line,
                                        opacity: menuOpen ? 0 : 1,
                                    }}
                                />
                                <span
                                    style={{
                                        ...styles.line,
                                        transform: menuOpen ? 'rotate(-45deg)' : 'translateY(5px)',
                                    }}
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </header>


            <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    )
}

/* ---------------- styles ---------------- */

const styles: Record<string, CSSProperties> = {
    navbar: {
        height: 80,
        backgroundColor: '#0B0F14',
        borderBottom: '1px solid #1F2937',
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        zIndex: 50,
    },

    navInner: {
        maxWidth: '1280px',
        margin: '0 auto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
    },

    brand: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '28px',
        fontWeight: 700,
        color: '#E5E7EB',
        letterSpacing: '1px',
    },


    rightArea: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },

    searchWrapper: {
        position: 'relative',
    },

    searchIcon: {
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        width: '16px',
        height: '16px',
    },

    search: {
        backgroundColor: 'inherit',
        color: 'lightgray',
        padding: '10px 14px 10px 36px',
        width: '325px',
        borderRadius: '6px',
        outline: 'none',
        transition: 'all 0.2s ease',
    },

    futureSpace: {
        width: '120px',
        display: 'flex',
        justifyContent: 'flex-end',
    },

    menuButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid #334155',
        color: '#E5E7EB',
        padding: '10px 14px',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.1s ease',
    },


    hamburger: {
        position: 'relative',
        width: '18px',
        height: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    line: {
        position: 'absolute',
        width: '18px',
        height: '2px',
        backgroundColor: '#E5E7EB',
        transition: 'transform 0.25s ease, opacity 0.2s ease',
    },
}
