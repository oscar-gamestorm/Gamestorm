export default function GameStormLogo({
    size = 28,
}: {
    size?: number
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Gamepad body */}
            <path
                d="M10 34c0-8 6-14 14-14h16c8 0 14 6 14 14 0 4-2 8-6 8-3 0-5-2-6-4l-3-4H25l-3 4c-1 2-3 4-6 4-4 0-6-4-6-8Z"
                fill="#E5E7EB"
            />

            {/* D-pad */}
            <rect x="20" y="28" width="6" height="2" fill="#020617" />
            <rect x="22" y="26" width="2" height="6" fill="#020617" />

            {/* Face buttons */}
            <circle cx="42" cy="28" r="1.6" fill="#020617" />
            <circle cx="46" cy="26" r="1.6" fill="#020617" />
            <circle cx="46" cy="30" r="1.6" fill="#020617" />
            <circle cx="50" cy="28" r="1.6" fill="#020617" />

            {/* Thunderbolt */}
            <path
                d="M34 10L26 26h6l-4 12 10-16h-6l4-12Z"
                fill="#22C55E"
            />
        </svg>
    )
}
