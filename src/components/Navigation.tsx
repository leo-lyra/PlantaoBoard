"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Home, LayoutDashboard, Plus, List, Menu, Stethoscope,
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
    { id: 'home', label: 'Início', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cadastrar', label: 'Novo Plantão', icon: Plus },
    { id: 'listar', label: 'Meus Plantões', icon: List },
  ];

  const NavItems = ({ mobile = false }) => (
    <div className={cn("space-y-2", mobile ? "p-4" : "")}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 transition-all duration-300 rounded-xl",
              mobile ? "h-14 text-base" : "h-12",
              isActive 
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700" 
                : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
            )}
            onClick={() => {
              onTabChange(item.id);
              if (mobile) setMobileMenuOpen(false);
            }}
          >
            <Icon className={cn("h-5 w-5", isActive && "text-white")} />
            <span className="font-medium">{item.label}</span>
          </Button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-50">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-xl">
          {/* Header */}
          <div className="flex items-center px-6 py-8 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Stethoscope className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  PlantãoMed
                </h1>
                <p className="text-sm text-gray-500 font-medium">Gestão de Plantões</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 px-4 py-6">
            <nav className="space-y-2">
              <NavItems />
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-xs text-gray-400">
                Versão 1.0 • Made with ❤️
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PlantãoMed
              </h1>
            </div>
          </div>
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="flex items-center gap-3 p-6 border-b border-gray-100">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    PlantãoMed
                  </h1>
                  <p className="text-sm text-gray-500">Gestão de Plantões</p>
                </div>
              </div>
              <div className="py-4">
                <NavItems mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}