"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error("Falha ao entrar", { description: error.message });
        return;
      }
      toast.success("Bem-vindo!");
      router.push("/app");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle>Entrar no PlantãoMed</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm">Email</label>
              <Input
                type="email"
                required
                placeholder="voce@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div>
              <label className="text-sm">Senha</label>
              <Input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Não tem conta?{" "}
            <Link href="/register" className="underline">Criar conta</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
