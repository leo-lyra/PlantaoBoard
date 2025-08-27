"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Hospital, Building2, Stethoscope } from 'lucide-react';
import { usePlantao } from '@/contexts/PlantaoContext';
import dynamic from 'next/dynamic';
import type { LatLngExpression } from 'leaflet';

// Importação dinâmica para evitar problemas de SSR
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface LocalAgrupado {
  local: string;
  cidade?: string;
  estado?: string;
  latitude: number;
  longitude: number;
  tipoLocal?: string;
  plantoes: any[];
  totalRecebido: number;
  totalHoras: number;
}

export function MapaPlantoes() {
  const { plantoes } = usePlantao();
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    // Importar Leaflet apenas no cliente
    import('leaflet').then((leaflet) => {
      setL(leaflet.default);
      
      // Configurar ícones do Leaflet
      delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  // Filtrar plantões que têm coordenadas
  const plantoesComCoordenadas = plantoes.filter(
    plantao => plantao.latitude && plantao.longitude
  );

  // Agrupar plantões por local
  const locaisAgrupados = plantoesComCoordenadas.reduce((acc, plantao) => {
    const key = `${plantao.latitude}-${plantao.longitude}`;
    if (!acc[key]) {
      acc[key] = {
        local: plantao.local,
        cidade: plantao.cidade,
        estado: plantao.estado,
        latitude: plantao.latitude!,
        longitude: plantao.longitude!,
        tipoLocal: plantao.tipoLocal,
        plantoes: [],
        totalRecebido: 0,
        totalHoras: 0
      };
    }
    acc[key].plantoes.push(plantao);
    acc[key].totalRecebido += plantao.valorRecebido;
    acc[key].totalHoras += plantao.horasTrabalhadas;
    return acc;
  }, {} as Record<string, LocalAgrupado>);

  const locais = Object.values(locaisAgrupados);

  const getTipoColor = (tipo?: string) => {
    switch (tipo) {
      case 'Hospital': return 'bg-blue-100 text-blue-800';
      case 'UBS': return 'bg-green-100 text-green-800';
      case 'UPA': return 'bg-orange-100 text-orange-800';
      case 'Pronto Socorro': return 'bg-red-100 text-red-800';
      case 'Hospital Universitário': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo?: string) => {
    switch (tipo) {
      case 'Hospital': return Hospital;
      case 'UBS': return Building2;
      case 'UPA': return Stethoscope;
      case 'Pronto Socorro': return MapPin;
      case 'Hospital Universitário': return Hospital;
      default: return MapPin;
    }
  };

  // Centro do Brasil para visualização inicial
  const centerBrasil: LatLngExpression = [-14.2350, -51.9253];

  if (!isClient || !L) {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <MapPin className="h-5 w-5 text-blue-600" />
            Mapa dos Plantões
          </CardTitle>
          <p className="text-gray-600">Carregando mapa...</p>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-gray-500">Carregando mapa...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <MapPin className="h-5 w-5 text-blue-600" />
          Mapa dos Plantões
        </CardTitle>
        <p className="text-gray-600">
          Visualização geográfica dos locais onde você realizou plantões
        </p>
      </CardHeader>
      <CardContent>
        {locais.length === 0 ? (
          <div className="h-96 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
            <MapPin className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhum local mapeado
            </h3>
            <p className="text-gray-500 text-center">
              Cadastre plantões em hospitais da nossa base de dados para vê-los no mapa
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Mapa */}
            <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
              <MapContainer
                center={centerBrasil}
                zoom={4}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {locais.map((local: LocalAgrupado, index: number) => (
                  <Marker
                    key={index}
                    position={[local.latitude, local.longitude] as LatLngExpression}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <div className="flex items-center gap-2 mb-2">
                          {React.createElement(getTipoIcon(local.tipoLocal), {
                            className: "h-4 w-4 text-blue-600"
                          })}
                          <h3 className="font-semibold text-gray-900">
                            {local.local}
                          </h3>
                        </div>
                        
                        {local.tipoLocal && (
                          <Badge className={`${getTipoColor(local.tipoLocal)} mb-2`}>
                            {local.tipoLocal}
                          </Badge>
                        )}
                        
                        <div className="space-y-1 text-sm">
                          <p className="text-gray-600">
                            📍 {local.cidade} - {local.estado}
                          </p>
                          <p className="text-gray-600">
                            🏥 {local.plantoes.length} plantão(ões)
                          </p>
                          <p className="text-gray-600">
                            💰 R$ {local.totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                          <p className="text-gray-600">
                            ⏰ {local.totalHoras}h trabalhadas
                          </p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Lista de locais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locais.map((local: LocalAgrupado, index: number) => {
                const Icon = getTipoIcon(local.tipoLocal);
                return (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {local.local}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {local.cidade} - {local.estado}
                        </p>
                        
                        {local.tipoLocal && (
                          <Badge className={`${getTipoColor(local.tipoLocal)} mb-2`} variant="secondary">
                            {local.tipoLocal}
                          </Badge>
                        )}
                        
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>Plantões:</span>
                            <span className="font-medium">{local.plantoes.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total:</span>
                            <span className="font-medium text-emerald-600">
                              R$ {local.totalRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Horas:</span>
                            <span className="font-medium">{local.totalHoras}h</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}