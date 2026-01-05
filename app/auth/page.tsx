"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import GameStormLogo from "@/components/gamestormLogo"
import { X } from "lucide-react"
import PasswordFields from "../../components/passwordFields"
import { supabase } from "../lib/supabaseClient"
import { useRouter } from "next/navigation"
import "@/styles/gs-loader.css"

// ====== INTEGRATED GEOMETRIC LOADER ======
const GameLoader = ({ label = "Loading..." }: { label?: string }) => (
  <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/80 backdrop-blur-md">
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-6">
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32"></circle>
          </svg>
        </div>

        <div className="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>

        <div className="loader">
          <svg viewBox="0 0 80 80">
            <rect x="8" y="8" width="64" height="64"></rect>
          </svg>
        </div>
      </div>

      <p className="text-emerald-300 font-semibold tracking-wide">
        {label}
      </p>
    </div>
  </div>
)

export default function AuthPage() {
  //TOAST STATE VALUES
  const [toast, setToast] = useState<null | { text: string; type: "success" | "error" }>(null)
  const [toastClosing, setToastClosing] = useState(false)

  const router = useRouter()
  //Handle Cookies Session
  {/**useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        router.replace("/")
      }
    })

    return () => sub.subscription.unsubscribe()
  }, [])*/}


  const [panel, setPanel] = useState<"none" | "login" | "signup">("none")
  const [closing, setClosing] = useState(false)
  const [mode, setMode] = useState<"login" | "signup">("login")

  const [username, setUsername] = useState("")
  const [agree, setAgree] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [message, setMessage] = useState<string | null>(null)

  const canSignup =
    username.trim() &&
    email.trim() &&
    password.trim() &&
    confirm.trim() &&
    password === confirm

  const [successAlert, setSuccessAlert] = useState(false)

  const [loading, setLoading] = useState(false)
  const [switching, setSwitching] = useState(false)
  const [uiLoading, setUiLoading] = useState(false)



  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToast({ text, type })
    setToastClosing(false)

    setTimeout(() => setToastClosing(true), 2800)
    setTimeout(() => setToast(null), 3200)
  }


  const handleEnterNext = (e: React.KeyboardEvent<HTMLInputElement>, nextId?: string) => {
    if (e.key === "Enter") {
      e.preventDefault()
      document.getElementById(nextId || "")?.focus()
    }
  }

  const switchMode = async (target: "login" | "signup") => {
    setSwitching(true)
    await new Promise(r => setTimeout(r, 500))
    setMode(target)
    setSwitching(false)
  }

  const handleSignup = async () => {
    if (!email.includes("@"))
      return showToast("Invalid email format", "error")

    if (password !== confirm)
      return showToast("Passwords do not match", "error")

    if (!username.trim())
      return showToast("Username is required", "error")

    // remove agree-to-terms validation
    // if (!agree) return ...

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } }
    })

    setLoading(false)

    if (error)
      return showToast(error.message, "error")

    showToast("Account created successfully", "success")

    setPanel("none")
    setSuccessAlert(true)

    setUsername("")
    setPassword("")
    setEmail("")
    setConfirm("")

    setTimeout(() => setSuccessAlert(false), 2500)
  }


  const handleLogin = async () => {
    setUiLoading(true)
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setPanel("none")
    if (error) {
      setUiLoading(false)
      setLoading(false)
      setPanel("none")
      return showToast("Incorrect email or password", "error")
    }

    localStorage.setItem("gs_login_success", "1")

    router.replace("/")
    
    //safety loader fallbacks
    setTimeout(()=> setUiLoading(false), 
          3000)

    setPanel("none")

    //TEST USER AUTH
    //console.log("Session after reload:", data.session)
  }

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) return setMessage(error.message)
    setMessage("Password reset link sent to your email.")
  }

  return (
    <div className="relative min-h-screen bg-[#020617] text-white overflow-hidden">
      {uiLoading && <GameLoader label="" />}

      {/* Green Aura Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-emerald-500/25 blur-[140px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GameStormLogo size={40} />
          <span className="text-2xl font-semibold tracking-wide">GameStorm Inc.</span>
        </div>

        {/**toast ui */}
        {toast && (
          <div className={`
    fixed top-6 left-1/2 -translate-x-1/2 transform-gpu z-[9999]
    px-4 py-2 rounded-xl backdrop-blur shadow-lg
    ${toastClosing ? "animate-fade-out" : "animate-fade-in-up"}
    ${toast.type === "success"
              ? "bg-white/10 border border-emerald-400/40 text-emerald-300"
              : "bg-white/10 border border-red-400/40 text-red-300"}
  `}>
            {toast.type === "success" ? "✔ " : "✖ "}
            {toast.text}
          </div>
        )}

        <div className="flex items-center gap-6">

          {/* OPEN LOGIN PANEL */}
          <span
            className="cursor-pointer"
            onClick={() => {
              setMode("login")
              setPanel("login")
            }}
          >
            Log In
          </span>

          <span className="divider-green" />

          {/* OPEN SIGNUP PANEL */}
          <span
            className="cursor-pointer"
            onClick={() => {
              setMode("signup")
              setPanel("login") // open same panel, switch content
            }}
          >
            Create Account
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 md:px-12 mt-10 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Unleash Your Inner Gamer
          </h1>

          <p className="text-gray-300 max-w-xl">
            GameStorm helps players explore games with confidence —
            view specs, performance data, and device requirements,
            with future support for trusted download links.
          </p>

          <p className="text-emerald-400/90 font-medium">
            Built for gamers. Powered by insight.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative group w-[380px] h-[380px] md:w-[440px] md:h-[440px]">

            <div className="
              absolute -inset-10 rounded-full 
              bg-[conic-gradient(from_0deg,transparent_25%,rgba(34,197,94,0.9),transparent_70%)]
              blur-2xl opacity-70
              transition-all duration-500 
              group-hover:opacity-100 
              group-hover:blur-[42px]
              animate-[spin_3s_linear_infinite]
            " />

            <div className="
              absolute -inset-5 rounded-[28px] bg-emerald-400/35 blur-2xl opacity-60 transition-all duration-500 group-hover:opacity-90
            " />

            <Image
              src="/xbox-one.jpg"
              alt="Xbox console"
              fill
              className="object-contain rounded-[22px] shadow-[0_0_40px_rgba(34,197,94,0.55)] transition-all duration-500 group-hover:shadow-[0_0_95px_rgba(34,197,94,0.95)"
            />
          </div>
        </motion.div>
      </main>

      {/* ==============================
          AUTH PANEL OVERLAY
      =============================== */}
      {(panel === "login" || panel === "signup") && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: closing ? 0 : 1, y: closing ? 40 : 0 }}
            transition={{ duration: 0.08 }}
            className="w-[90%] max-w-md bg-[#060b18] border border-emerald-400/20 rounded-2xl p-6 relative"
          >

            {/* Close */}
            <button
              onClick={() => {
                setClosing(true);
                setTimeout(() => {
                  setPanel("none");
                  setClosing(false);
                }, 80); // same as entrance timing
              }}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            {/* FORM */}
            <div className="max-w-md mx-auto p-2 text-white">

              <h1 className="text-2xl font-semibold mb-4">
                {mode === "login" ? "Log In" : "Create Account"}
              </h1>

              {/**message && <p className="text-red-400 mb-2">{message}</p>*/}

              {/**Form Inputs */}
              <form autoComplete="off" className="space-y-3">
                <input type="text" name="fake-username" className="hidden" autoComplete="username" />{/**FAKE INPUT CHROME OVERRIDE*/}
                <input type="password" name="fake-password" className="hidden" autoComplete="new-password" />{/**FAKE PASSWORD INPUT CHROME OVERRIDE*/}

                {/* USERNAME — signup only */}
                {mode === "signup" && (
                  //INPUT FOR USERNAME (CREATE ACCOUNT ONLY)
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    onKeyDown={(e) => handleEnterNext(e, "email")}//SWITCH TO EMAIL INPUT
                    placeholder="Username"
                    className="w-full mb-3 px-4 py-3 rounded
        bg-[#020617] border border-emerald-400/30
        text-white placeholder-gray-400
        focus:border-emerald-400 transition-colors"
                  />
                )}

                {/* EMAIL (both modes) */}
                <input
                  type="email"
                  id="email"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  autoCapitalize="none"
                  value={email}
                  onKeyDown={(e) => handleEnterNext(e, "password")}//SWITCH TO PASSWORD INPUT
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full mb-3 px-4 py-3 rounded
      bg-[#020617] border border-emerald-400/30
      text-white placeholder-gray-400
      focus:border-emerald-400 transition-colors"
                />

                {/* PASSWORDS */}
                {mode === "signup" ? (
                  <PasswordFields
                    password={password}
                    setPassword={setPassword}
                    confirm={confirm}
                    setConfirm={setConfirm}
                  />
                ) : (
                  <input
                    value={password}
                    id="password"
                    onKeyDown={(e) => handleEnterNext(e, "confirm")}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Password"
                    className="w-full mb-3 px-4 py-3 rounded
        bg-[#020617] border border-emerald-400/30
        text-white placeholder-gray-400
        focus:border-emerald-400 transition-colors"
                  />
                )}

                {/* TERMS — signup only -- agree to terms removed but padding space retained*/}
                {mode === "signup" && (
                  <label className="flex items-center gap-2 text-sm text-gray-300 pt-1">
                  </label>
                )}
              </form>

              {mode === "login" ? (
                <>
                  <button
                    onClick={async () => {
                      setUiLoading(true);

                      await handleLogin();   // <-- actually runs login

                      setUiLoading(false);
                    }}
                    disabled={loading || switching}
                    className="w-full py-3 rounded bg-emerald-500 font-semibold hover:bg-emerald-600 disabled:opacity-60"
                  >
                    {loading ? "Logging in..." : "Log In"}
                  </button>


                  <button
                    type="button"
                    disabled={loading || switching}
                    onClick={() => {
                      setUiLoading(true);
                      setTimeout(() => {
                        setMode("signup");
                        setUiLoading(false);
                      }, 2800)
                    }
                    }
                    className="mt-3 text-emerald-400"
                  >
                    Don’t have an account? <span className="active:text-emerald-600 underline underline-offset-4">Sign up</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={async () => {
                      setUiLoading(true);

                      await handleSignup();  // <-- run signup

                      setUiLoading(false);
                    }}
                    disabled={loading || switching || !canSignup}
                    className="w-full py-3 rounded bg-emerald-500 font-semibold hover:bg-emerald-600 disabled:opacity-60"
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </button>


                  <button
                    type="button"
                    disabled={loading || switching}
                    onClick={() => {
                      setUiLoading(true);
                      setTimeout(() => {
                        setMode("login");
                        setUiLoading(false);
                      }, 2800)
                    }}
                    className="mt-3 text-emerald-400"
                  >
                    Already have an account? <span className="active:text-emerald-600 underline underline-offset-4">Log in</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
