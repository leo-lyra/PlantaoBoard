"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Home,
  LayoutDashboard,
  Plus,
  List,
  Menu,
  Calendar,
  BarChart3,
  FileText,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/LogoutButton";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

type NavItem = {
  id: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Início", Icon: Home },
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "novo-plantao", label: "Novo Plantão", Icon: Plus },
  { id: "plantoes", label: "Meus Plantões", Icon: List },
  { id: "agenda", label: "Agenda", Icon: Calendar },
  { id: "relatorios", label: "Relatórios", Icon: FileText },
  { id: "estatisticas", label: "Estatísticas", Icon: BarChart3 },
];

function NavItems({
  activeTab,
  onTabChange,
  mobile = false,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  mobile?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-2", mobile ? "mt-4" : "")}>
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        return (
          <Button
            key={id}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 transition-all duration-300 rounded-xl",
              mobile ? "h-14 text-base" : "h-12",
              isActive
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700"
                : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
            )}
            onClick={() => onTabChange(id)}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Button>
        );
      })}
    </div>
  );
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col justify-between border-r bg-white/70 backdrop-blur-sm p-4">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 grid place-items-center text-white">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-bold leading-tight">PlantãoMed</h1>
              <p className="text-xs text-gray-500">Gestão de Plantões</p>
            </div>
          </div>

          <NavItems activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        <div className="pt-4 border-t mt-6">
          <LogoutButton />
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 grid place-items-center text-white">
              <Stethoscope className="h-4 w-4" />
            </div>
            <span className="font-semibold">PlantãoMed</span>
          </div>

          <div className="flex items-center gap-2">
            <LogoutButton />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[90%] sm:w-[380px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 grid place-items-center text-white">
                    <Stethoscope className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="font-semibold leading-tight">PlantãoMed</h2>
                    <p className="text-xs text-gray-500">Gestão de Plantões</p>
                  </div>
                </div>

                <NavItems
                  activeTab={activeTab}
                  onTabChange={onTabChange}
                  mobile
                />

                <div className="pt-4 border-t mt-6">
                  <LogoutButton />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
}
