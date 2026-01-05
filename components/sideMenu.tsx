"use client";

import { useIsMobile } from "@/app/lib/useIsMobile";
import type { CSSProperties } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";   // App Router
import { useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function SideMenu({ open, onClose }: Props) {
    const isMobile = useIsMobile();
    const router = useRouter();                  // ✅ inside component
    const [authLoading, setAuthLoading] = useState(false);

    const handleLogout = async () => {
        setAuthLoading(true);

        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout failed:", error.message);
            setAuthLoading(false);
            return;
        }


        router.push("/auth");
    };

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    ...styles.backdrop,
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? "auto" : "none",
                }}
            />

            {/* Side panel */}
            <aside
                style={{
                    ...styles.panel,
                    width: isMobile ? "100%" : 240,
                    transform: open ? "translateX(0)" : "translateX(100%)",
                }}
            >
                <nav style={styles.nav}>
                    <MenuItem icon={DashboardIcon} label="Dashboard" />
                    <MenuItem icon={ControllerIcon} label="Games" />
                    <MenuItem icon={DeviceIcon} label="Devices" />
                    <MenuItem icon={RequirementIcon} label="Requirements" />

                    <div style={styles.divider} />

                    <MenuItem icon={ProfileIcon} label="Profile" />
                    <MenuItem icon={GearIcon} label="Settings" />

                    <MenuItem
                        icon={LogoutIcon}
                        label={authLoading ? "Logging out..." : "Log out"}
                        danger
                        onClick={handleLogout}          // ✅ now works
                    />
                </nav>
            </aside>
        </>
    );
}

/* ---------- Menu Item ---------- */

function MenuItem({
    icon: Icon,
    label,
    danger,
    onClick,
}: {
    icon: React.FC;
    label: string;
    danger?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}                      // ✅ clickable
            style={{
                ...styles.item,
                color: danger ? "#F87171" : "#E5E7EB",
                background: "transparent",
                border: "none",
                cursor: "pointer",
            }}
            onMouseEnter={(e) => {
                if (!danger) e.currentTarget.style.color = "#22C55E";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = danger ? "#F87171" : "#E5E7EB";
            }}
        >
            <Icon />
            <span>{label}</span>
        </button>
    );
}

/* ---------- Icons ---------- */

const iconStyle = {
    width: 18,
    height: 18,
    stroke: 'currentColor',
}

const DashboardIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" style={iconStyle}>
        <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
        <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
        <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
        <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
    </svg>
)

const ControllerIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width="22"
        height="22"
        style={{ transform: 'translateY(1px)' }}
    >
        <path
            d="M21 6h-6l-1-2H10L9 6H3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h2l2-3h10l2 3h2c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 13H7v-2H5V9h2V7h2v2h2v2H9v2zm6.5-1.5A1.5 1.5 0 1 1 17 10a1.5 1.5 0 0 1-1.5 1.5zm3-3A1.5 1.5 0 1 1 20 7a1.5 1.5 0 0 1-1.5 1.5z"
            strokeLinejoin="round"
        />
    </svg>
)

const DeviceIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" style={iconStyle}>
        <rect x="3" y="4" width="18" height="14" rx="2" strokeWidth="2" />
        <path d="M8 22h8" strokeWidth="2" />
    </svg>
)

const RequirementIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" style={iconStyle}>
        <rect x="4" y="3" width="16" height="18" rx="2" strokeWidth="2" />
        <path d="M8 11h8M8 15h5" strokeWidth="2" />
    </svg>
)

const ProfileIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" style={iconStyle}>
        <circle cx="12" cy="8" r="4" strokeWidth="2" />
        <path d="M4 21c1.5-4 14.5-4 16 0" strokeWidth="2" />
    </svg>
)

const GearIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" style={iconStyle}>
        <circle cx="12" cy="12" r="3" strokeWidth="2" />
        <path
            d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.6 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z"
            strokeWidth="2"
        />
    </svg>
)

const LogoutIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" style={iconStyle}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeWidth="2" />
        <path d="M16 17l5-5-5-5M21 12H9" strokeWidth="2" />
    </svg>
)

/* ---------- Styles ---------- */

const styles: Record<string, CSSProperties> = {
    backdrop: {
        position: 'fixed',
        top: 80,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        transition: 'opacity 0.3s ease',
        zIndex: 40,
    },

    panel: {
        position: 'fixed',
        top: 80, // HARD boundary under navbar
        right: 0,
        height: 'calc(100vh - 80px)',
        backgroundColor: '#020617',
        borderLeft: '1px solid #1F2937',
        padding: '32px 20px',
        zIndex: 45,
        overflowY: 'auto', // 👈 important: prevents pushing upward
        transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    },



    nav: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '8px',
    },

    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '14px',
        padding: '12px',
        cursor: 'pointer',
        transition: 'color 0.15s ease',
    },



    itemInner: {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '10px 16px',
        borderRadius: '8px',
        transition: 'background-color 0.15s ease',
    },

    divider: {
        height: 1,
        width: '60%',
        backgroundColor: '#1F2937',
        margin: '18px auto',
    },
}
