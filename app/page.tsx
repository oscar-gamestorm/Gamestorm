'use client'
import Header from "@/components/header";
import Image from "next/image";
import { supabase } from "./lib/supabaseClient";
import { useState, useEffect } from 'react';
import Toolbar from "@/components/toolbar";
import GameRow from "@/components/GameRow";
import { useAuth } from "@/providers/authProvider";
import { color } from "framer-motion";

export default function Home() {

  // App.tsx or RootLayout

  const [filter, setFilter] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const [forYouGames, setForYouGames] = useState<any[]>([])
  const [adventureGames, setAdventureGames] = useState<any[]>([])
  const [racingGames, setRacingGames] = useState<any[]>([])
  const [shootingGames, setShootingGames] = useState<any[]>([])
  const [simulationGames, setSimulationGames] = useState<any[]>([])
  const [actionGames, setActionGames] = useState<any[]>([])
  const [pcGames, setPcGames] = useState<any[]>([])

  //SHOW TOAST ON LOGIN
  const [showLoginToast, setShowLoginToast] = useState(false)

  //AUTH alert ? good
  // : bad

  {/**
    const { user, loading_2 } = useAuth();

  if (loading_2) {
    return null; // wait quietly instead of flashing text
  }
    */}

  useEffect(() => {
    const fetchRows = async () => {
      const [
        forYou,
        adventure,
        racing,
        shooting,
        simulation,
        action,
        pc,
      ] = await Promise.all([
        supabase.from('games').select('*').order('downloads', { ascending: false }),
        supabase.from('games').select('*').contains('genres', ['adventure']).order('downloads', { ascending: false }),
        supabase.from('games').select('*').contains('genres', ['racing']).order('downloads', { ascending: false }),
        supabase.from('games').select('*').contains('genres', ['shooter']).order('downloads', { ascending: false }),
        supabase.from('games').select('*').contains('genres', ['simulation']).order('downloads', { ascending: false }),
        supabase.from('games').select('*').contains('genres', ['action']).order('downloads', { ascending: false }),
        supabase.from('games').select('*').in('platform', ['pc', 'both']).order('downloads', { ascending: false }),
      ])

      setForYouGames(forYou.data ?? [])
      const priorityOrder = [
        "Free Fire",
        "Call of Duty: Mobile",
        "Blood Strike",
        "Forza Horizon 4",
        "Marvel's Spider-Man Remastered",
        "Ori and the Blind Forest",
        "Warframe",
        "Red Dead Redemption 2",
        "Elden Ring",
        "Dead Cells",
        "Assassins Creed Odyssey",
        "GTA Chinatown Wars",
        "Session Skate Sim"
      ];
      const normalize = (s: string = "") => s.trim().toLowerCase();
      console.log(
        'URL =', process.env.NEXT_PUBLIC_SUPABASE_URL,
        'KEY =', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )


      const sortedForYou = (forYou.data ?? []).sort((a, b) => {
        const titleA = normalize(a.title);
        const titleB = normalize(b.title);

        const matchIndex = (title: string) => {

          // explicitly push Free Fire Max downn the list||
          if (title.startsWith("free fire max")) return 998;

          for (let i = 0; i < priorityOrder.length; i++) {
            const p = normalize(priorityOrder[i]);
            if (title === p || title.startsWith(p + " ")) {
              return i;
            }
          }

          // everything else = normal fallback region
          return 999;
        };

        const ap = matchIndex(titleA);
        const bp = matchIndex(titleB);

        return ap - bp;
      });
      console.log(
        "Sample titles:",
        (forYou.data ?? []).slice(0, 20).map(g => g.title)
      );

      setForYouGames(sortedForYou);



      setAdventureGames(adventure.data ?? [])
      setRacingGames(racing.data ?? [])
      setShootingGames(shooting.data ?? [])
      setSimulationGames(simulation.data ?? [])
      setActionGames(action.data ?? [])
      setPcGames(pc.data ?? [])
    }

    fetchRows()
    //TOAST FLAG 
    const flag = localStorage.getItem("gs_login_success");
    if (flag) {
      setShowLoginToast(true);
      localStorage.removeItem("gs_login_success");

      setTimeout(() => setShowLoginToast(false),
        2500)
    }
  }, [])
  //RENDER VISUALITIES AND GAME CARDS

  return (
    <div style={styles.page}>

      {showLoginToast && (
        <div className="
          fixed top-6 left-1/2 -translate-x-1/2 z-[9999]
          px-4 py-2 rounded-xl
          bg-white/10 backdrop-blur-md
          border border-emerald-400/30
          text-emerald-300 font-medium
          shadow-lg
        ">
          <span className="mr-2">✔</span>
          Logged in successfully
        </div>
      )}

      <Header />
      <main id="app-scroll" style={styles.container}>
        <Toolbar
          filter={filter}
          category={category}
          onFilterChange={setFilter}
          onCategoryChange={setCategory}
        />
        {/**
         * <>
          {user ? (
            <p>Welcome back, {user.email}</p>
          ) : (
            <p>You are not logged in</p>
          )}
        </>
         */}

        <GameRow title="For You" games={forYouGames} />
        <GameRow title="Adventure" games={adventureGames} />
        <GameRow title="Racing" games={racingGames} />
        <GameRow title="Shooting" games={shootingGames} />
        <GameRow title="Simulation" games={simulationGames} />
        <GameRow title="Action" games={actionGames} />
        <GameRow title="PC Games" games={pcGames} />

      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    backgroundColor: '#020617',
    minHeight: '150vh',
    overflow: 'hidden',
  },

  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '24px',
    paddingTop: '104px',
    overflowX: 'hidden',
    overflowY: 'auto',
  },
}
