import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function proxy(request: Request) {
  const res = NextResponse.next()
  const url = new URL(request.url)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return res.cookies.get(name)?.value
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          res.cookies.set({ name, value: "", ...options })
        }
      }
    }
  )

  const { data } = await supabase.auth.getUser()
  const user = data?.user

  // allow auth page
  if (url.pathname.startsWith("/auth")) return res

  // protect all other routes
  if (!user) {
    return NextResponse.redirect(new URL("/auth", request.url))
  }

  return res
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
