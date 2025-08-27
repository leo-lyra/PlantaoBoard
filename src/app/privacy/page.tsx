"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stethoscope, ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/landing" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Voltar para home
          </Link>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PlantãoMed
            </h1>
          </div>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-3xl">Política de Privacidade</CardTitle>
            </div>
            <p className="text-gray-600">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introdução</h2>
                <p className="text-gray-700 leading-relaxed">
                  O PlantãoMed está comprometido em proteger sua privacidade. Esta política explica como coletamos, 
                  usamos, armazenamos e protegemos suas informações pessoais quando você usa nossa plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Informações que Coletamos</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Informações de Conta</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Nome completo</li>
                      <li>Endereço de email</li>
                      <li>Senha (criptografada)</li>
                      <li>Data de criação da conta</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Dados de Plantões</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Locais de trabalho</li>
                      <li>Datas e horários dos plantões</li>
                      <li>Valores recebidos</li>
                      <li>Informações de impostos</li>
                      <li>Status de pagamentos</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Informações Técnicas</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Endereço IP</li>
                      <li>Tipo de navegador</li>
                      <li>Sistema operacional</li>
                      <li>Logs de acesso</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Como Usamos suas Informações</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Utilizamos suas informações para:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Fornecer e melhorar nossos serviços</li>
                  <li>Processar pagamentos e gerenciar assinaturas</li>
                  <li>Enviar notificações importantes sobre sua conta</li>
                  <li>Oferecer suporte técnico</li>
                  <li>Gerar relatórios e analytics para você</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Segurança dos Dados</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Criptografia</h3>
                    <p className="text-gray-700">
                      Todos os dados são criptografados em trânsito (HTTPS) e em repouso usando padrões de segurança bancária.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Acesso Restrito</h3>
                    <p className="text-gray-700">
                      Apenas funcionários autorizados têm acesso aos dados, e somente quando necessário para fornecer suporte.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Backup Seguro</h3>
                    <p className="text-gray-700">
                      Realizamos backups regulares em servidores seguros para garantir a disponibilidade dos seus dados.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Compartilhamento de Dados</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Não vendemos, alugamos ou compartilhamos</strong> suas informações pessoais com terceiros, exceto:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Com seu consentimento explícito</li>
                  <li>Para processamento de pagamentos (Stripe)</li>
                  <li>Quando exigido por lei</li>
                  <li>Para proteger nossos direitos legais</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Seus Direitos</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Você tem o direito de:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>Acessar:</strong> Solicitar uma cópia dos seus dados</li>
                  <li><strong>Corrigir:</strong> Atualizar informações incorretas</li>
                  <li><strong>Excluir:</strong> Solicitar a remoção dos seus dados</li>
                  <li><strong>Portabilidade:</strong> Exportar seus dados em formato legível</li>
                  <li><strong>Oposição:</strong> Opor-se ao processamento de dados</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Retenção de Dados</h2>
                <p className="text-gray-700 leading-relaxed">
                  Mantemos seus dados enquanto sua conta estiver ativa ou conforme necessário para fornecer serviços. 
                  Após o cancelamento da conta, os dados são mantidos por 90 dias para permitir reativação, 
                  depois são permanentemente excluídos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies e Tecnologias Similares</h2>
                <p className="text-gray-700 leading-relaxed">
                  Usamos cookies essenciais para o funcionamento da plataforma, como manter você logado. 
                  Não utilizamos cookies de rastreamento ou publicidade.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Conformidade com LGPD</h2>
                <p className="text-gray-700 leading-relaxed">
                  Estamos em conformidade com a Lei Geral de Proteção de Dados (LGPD). 
                  Processamos dados com base no consentimento e interesse legítimo para fornecer nossos serviços.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Alterações nesta Política</h2>
                <p className="text-gray-700 leading-relaxed">
                  Podemos atualizar esta política ocasionalmente. Notificaremos sobre mudanças significativas 
                  por email e através da plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contato</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Para questões sobre privacidade ou exercer seus direitos:
                </p>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> privacidade@plantaomed.com<br />
                    <strong>WhatsApp:</strong> (11) 99999-9999<br />
                    <strong>Encarregado de Dados:</strong> João Silva<br />
                    <strong>Resposta:</strong> Até 15 dias úteis
                  </p>
                </div>
              </section>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link href="/register">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3">
              Aceitar e Começar Trial Grátis
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}