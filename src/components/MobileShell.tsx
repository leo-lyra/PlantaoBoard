// src/components/layout/MobileShell.tsx
import { PropsWithChildren } from "react";

/**
 * Wrapper de enquadramento mobile:
 * - limita largura e centraliza
 * - respeita safe-area (iOS)
 * - mantém o fundo degradê usado no app
 */
export default function MobileShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div
        className="
          mx-auto
          max-w-[420px] sm:max-w-[540px] md:max-w-4xl
          px-4 sm:px-6
          pt-[max(16px,env(safe-area-inset-top))]
          pb-[max(16px,env(safe-area-inset-bottom))]
        "
      >
        {children}
      </div>
    </div>
  );
}
