"use client"

import { createBrowserClient } from "@supabase/ssr"

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name) {
        return document.cookie
          .split("; ")
          .find(c => c.startsWith(name + "="))
          ?.split("=")[1]
      },
      set(name, value) {
        document.cookie =
          `${name}=${value}; Path=/; SameSite=Lax; Secure`
      },
      remove(name) {
        document.cookie =
          `${name}=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      }
    }
  }
)
