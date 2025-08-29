"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, BarChart3, Plus, List } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PlantãoMed
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Sistema completo para gestão de plantões médicos
          </p>
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

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Começar Agora
          </Button>
        </div>
      </div>
    </div>
  );
}