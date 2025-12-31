'use client'

export default function ArrowRight() {
  return (
    <span className="arrow-right">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* straight line */}
        <line x1="3" y1="12" x2="18" y2="12" />

        {/* arrow head */}
        <polyline points="12 6 18 12 12 18" />
      </svg>
    </span>
  )
}
