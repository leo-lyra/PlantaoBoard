"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
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
              Termos de Uso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Bem-vindo(a)! Estes Termos regulam o uso do aplicativo. Ao utilizar o
              serviço, você concorda com as condições abaixo.
            </p>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">1. Uso do Serviço</h2>
              <p>
                O aplicativo destina-se à gestão de plantões médicos. Você concorda
                em utilizá-lo conforme a legislação aplicável e estes Termos.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">2. Cadastro e Acesso</h2>
              <p>
                Você é responsável por manter a confidencialidade das credenciais
                e pela veracidade das informações fornecidas.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">3. Planos e Pagamentos</h2>
              <p>
                Quando aplicável, cobranças e renovação seguem os termos exibidos no
                checkout. Cancelamentos e reembolsos observam a política vigente.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">4. Conteúdo do Usuário</h2>
              <p>
                Você mantém a titularidade dos dados inseridos. Ao utilizar o
                serviço, autoriza o tratamento necessário para a prestação.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">5. Limitação de Responsabilidade</h2>
              <p>
                O serviço é fornecido “como está”. Não nos responsabilizamos por
                indisponibilidades, perdas de dados causadas por terceiros ou mau uso.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">6. Alterações</h2>
              <p>
                Os Termos podem ser atualizados. O uso contínuo após alterações
                implica concordância.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">7. Contato</h2>
              <p>
                Em caso de dúvidas, entre em contato pelo e-mail de suporte indicado
                no aplicativo.
              </p>
            </section>

            <div className="pt-4 text-sm text-gray-500">
              Precisa ver nossa{" "}
              <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                Política de Privacidade
              </Link>
              ?
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
