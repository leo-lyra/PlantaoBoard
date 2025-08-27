"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronsUpDown, Plus, MapPin, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { hospitaisBrasil, searchHospitais, HospitalData } from '@/data/hospitais';
import { usePlantao } from '@/contexts/PlantaoContext';

interface HospitalSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function HospitalSelector({ value, onChange, error }: HospitalSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customLocal, setCustomLocal] = useState('');
  const { getUniqueLocais } = usePlantao();

  const locaisExistentes = getUniqueLocais();

  const filteredHospitais = useMemo(() => {
    if (!searchQuery) return hospitaisBrasil.slice(0, 50); // Mostrar apenas os primeiros 50
    return searchHospitais(searchQuery).slice(0, 20); // Limitar resultados da busca
  }, [searchQuery]);

  const selectedHospital = hospitaisBrasil.find(h => h.nome === value);

  const handleSelect = (hospital: HospitalData) => {
    onChange(hospital.nome);
    setOpen(false);
    setSearchQuery('');
  };

  const handleCustomSubmit = () => {
    if (customLocal.trim()) {
      onChange(customLocal.trim());
      setCustomLocal('');
      setShowCustomInput(false);
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Hospital': return 'bg-blue-100 text-blue-800';
      case 'UBS': return 'bg-green-100 text-green-800';
      case 'UPA': return 'bg-orange-100 text-orange-800';
      case 'Pronto Socorro': return 'bg-red-100 text-red-800';
      case 'Hospital Universitário': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (showCustomInput) {
    return (
      <div className="space-y-3">
        <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Local Personalizado
        </Label>
        <div className="flex gap-3">
          <Input
            placeholder="Digite o nome do local"
            value={customLocal}
            onChange={(e) => setCustomLocal(e.target.value)}
            className="flex-1 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleCustomSubmit()}
          />
          <Button 
            type="button" 
            onClick={handleCustomSubmit}
            className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl shadow-lg"
          >
            Adicionar
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 px-4 rounded-xl"
            onClick={() => setShowCustomInput(false)}
          >
            Cancelar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-blue-600" />
        Local do Plantão
      </Label>
      
      <div className="flex gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="flex-1 h-12 justify-between border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center gap-2 flex-1 text-left">
                {selectedHospital ? (
                  <>
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <div className="flex flex-col">
                      <span className="font-medium">{selectedHospital.nome}</span>
                      <span className="text-xs text-gray-500">
                        {selectedHospital.cidade} - {selectedHospital.estado}
                      </span>
                    </div>
                  </>
                ) : value ? (
                  <>
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{value}</span>
                  </>
                ) : (
                  <span className="text-gray-500">Selecione um local...</span>
                )}
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[600px] p-0" align="start">
            <Command>
              <CommandInput 
                placeholder="Buscar hospital, UBS, UPA..." 
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList className="max-h-[300px]">
                <CommandEmpty>Nenhum local encontrado.</CommandEmpty>
                
                {/* Locais já utilizados */}
                {locaisExistentes.length > 0 && (
                  <CommandGroup heading="Locais já utilizados">
                    {locaisExistentes.map((local) => (
                      <CommandItem
                        key={`existing-${local}`}
                        value={local}
                        onSelect={() => {
                          onChange(local);
                          setOpen(false);
                        }}
                        className="flex items-center gap-2 p-3"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === local ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{local}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {/* Hospitais do Brasil */}
                <CommandGroup heading="Hospitais e Unidades de Saúde">
                  {filteredHospitais.map((hospital) => (
                    <CommandItem
                      key={hospital.nome}
                      value={hospital.nome}
                      onSelect={() => handleSelect(hospital)}
                      className="flex items-center gap-2 p-3"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === hospital.nome ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{hospital.nome}</span>
                          <Badge className={getTipoColor(hospital.tipo)} variant="secondary">
                            {hospital.tipo}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500">
                          {hospital.cidade} - {hospital.estado}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Button
          type="button"
          variant="outline"
          className="h-12 px-4 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-300"
          onClick={() => setShowCustomInput(true)}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {selectedHospital && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Building2 className="h-4 w-4 text-blue-600" />
          <span className="text-sm text-blue-800">
            <strong>{selectedHospital.tipo}</strong> em {selectedHospital.cidade} - {selectedHospital.estado}
          </span>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
}