"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, BarChart3, Plus, List, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PlantãoBoard
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Sistema completo para gestão de plantões médicos
          </p>
          
          <Link href="/landing">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Começar Agora
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Cards de Funcionalidades */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="text-center pb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Cadastrar Plantões</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Registre seus plantões com controle completo de valores, horas e impostos
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="text-center pb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Dashboard Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Visualize seus ganhos com gráficos e relatórios detalhados
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="text-center pb-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <List className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Gerenciar Plantões</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Controle status de pagamentos e organize seus plantões
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Links */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/landing">
              <Button variant="outline" size="lg" className="text-lg px-6 py-3">
                Ver Landing Page
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-lg px-6 py-3">
                Criar Conta Grátis
              </Button>
            </Link>
          </div>
          
          <p className="text-gray-500 text-sm">
            Já tem conta? <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Fazer login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
