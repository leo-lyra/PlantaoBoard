"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stethoscope, ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
              <FileText className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-3xl">Termos de Uso</CardTitle>
            </div>
            <p className="text-gray-600">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </CardHeader>
          <CardContent className="prose prose-gray max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
                <p className="text-gray-700 leading-relaxed">
                  Ao acessar e usar o PlantãoMed, você concorda em cumprir e estar vinculado a estes Termos de Uso. 
                  Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descrição do Serviço</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  O PlantãoMed é uma plataforma de gestão financeira especializada para médicos, oferecendo:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Controle de plantões médicos</li>
                  <li>Dashboards e relatórios financeiros</li>
                  <li>Cálculo automático de impostos</li>
                  <li>Backup e sincronização de dados</li>
                  <li>Suporte técnico especializado</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Conta de Usuário</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Para usar o PlantãoMed, você deve:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Fornecer informações precisas e atualizadas</li>
                  <li>Manter a segurança de sua conta e senha</li>
                  <li>Notificar-nos imediatamente sobre uso não autorizado</li>
                  <li>Ser responsável por todas as atividades em sua conta</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Planos e Pagamentos</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Trial Gratuito</h3>
                    <p className="text-gray-700">
                      Oferecemos 7 dias de acesso gratuito com todos os recursos premium.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Planos Pagos</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Plano Mensal: R$ 9,90/mês</li>
                      <li>Plano Anual: R$ 95,04/ano (20% de desconto)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Política de Cancelamento</h3>
                    <p className="text-gray-700">
                      Você pode cancelar sua assinatura a qualquer momento. O acesso continuará até o final do período pago.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Uso Aceitável</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Você concorda em não:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Usar o serviço para atividades ilegais</li>
                  <li>Tentar acessar contas de outros usuários</li>
                  <li>Interferir no funcionamento do serviço</li>
                  <li>Fazer engenharia reversa do software</li>
                  <li>Compartilhar sua conta com terceiros</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Propriedade Intelectual</h2>
                <p className="text-gray-700 leading-relaxed">
                  O PlantãoMed e todo seu conteúdo são protegidos por direitos autorais e outras leis de propriedade intelectual. 
                  Você mantém a propriedade de seus dados, mas nos concede licença para processá-los conforme necessário para fornecer o serviço.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacidade e Segurança</h2>
                <p className="text-gray-700 leading-relaxed">
                  Levamos sua privacidade a sério. Todos os dados são criptografados e armazenados com segurança. 
                  Consulte nossa Política de Privacidade para mais detalhes sobre como tratamos suas informações.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitação de Responsabilidade</h2>
                <p className="text-gray-700 leading-relaxed">
                  O PlantãoMed é fornecido "como está". Não garantimos que o serviço será ininterrupto ou livre de erros. 
                  Nossa responsabilidade é limitada ao valor pago pelo serviço nos últimos 12 meses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modificações dos Termos</h2>
                <p className="text-gray-700 leading-relaxed">
                  Podemos atualizar estes termos ocasionalmente. Notificaremos sobre mudanças significativas por email 
                  ou através da plataforma. O uso continuado após as mudanças constitui aceitação dos novos termos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contato</h2>
                <p className="text-gray-700 leading-relaxed">
                  Para dúvidas sobre estes termos, entre em contato conosco:
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Email:</strong> suporte@plantaomed.com<br />
                    <strong>WhatsApp:</strong> (11) 99999-9999<br />
                    <strong>Horário:</strong> Segunda a Sexta, 9h às 18h
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