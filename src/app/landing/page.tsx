"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Stethoscope, Check, Star, Users, TrendingUp, Shield,
  Zap, BarChart3, Clock, DollarSign, ArrowRight,
  CheckCircle, Award, Target
} from 'lucide-react';

export default function LandingPage() {
  const [planoSelecionado, setPlanoSelecionado] = useState<'mensal' | 'anual'>('anual');

  const precoMensal = 12.90; // exemplo
  const precoAnual = 95.04;  // R$ 7,92/mês
  const precoExibido = planoSelecionado === 'anual' ? precoAnual : precoMensal;

  return (
    <main>
      {/* HERO */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex items-center justify-center mb-4">
          <Badge className="text-xs">Novo • Beta Público</Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Transforme Seus Plantões em <span className="text-blue-600">Renda Previsível</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              O único sistema que médicos precisam para <strong>controlar plantões</strong>,
              <strong> maximizar ganhos</strong> e <strong>planejar o futuro financeiro</strong> com dashboards profissionais e automação inteligente.
            </p>

            <div className="mt-6 flex gap-3 flex-wrap">
              <Link href="/register" className="inline-flex items-center justify-center rounded-md px-5 py-3 bg-blue-600 text-white font-medium hover:opacity-90">
                Começar Agora — 7 Dias Grátis
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-md px-5 py-3 border text-sm font-medium">
                Ver Demo
              </Link>
            </div>

            <ul className="mt-5 text-sm text-muted-foreground grid grid-cols-3 gap-2 max-w-md">
              <li><strong>2.500+</strong> Médicos</li>
              <li><strong>R$ 50M+</strong> Gerenciados</li>
              <li><strong>98%</strong> Satisfação</li>
            </ul>
          </div>

          <div className="relative w-full aspect-[4/3]">
            <Image
              src="/dashboard-hero.png"
              alt="Visão do dashboard financeiro do PlantãoMed"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-xl shadow-2xl object-cover"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          ✅ Sem compromisso • ✅ Cancele quando quiser • 🔒 Pagamento seguro
        </p>
      </section>

      {/* BENEFÍCIOS */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { Icon: BarChart3, title: 'Dashboard de Ganhos', desc: 'Visualize seus ganhos por hospital, turno e mês com clareza.' },
            { Icon: Clock, title: 'Escalas Inteligentes', desc: 'Monte sua escala com conflito zero e alertas automáticos.' },
            { Icon: Shield, title: 'Segurança & Privacidade', desc: 'Seus dados criptografados e hospedados no Brasil.' },
          ].map(({ Icon, title, desc }) => (
            <Card key={title} className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon className="text-blue-600" />
                  <CardTitle>{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">{desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">O que os médicos dizem</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { nome: 'Dr. Carlos', especialidade: 'Cardiologista', texto: 'Centralizei tudo e aumentei meu faturamento em 18%.' },
            { nome: 'Dra. Ana', especialidade: 'Pediatra', texto: 'Economizei horas por semana com a escala automática.' },
            { nome: 'Dr. Pedro', especialidade: 'Intensivista', texto: 'Relatórios que facilitam negociar com os hospitais.' },
          ].map((t) => (
            <Card key={t.nome} className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{t.nome} — {t.especialidade}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                “{t.texto}”
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* PLANOS */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Planos</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className={planoSelecionado === 'mensal' ? 'font-semibold' : ''}>Mensal</span>
            <Button variant="outline" size="sm" onClick={() => setPlanoSelecionado(p => p === 'mensal' ? 'anual' : 'mensal')}>
              Alternar
            </Button>
            <span className={planoSelecionado === 'anual' ? 'font-semibold' : ''}>Anual</span>
            <Badge className="ml-2">-39%</Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              nome: 'Essencial',
              preco: planoSelecionado === 'anual' ? 'R$ 0' : 'R$ 0',
              destaque: 'Para começar',
              itens: ['Cadastro de plantões', 'Relatórios básicos', '1 hospital']
            },
            {
              nome: 'Profissional',
              preco: planoSelecionado === 'anual' ? `R$ ${precoExibido.toFixed(2)}/ano` : `R$ ${precoExibido.toFixed(2)}/mês`,
              destaque: 'Mais vendido',
              itens: ['Dashboards avançados', 'Escala inteligente', 'Exportações e filtros'],
              popular: true
            },
            {
              nome: 'Enterprise',
              preco: 'Sob consulta',
              destaque: 'Para grupos',
              itens: ['Integrações', 'Suporte dedicado', 'Treinamento']
            }
          ].map((p) => (
            <Card key={p.nome} className={p.popular ? 'border-2 border-blue-600 shadow-2xl' : 'shadow-lg'}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{p.nome}</CardTitle>
                  {p.popular && <Badge>Popular</Badge>}
                </div>
                <div className="text-2xl mt-2">{p.preco}</div>
                <div className="text-xs text-muted-foreground">{p.destaque}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {p.itens.map((i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-emerald-600" /> {i}
                    </li>
                  ))}
                </ul>
                <Link href={p.nome === 'Profissional' ? '/register?plan=pro' : '/register'} className="inline-flex w-full items-center justify-center rounded-md px-4 py-2 bg-blue-600 text-white font-medium hover:opacity-90">
                  Começar Agora
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl p-8 md:p-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold">Pronto para organizar seus plantões?</h2>
          <p className="mt-3 text-white/90">Comece grátis e migre seus dados quando quiser.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/register" className="inline-flex items-center justify-center rounded-md px-5 py-3 bg-white text-blue-700 font-medium">
              Criar conta grátis <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center rounded-md px-5 py-3 border border-white/30 text-white/90">
              Ver Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
