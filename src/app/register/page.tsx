"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast.error("Falha ao registrar", { description: error.message });
        return;
      }
      toast.success("Conta criada! Faça login para continuar.");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle>Criar conta</CardTitle>
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
                placeholder="Mín. 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Criando conta..." : "Criar conta"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link href="/login" className="underline">Entrar</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
