// src/app/checkout/CheckoutClient.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CheckoutClient() {
  const params = useSearchParams();

  // Exemplo mínimo para não quebrar o build (substitua pelo seu UI real)
  const plan = params.get("plan") ?? "default";

  return (
    <main className={cn("min-h-screen flex items-center justify-center p-6")}>
      <div className="rounded-xl border p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-2">Checkout</h1>
        <p className="opacity-70">Plano selecionado: <b>{plan}</b></p>
      </div>
    </main>
  );
}
