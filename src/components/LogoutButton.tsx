"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();
  const supabase = supabaseBrowser();
  const [loading, setLoading] = useState(false);

  async function onSignOut() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error) {
        toast.error("Não foi possível sair", { description: error.message });
        return;
      }
      toast.success("Sessão encerrada");
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onSignOut}
      disabled={loading}
      className="inline-flex items-center gap-2"
      aria-label="Sair da conta"
    >
      <LogOut className="h-4 w-4" />
      {loading ? "Saindo..." : "Sair"}
    </Button>
  );
}

export default LogoutButton;

