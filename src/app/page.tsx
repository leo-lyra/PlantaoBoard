"use client";

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Dashboard } from '@/components/Dashboard';
import { PlantaoForm } from '@/components/PlantaoForm';
import { PlantaoList } from '@/components/PlantaoList';
import { PlantaoProvider } from '@/contexts/PlantaoContext';
import { Toaster } from '@/components/ui/sonner';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'cadastrar':
        return <PlantaoForm />;
      case 'listar':
        return <PlantaoList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <PlantaoProvider>
      <div className="min-h-screen bg-gray-50">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Main Content */}
        <div className="md:pl-64">
          <main className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
        
        <Toaster />
      </div>
    </PlantaoProvider>
  );
}