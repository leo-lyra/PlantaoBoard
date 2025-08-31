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
  afterClick,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  mobile?: boolean;
  /** opcional: fechar o drawer no mobile após clique */
  afterClick?: () => void;
}) {
  return (
    <div className={cn("flex flex-col gap-2", mobile ? "mt-4" : "")}>
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        return (
          <Button
            type="button"
            key={id}
            variant="ghost"
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "w-full justify-start gap-3 rounded-xl transition-all duration-200",
              mobile ? "h-14 text-base" : "h-12",
              isActive
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            )}
            onClick={() => {
              onTabChange(id);
              afterClick?.();
            }}
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
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className="
          hidden md:flex
          w-64 shrink-0
          flex-col justify-between
          border-r bg-white/70 backdrop-blur-sm
          p-4
          sticky top-0 min-h-screen
        "
      >
        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-bold leading-tight">PlantãoMed</h1>
              <p className="text-xs text-gray-500">Gestão de Plantões</p>
            </div>
          </div>

          <NavItems activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        <div className="mt-6 border-t pt-4">
          <LogoutButton />
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur md:hidden">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 text-white">
              <Stethoscope className="h-4 w-4" />
            </div>
            <span className="font-semibold">PlantãoMed</span>
          </div>

          <div className="flex items-center gap-2">
            <LogoutButton />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[90%] sm:w-[380px]">
                <div className="mb-4 flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 text-white">
                    <Stethoscope className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="leading-tight font-semibold">PlantãoMed</h2>
                    <p className="text-xs text-gray-500">Gestão de Plantões</p>
                  </div>
                </div>

                <NavItems
                  activeTab={activeTab}
                  onTabChange={onTabChange}
                  mobile
                  afterClick={() => setOpen(false)}
                />

                <div className="mt-6 border-t pt-4">
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
