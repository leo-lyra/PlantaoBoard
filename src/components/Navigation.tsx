"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  LayoutDashboard, Plus, List, Menu, Stethoscope,
  Calendar, BarChart3, FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cadastrar', label: 'Cadastrar Plantão', icon: Plus },
    { id: 'listar', label: 'Meus Plantões', icon: List },
  ];

  const NavItems = ({ mobile = false }) => (
    <div className={cn("space-y-2", mobile ? "p-4" : "")}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-2",
              mobile ? "h-12" : "h-10"
            )}
            onClick={() => {
              onTabChange(item.id);
              if (mobile) setMobileMenuOpen(false);
            }}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">PlantãoMed</h1>
                <p className="text-sm text-gray-500">Gestão de Plantões</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-4 space-y-2">
              <NavItems />
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-blue-600" />
            <h1 className="text-lg font-bold text-gray-900">PlantãoMed</h1>
          </div>
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex items-center gap-2 mb-8">
                <Stethoscope className="h-6 w-6 text-blue-600" />
                <div>
                  <h1 className="text-lg font-bold text-gray-900">PlantãoMed</h1>
                  <p className="text-sm text-gray-500">Gestão de Plantões</p>
                </div>
              </div>
              <NavItems mobile />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}