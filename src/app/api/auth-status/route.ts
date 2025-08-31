import { NextResponse } from "next/server";
import { supabaseRoute } from "@/lib/supabase-route";

export async function GET() {
  const supabase = supabaseRoute();
  const { data: { session } } = await supabase.auth.getSession();

  return NextResponse.json({
    ok: true,
    hasSession: !!session,
    user: session?.user ?? null,
  });
}
