"use client";

import { useState } from "react";
import { Eye, EyeOff, Check } from "lucide-react";


interface Props {
    password: string;
    setPassword: (v: string) => void;
    confirm: string;
    setConfirm: (v: string) => void;
}
export default function PasswordFields({
    password,
    setPassword,
    confirm,
    setConfirm,
}: Props) {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const strength =

        password.length > 1 && password.length < 8
            ? "weak"
            :
            password.length <= 1
                ? "initial"
                : /[2-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)
                    ? "strong"
                    : "medium";

    const match = confirm && confirm === password;
    const showStrength = password.length >= 1;

    return (
        <div className="space-y-3">
            {/* Password */}
            <div className="relative">
                <input
                    type={show1 ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-lg bg-[#020617] border border-emerald-400/30 outline-none tracking-wide"
                />

                <button
                    type="button"
                    onClick={() => setShow1(!show1)}
                    className="absolute right-3 top-3"
                >
                    {show1 ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            {/* Helper */}
            <p className="text-xs text-gray-400">
                *Must be at least 8 characters*
            </p>

            {/* Strength Bar */}
            {/* Strength Indicator */}
            {showStrength && (
                <div className="space-y-1">
                    <div className="h-2 rounded bg-black/40 overflow-hidden">
                        <div
                            style={{
                                width:
                                    strength === "initial"
                                        ? "0%"
                                        : strength === "weak"
                                            ? "33%"
                                            : strength === "medium"
                                                ? "66%"
                                                : "100%",
                                transition: "width 300ms ease-in-out",
                            }}
                            className={`
          h-full
          ${strength === "weak" ? "bg-red-500"
                                    : strength === "medium" ? "bg-orange-400"
                                        : "bg-emerald-500"}
        `}
                        />
                    </div>

                    <p
                        className={`text-xs font-medium transition-colors ${strength === "weak"
                            ? "text-red-400"
                            : strength === "medium"
                                ? "text-orange-300"
                                : "text-emerald-400"
                            }`}
                    >
                        {strength === "weak" && "Weak password"}
                        {strength === "medium" && "Medium strength"}
                        {strength === "strong" && "Strong password"}
                    </p>
                </div>
            )}


            {/* Confirm Password */}
            <div className="relative">
                <input
                    id="confirmPassword"
                    type={show2 ? "text" : "password"}
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 rounded-lg bg-[#020617] border border-emerald-400/30 outline-none tracking-wide"
                />

                <button
                    type="button"
                    onClick={() => setShow2(!show2)}
                    className="absolute right-3 top-3"
                >
                    {show2 ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

                {match && (
                    <Check
                        size={18}
                        className="absolute right-9 top-3 text-emerald-400"
                    />
                )}
            </div>

            {match && (
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                    Passwords match
                </p>
            )}
        </div>
    );
}
