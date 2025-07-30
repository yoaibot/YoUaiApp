import React, { useState, useEffect } from 'react';
import { Users, Home, Heart, Briefcase, FileText, TrendingUp, Download, Filter, Eye, MapPin, Map, AlertTriangle, Navigation, AlertCircle } from 'lucide-react';

// Mock de dados - em produção, buscar da API
const mockDamageReport = {
  totalAffected: 1247,
  materialDamage: {
    homeLoss: 423,
    furnitureLoss: 892,
    vehicleLoss: 234,
    workEquipmentLoss: 567,
    forcedMove: 981
  },
  healthDamage: {
    physical: 234,
    respiratory: 456,
    emotional: 789,
    inTreatment: 345
  },
  economicDamage: {
    jobLoss: 678,
    cannotWork: 456,
    productionLoss: 234
  },
  familyImpact: {
    totalDeaths: 23,
    totalDisappeared: 5,
    averageFamilySizeBefore: 4.2,
    averageFamilySizeAfter: 3.8
  }
};

const mockRecentRegistrations = [
  { id: 1, uniqueId: 'BRU2024X1A2B3', name: 'Maria Silva', protocol: 'BRU2024A1', date: '2024-01-15', completeness: 100, status: 'approved', location: { lat: -20.1234, lng: -44.1234 }, neighborhood: 'Córrego do Feijão' },
  { id: 2, uniqueId: 'BRU2024Y4C5D6', name: 'João Santos', protocol: 'BRU2024A2', date: '2024-01-15', completeness: 85, status: 'in_review', location: { lat: -20.1334, lng: -44.1334 }, neighborhood: 'Parque da Cachoeira' },
  { id: 3, uniqueId: 'BRU2024Z7E8F9', name: 'Ana Costa', protocol: 'BRU2024A3', date: '2024-01-15', completeness: 92, status: 'pending_analysis', location: { lat: -20.1434, lng: -44.1434 }, neighborhood: 'Centro' },
  { id: 4, uniqueId: 'BRU2024W1G2H3', name: 'Pedro Oliveira', protocol: 'BRU2024A4', date: '2024-01-14', completeness: 78, status: 'requires_documentation', location: { lat: -20.1534, lng: -44.1534 }, neighborhood: 'Tejuco' },
  { id: 5, uniqueId: 'BRU2024V4I5J6', name: 'Lucia Ferreira', protocol: 'BRU2024A5', date: '2024-01-14', completeness: 100, status: 'approved', location: { lat: -20.1234, lng: -44.1234 }, neighborhood: 'Córrego do Feijão' }
];

// Dados do mapa de calor por região
const heatMapData = {
  'Córrego do Feijão': { total: 456, approved: 234, pending: 122, documentation: 100, severity: 'critical' },
  'Parque da Cachoeira': { total: 234, approved: 123, pending: 67, documentation: 44, severity: 'high' },
  'Centro': { total: 189, approved: 145, pending: 34, documentation: 10, severity: 'medium' },
  'Tejuco': { total: 167, approved: 89, pending: 45, documentation: 33, severity: 'high' },
  'Casa Branca': { total: 134, approved: 78, pending: 34, documentation: 22, severity: 'medium' },
  'Alberto Flores': { total: 67, approved: 45, pending: 12, documentation: 10, severity: 'low' }
};

// Componente de Card de Estatística
const StatCard = ({ title, value, icon: Icon, color = 'blue', percentage = null }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        {percentage && (
          <span className={`text-sm font-medium ${percentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {percentage > 0 ? '+' : ''}{percentage}%
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value.toLocaleString('pt-BR')}</p>
    </div>
  );
};

// Componente de Gráfico de Barras Simples
const SimpleBarChart = ({ data, title }) => {
  const maxValue = Math.max(...Object.values(data));
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className="font-medium">{value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente do Mapa de Calor
const HeatMap = ({ data, statusFilter, onRegionClick }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-400';
    }
  };
  
  const getFilteredCount = (region) => {
    if (statusFilter === 'all') return region.total;
    if (statusFilter === 'approved') return region.approved;
    if (statusFilter === 'pending_analysis') return region.pending;
    if (statusFilter === 'requires_documentation') return region.documentation;
    return 0;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Map className="w-5 h-5" />
        Mapa de Calor - Regiões Afetadas
      </h3>
      
      {/* Simulação de mapa visual */}
      <div className="relative h-96 bg-gray-100 rounded-lg mb-4 overflow-hidden">
        {/* Grid de regiões */}
        <div className="grid grid-cols-3 gap-2 p-4 h-full">
          {Object.entries(data).map(([region, info]) => {
            const count = getFilteredCount(info);
            const opacity = count > 0 ? Math.min(count / 200, 1) : 0.1;
            
            return (
              <button
                key={region}
                onClick={() => onRegionClick(region)}
                className={`relative rounded-lg p-4 transition-all hover:scale-105 cursor-pointer ${getSeverityColor(info.severity)}`}
                style={{ opacity: opacity }}
              >
                <div className="text-white">
                  <p className="font-bold text-sm">{region}</p>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-xs">cadastros</p>
                </div>
                {info.severity === 'critical' && (
                  <AlertTriangle className="absolute top-2 right-2 w-4 h-4 text-white animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
        
        {/* Legenda */}
        <div className="absolute bottom-4 left-4 bg-white/90 rounded p-2 text-xs">
          <p className="font-bold mb-1">Severidade:</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded"></div>
              <span>Crítica</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span>Alta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Média</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Baixa</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lista detalhada por região */}
      <div className="space-y-2">
        {Object.entries(data)
          .sort((a, b) => b[1].total - a[1].total)
          .map(([region, info]) => (
            <div key={region} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <MapPin className={`w-4 h-4 ${
                  info.severity === 'critical' ? 'text-red-600' :
                  info.severity === 'high' ? 'text-orange-500' :
                  info.severity === 'medium' ? 'text-yellow-500' :
                  'text-green-500'
                }`} />
                <div>
                  <p className="font-medium">{region}</p>
                  <p className="text-xs text-gray-600">
                    {info.approved} aprovados | {info.pending} pendentes | {info.documentation} doc. pendente
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{info.total}</p>
                <p className="text-xs text-gray-600">total</p>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

// Componente de Detalhes da Região
const RegionDetails = ({ region, data, onClose }) => {
  if (!region) return null;
  
  const regionData = data[region];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                {region}
              </h3>
              <p className="text-gray-600">Detalhes da região</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total de Cadastros</p>
              <p className="text-3xl font-bold text-blue-600">{regionData.total}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Aprovados</p>
              <p className="text-3xl font-bold text-green-600">{regionData.approved}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Em Análise</p>
              <p className="text-3xl font-bold text-yellow-600">{regionData.pending}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Documentação Pendente</p>
              <p className="text-3xl font-bold text-red-600">{regionData.documentation}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-bold mb-2">Ações Recomendadas</h4>
            {regionData.severity === 'critical' && (
              <div className="space-y-2">
                <p className="text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Região crítica - Enviar equipe com urgência
                </p>
                <p className="text-sm text-gray-600">
                  • Mobilizar equipe de assistentes sociais<br/>
                  • Preparar kits de documentação<br/>
                  • Agendar mutirão de atendimento
                </p>
              </div>
            )}
            {regionData.severity === 'high' && (
              <div className="space-y-2">
                <p className="text-orange-600">Alta prioridade - Agendar visita esta semana</p>
                <p className="text-sm text-gray-600">
                  • Verificar casos pendentes<br/>
                  • Coletar documentação faltante
                </p>
              </div>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente Principal do Dashboard
export default function AdminDashboard() {
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Calcular estatísticas
  const totalMaterialDamage = Object.values(mockDamageReport.materialDamage).reduce((a, b) => a + b, 0);
  const totalHealthDamage = Object.values(mockDamageReport.healthDamage).reduce((a, b) => a + b, 0);
  const totalEconomicDamage = Object.values(mockDamageReport.economicDamage).reduce((a, b) => a + b, 0);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'in_review': return 'text-yellow-600 bg-yellow-100';
      case 'pending_analysis': return 'text-blue-600 bg-blue-100';
      case 'requires_documentation': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Aprovado';
      case 'in_review': return 'Em análise';
      case 'pending_analysis': return 'Aguardando análise';
      case 'requires_documentation': return 'Documentação pendente';
      default: return status;
    }
  };
  
  const handleSendTeam = (region) => {
    alert(`Equipe será enviada para ${region}. Notificação enviada aos coordenadores de campo.`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
              <p className="text-sm text-gray-600">Sistema de Cadastro de Atingidos - Brumadinho</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="w-4 h-4" />
                Exportar Dados
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setSelectedView('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedView === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setSelectedView('map')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedView === 'map'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Mapa de Calor
            </button>
            <button
              onClick={() => setSelectedView('registrations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedView === 'registrations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Cadastros
            </button>
            <button
              onClick={() => setSelectedView('damage')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedView === 'damage'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Análise de Danos
            </button>
          </nav>
        </div>
      </div>
      
      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedView === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total de Atingidos"
                value={mockDamageReport.totalAffected}
                icon={Users}
                color="blue"
                percentage={12}
              />
              <StatCard
                title="Danos Materiais"
                value={totalMaterialDamage}
                icon={Home}
                color="red"
              />
              <StatCard
                title="Problemas de Saúde"
                value={totalHealthDamage}
                icon={Heart}
                color="purple"
              />
              <StatCard
                title="Impacto Econômico"
                value={totalEconomicDamage}
                icon={Briefcase}
                color="green"
              />
            </div>
            
            {/* Quick Actions */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Ações Urgentes Necessárias
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleSendTeam('Córrego do Feijão')}
                  className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 transition-all"
                >
                  <Navigation className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-medium">Enviar Equipe</p>
                  <p className="text-sm opacity-90">Córrego do Feijão (456 casos)</p>
                </button>
                <button className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 transition-all">
                  <FileText className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-medium">Gerar Relatório</p>
                  <p className="text-sm opacity-90">Casos críticos</p>
                </button>
                <button className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 transition-all">
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-medium">Convocar Mutirão</p>
                  <p className="text-sm opacity-90">Documentação pendente</p>
                </button>
              </div>
            </div>
            
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SimpleBarChart
                data={mockDamageReport.materialDamage}
                title="Danos Materiais Detalhados"
              />
              <SimpleBarChart
                data={mockDamageReport.healthDamage}
                title="Problemas de Saúde Reportados"
              />
            </div>
          </div>
        )}
        
        {selectedView === 'map' && (
          <div className="space-y-6">
            {/* Filtro de Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Filtrar por Status</h3>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos os cadastros</option>
                  <option value="approved">Aprovados</option>
                  <option value="pending_analysis">Aguardando análise</option>
                  <option value="requires_documentation">Documentação pendente</option>
                </select>
              </div>
            </div>
            
            {/* Mapa de Calor */}
            <HeatMap 
              data={heatMapData} 
              statusFilter={statusFilter}
              onRegionClick={setSelectedRegion}
            />
            
            {/* Resumo por Severidade */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Regiões Críticas</p>
                    <p className="text-2xl font-bold text-red-600">1</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Alta Prioridade</p>
                    <p className="text-2xl font-bold text-orange-600">2</p>
                  </div>
                  <MapPin className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Média Prioridade</p>
                    <p className="text-2xl font-bold text-yellow-600">2</p>
                  </div>
                  <Map className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Baixa Prioridade</p>
                    <p className="text-2xl font-bold text-green-600">1</p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {selectedView === 'registrations' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
                  <select 
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Todos</option>
                    <option value="today">Hoje</option>
                    <option value="week">Última Semana</option>
                    <option value="month">Último Mês</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Todos</option>
                    <option value="approved">Aprovados</option>
                    <option value="in_review">Em Análise</option>
                    <option value="pending_analysis">Aguardando</option>
                    <option value="requires_documentation">Doc. Pendente</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Registrations Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID Único
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Localização
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completude
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockRecentRegistrations.map((registration) => (
                    <tr key={registration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-900">{registration.uniqueId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{registration.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {registration.neighborhood}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{registration.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900 mr-2">{registration.completeness}%</div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${registration.completeness}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(registration.status)}`}>
                          {getStatusText(registration.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => setSelectedRegistration(registration)}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          Ver
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {selectedView === 'damage' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Material Damage Details */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Detalhamento de Perdas Materiais</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                    <span className="font-medium">Perda total de moradia</span>
                    <span className="text-2xl font-bold text-red-600">
                      {((mockDamageReport.materialDamage.homeLoss / mockDamageReport.totalAffected) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                    <span className="font-medium">Mudança forçada</span>
                    <span className="text-2xl font-bold text-orange-600">
                      {((mockDamageReport.materialDamage.forcedMove / mockDamageReport.totalAffected) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Economic Impact */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Impacto Econômico</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium">Perda de emprego/renda</span>
                    <span className="text-2xl font-bold text-green-600">
                      {((mockDamageReport.economicDamage.jobLoss / mockDamageReport.totalAffected) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium">Incapacidade de trabalhar</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {((mockDamageReport.economicDamage.cannotWork / mockDamageReport.totalAffected) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Critical Alerts */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6" />
                Alertas Críticos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Famílias sem moradia</p>
                  <p className="text-2xl font-bold text-red-600">{mockDamageReport.materialDamage.homeLoss}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Pessoas em tratamento de saúde</p>
                  <p className="text-2xl font-bold text-red-600">{mockDamageReport.healthDamage.inTreatment}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Famílias com perdas humanas</p>
                  <p className="text-2xl font-bold text-red-600">
                    {mockDamageReport.familyImpact.totalDeaths + mockDamageReport.familyImpact.totalDisappeared}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Modal de Detalhes do Cadastro */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Detalhes do Cadastro</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">ID Único</p>
                  <p className="font-medium font-mono text-lg">{selectedRegistration.uniqueId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nome</p>
                  <p className="font-medium">{selectedRegistration.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Protocolo</p>
                  <p className="font-medium font-mono">{selectedRegistration.protocol}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Localização</p>
                  <p className="font-medium flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedRegistration.neighborhood}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedRegistration.status)}`}>
                    {getStatusText(selectedRegistration.status)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de Detalhes da Região */}
      <RegionDetails 
        region={selectedRegion}
        data={heatMapData}
        onClose={() => setSelectedRegion(null)}
      />
    </div>
  );
}