"use client";

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/components/HomePage';
import { Dashboard } from '@/components/Dashboard';
import { PlantaoForm } from '@/components/PlantaoForm';
import { PlantaoList } from '@/components/PlantaoList';
import { PlantaoProvider } from '@/contexts/PlantaoContext';
import { Toaster } from '@/components/ui/sonner';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={setActiveTab} />;
      case 'dashboard':
        return <Dashboard />;
      case 'cadastrar':
        return <PlantaoForm />;
      case 'listar':
        return <PlantaoList />;
      default:
        return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <PlantaoProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Main Content */}
        <div className="md:pl-72">
          <main className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
        
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
          }}
        />
      </div>
    </PlantaoProvider>
  );
}