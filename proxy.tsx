import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";

export default async function proxy(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          res.cookies.set({ name, value: "", ...options });
        }
      }
    }
  );

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  const path = req.nextUrl.pathname;
  if (req.method !== "GET") return res;

  const isAuthPage = path.startsWith("/auth");

  if (!user && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  
  return res;
}

export const config = {
  matcher: [
    "/((?!_next|static|images|favicon.ico|api|auth|supabase|.*\\..*).*)"
  ]
};
