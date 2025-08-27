"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, MapPin } from 'lucide-react';
import { usePlantao } from '@/contexts/PlantaoContext';

interface HospitalSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function HospitalSelector({ value, onChange, error }: HospitalSelectorProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customLocal, setCustomLocal] = useState('');
  const { getUniqueLocais } = usePlantao();

  const locaisExistentes = getUniqueLocais();

  const handleCustomSubmit = () => {
    if (customLocal.trim()) {
      onChange(customLocal.trim());
      setCustomLocal('');
      setShowCustomInput(false);
    }
  };

  if (showCustomInput) {
    return (
      <div className="space-y-3">
        <Label className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Novo Local
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
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="flex-1 h-12 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-colors">
            <SelectValue placeholder="Selecione ou crie um local..." />
          </SelectTrigger>
          <SelectContent>
            {locaisExistentes.length > 0 && (
              <>
                {locaisExistentes.map((local) => (
                  <SelectItem key={local} value={local}>
                    {local}
                  </SelectItem>
                ))}
              </>
            )}
            {locaisExistentes.length === 0 && (
              <SelectItem value="" disabled>
                Nenhum local cadastrado ainda
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          className="h-12 px-4 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-all duration-300"
          onClick={() => setShowCustomInput(true)}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
}