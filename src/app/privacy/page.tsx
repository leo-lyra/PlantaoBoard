"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header compacto alinhado com a landing */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            PlantãoMed
          </span>
        </div>

        {/* Card de conteúdo (mesma linguagem visual) */}
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900">
              Política de Privacidade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Levamos a sua privacidade a sério. Esta Política descreve como
              tratamos seus dados pessoais em conformidade com a LGPD.
            </p>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">1. Dados Coletados</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Dados de cadastro (ex.: nome, e-mail).</li>
                <li>Dados de uso (ex.: páginas acessadas, preferências).</li>
                <li>Dados de faturamento quando aplicável (ex.: informações de cobrança).</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">2. Finalidades</h2>
              <p>
                Usamos seus dados para autenticar acesso, operar o serviço, processar
                pagamentos, melhorar funcionalidades e cumprir obrigações legais.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">3. Compartilhamento</h2>
              <p>
                Podemos compartilhar com prestadores estritamente necessários
                (ex.: processadores de pagamento). Não vendemos seus dados.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">4. Direitos do Titular</h2>
              <p>
                Você pode solicitar acesso, correção, portabilidade, anonimização e
                exclusão, bem como revogar consentimento quando aplicável.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">5. Segurança</h2>
              <p>
                Adotamos medidas técnicas e organizacionais para proteger os dados,
                mas nenhum método é 100% infalível.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">6. Retenção</h2>
              <p>
                Conservamos os dados pelo tempo necessário às finalidades e para
                cumprimento de obrigações legais.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">7. Contato do Encarregado (DPO)</h2>
              <p>
                Use o canal de suporte informado no aplicativo para exercer seus
                direitos ou tirar dúvidas.
              </p>
            </section>

            <div className="pt-4 text-sm text-gray-500">
              Confira também nossos{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                Termos de Uso
              </Link>
              .
            </div>
          </CardContent>
        </Card>

        {/* Rodapé alinhado com a landing */}
        <footer className="mt-16 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PlantãoMed</span>
            </div>
            <div className="text-center md:text-right">
              <p>© {new Date().getFullYear()} PlantãoMed. Todos os direitos reservados.</p>
              <p className="text-sm mt-1">Gestão financeira inteligente para médicos</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
