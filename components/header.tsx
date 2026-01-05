'use client'

import { useState, useEffect, useRef, type CSSProperties } from 'react'
import SideMenu from './sideMenu'
import GameStormLogo from './gamestormLogo'
import SearchSuggestions from './searchSuggestions'

export default function Header() {
    const [menuPressed, setMenuPressed] = useState(false)
    const [focused, setFocused] = useState(false)
    const [value, setValue] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const scrollPosRef = useRef(0)
    const [hovered, setHovered] = useState(false)

    // navbar shadow scroll listener
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // lock page scroll when side-menu is open
    useEffect(() => {
        const el = document.getElementById('app-scroll')
        if (!el) return

        if (menuOpen) {
            scrollPosRef.current = el.scrollTop
            el.style.overflowY = 'hidden'
        } else {
            el.style.overflowY = 'auto'
            el.scrollTop = scrollPosRef.current
        }
    }, [menuOpen])

    return (
        <>
            <header
                style={{
                    ...styles.navbar,
                    boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.45)' : 'none',
                    backdropFilter: scrolled ? 'blur(8px)' : 'none',
                }}
            >
                <div style={styles.navInner}>
                    {/* Brand */}
                    <div style={styles.brand} className='mobile-brand'>
                        <GameStormLogo size={35} />
                        <span>GameStorm</span>
                    </div>

                    {/* Right */}
                    <div style={styles.rightArea} className='mobile-right-area'>
                        {/* Search */}
                        <div style={{ ...styles.searchWrapper, position: 'relative' }}>
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
                                className='search-input-mobile-grow'
                                value={value}
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
                                    backgroundColor: 'inherit',
                                    border: '1px solid #334155',
                                    boxShadow: focused
                                        ? '0 0 0.05px 0.5px #334155'
                                        : 'none',
                                }}
                            />

                            {value && (
                                <button
                                    onClick={() => setValue('')}
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                    style={{
                                        position: 'absolute',
                                        right: 10,
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        fontSize: 14,
                                        color: '#9CA3AF',
                                        background: hovered ? '#334155' : '#222b3a',
                                        height: 30,
                                        width: 30,
                                        borderRadius: 5,
                                        border: 'none',
                                        cursor: 'pointer',
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
                            <span className='menu-text'>Menu</span>

                            <span style={styles.hamburger}>
                                <span
                                    style={{
                                        ...styles.line,
                                        transform: menuOpen
                                            ? 'rotate(45deg)'
                                            : 'translateY(-5px)',
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
                                        transform: menuOpen
                                            ? 'rotate(-45deg)'
                                            : 'translateY(5px)',
                                    }}
                                />
                            </span>
                        </button>
                    </div>
                </div>
                <style jsx>{`
        
  @media (max-width: 520px) {
/* Scale logo + title first */
  :global(.mobile-brand) {
    gap: 6px;
    transform: translateX(-2px); /* shift slightly to give search room */
  }

  :global(.mobile-brand span) {
    font-size: clamp(16px, 3.8vw, 18px);
  }

  /* Slightly shrink the logo */
  :global(.mobile-brand svg) {
    width: clamp(24px, 3.8vw, 30px);
    height: clamp(24px, 3.8vw, 30px);
  }

    /*Menu Responsive style*/
    .menu-text {
      display: none;
    }

    /*SEARCH RESPONSIVE STYLE*/

    .search-input-mobile-grow {
    width: clamp(150px, 58vw, 220px);
    height: 39px;
    padding-left: clamp(30px, 4vw, 36px);
    padding-right: clamp(10px, 3vw, 14px);
  }

}

/* Extra tightening only for tiny screens (≤ 400px) */
@media (max-width: 750px) {

  :global(.mobile-brand) {
    gap: 4px;
    transform: translateX(-4px);
  }

  :global(.mobile-brand span) {
    font-size: clamp(14px, 4vw, 16px);
  }

  :global(.mobile-brand svg) {
    width: clamp(20px, 4vw, 26px);
    height: clamp(20px, 4vw, 26px);
  }

    .search-input-mobile-grow::placeholder {
    font-size: clamp(11px, 1.5vw, 13px);
  }

    /* Reduce spacing so items fit naturally */

    :global(.mobile-right-area) {
      gap: 8px;
    }
  }

/* Small-phone tuning — iPhone SE / 350–385px */

@media (max-width: 385px) {
    .mobile-brand {
    gap: clamp(18px, 1.2vw, 6px);
    transform: translate(-10px, 0); /* keep alignment stable */
  }

  .mobile-brand span {
    font-size: clamp(0.9rem, 2.6vw, 1rem);
    line-height: 1;
    letter-spacing: 0.2px;
  }

  /* Slightly scale down the logo before shrinking the search */
  .mobile-brand svg {
    width: clamp(26px, 6.8vw, 30px);
    height: clamp(26px, 6.8vw, 30px);
  }
    
  .search-input-mobile-grow {
    height: 39px;
    padding: 0 clamp(6px, 1.4vw, 8px);
  }

  .search-input-mobile-grow::placeholder {
    font-size: clamp(0.65rem, 2.2vw, 0.75rem);
    
  }

  /* keep Menu fully visible on SE */
  .menu-text {
    display: none;
    font-size: clamp(0.7rem, 2.2vw, 0.8rem);
  }
}

`}</style>

            </header>

            <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    )
}

/* ---------- styles ---------- */

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
        /** scale title size smoothly across multiple device widths */
        fontSize: 'clamp(18px, 2.2vw, 28px)',
        fontWeight: 700,
        color: '#E5E7EB',
        letterSpacing: '1px',
    },

    rightArea: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    searchWrapper: { position: 'relative', },
    searchIcon: {
        position: 'absolute',
        left: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        width: 16,
        height: 16,
    },
    search: {
        color: 'lightgray',
        padding: '10px 14px 10px 36px',
        /** responisive size scaling */
        width: 'clamp(150px, 28vw, 325px)',
        borderRadius: 6,
        outline: 'none',
        transition: 'all 0.2s ease',
    },
    menuButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid #334155',
        color: '#E5E7EB',
        padding: '10px 14px',
        borderRadius: 6,
        cursor: 'pointer',
        transition: 'background-color 0.1s ease',
    },
    hamburger: {
        position: 'relative',
        width: 18,
        height: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        position: 'absolute',
        width: 18,
        height: 2,
        backgroundColor: '#E5E7EB',
        transition: 'transform 0.25s ease, opacity 0.2s ease',
    },
}