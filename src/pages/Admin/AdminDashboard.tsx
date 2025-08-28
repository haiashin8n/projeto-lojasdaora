import React from 'react';
import Layout from '../../components/Layout';
import { TrendingUp, Users, DollarSign, ShoppingBag, Package, MessageSquare, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Dados fictícios para os gráficos
  const vendedoresData = [
    { name: 'João Silva', vendas: faker.number.int({ min: 50, max: 100 }) },
    { name: 'Maria Santos', vendas: faker.number.int({ min: 40, max: 90 }) },
    { name: 'Pedro Costa', vendas: faker.number.int({ min: 30, max: 80 }) },
    { name: 'Ana Lima', vendas: faker.number.int({ min: 60, max: 95 }) }
  ];

  const fluxoCaixaData = [
    { mes: 'Jan', entradas: 45000, saidas: 32000 },
    { mes: 'Fev', entradas: 52000, saidas: 38000 },
    { mes: 'Mar', entradas: 48000, saidas: 35000 },
    { mes: 'Abr', entradas: 61000, saidas: 42000 },
    { mes: 'Mai', entradas: 55000, saidas: 39000 },
    { mes: 'Jun', entradas: 67000, saidas: 45000 }
  ];

  const crediariosData = [
    { cliente: 'José Oliveira', vencido: 250.00, proximoVencimento: '15/01/2025', futuro: 750.00, status: 'Em Dia' },
    { cliente: 'Maria Silva', vencido: 120.50, proximoVencimento: '18/01/2025', futuro: 480.00, status: 'Atrasado' },
    { cliente: 'Carlos Santos', vencido: 0, proximoVencimento: '22/01/2025', futuro: 300.00, status: 'Em Dia' },
    { cliente: 'Ana Costa', vencido: 75.00, proximoVencimento: '10/01/2025', futuro: 225.00, status: 'Atrasado' }
  ];

  return (
    <Layout title="Dashboard Admin">
      <div className="space-y-6">
        {/* Navegação Superior */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-orange-200"
        >
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/admin/produtos')}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
            >
              <Package className="h-4 w-4 mr-2" />
              Gerenciar Produtos
            </button>
            <button
              onClick={() => navigate('/admin/marketing')}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Marketing WhatsApp
            </button>
            <button
              onClick={() => navigate('/admin/relatorios')}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Relatórios
            </button>
          </div>
        </motion.div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Vendas Hoje', value: 'R$ 4.850,00', icon: DollarSign, color: 'green', change: '+12%' },
            { title: 'Produtos Vendidos', value: '156', icon: ShoppingBag, color: 'blue', change: '+8%' },
            { title: 'Clientes Ativos', value: '89', icon: Users, color: 'purple', change: '+15%' },
            { title: 'Crediários Pendentes', value: '23', icon: TrendingUp, color: 'orange', change: '-5%' }
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change} vs ontem
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-${metric.color}-100`}>
                  <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Vendas por Vendedor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ranking de Vendas por Atendente</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendedoresData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vendas" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Gráfico de Fluxo de Caixa */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fluxo de Caixa Mensal</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={fluxoCaixaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="entradas" stroke="#10b981" strokeWidth={3} name="Entradas" />
                <Line type="monotone" dataKey="saidas" stroke="#ef4444" strokeWidth={3} name="Saídas" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Gestão de Crediário */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Controle de Crediário</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Cliente</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Valor Vencido</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Próximo Vencimento</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Valor Futuro</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Ação</th>
                </tr>
              </thead>
              <tbody>
                {crediariosData.map((crediario, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{crediario.cliente}</td>
                    <td className="py-3 px-4">
                      <span className={crediario.vencido > 0 ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                        R$ {crediario.vencido.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-4">{crediario.proximoVencimento}</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">R$ {crediario.futuro.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        crediario.status === 'Em Dia' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {crediario.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          // Simular envio de WhatsApp
                          const message = `Olá ${crediario.cliente}! Este é um lembrete sobre seu crediário na Loja DAORA. 
Próximo vencimento: ${crediario.proximoVencimento}
${crediario.vencido > 0 ? `Valor em atraso: R$ ${crediario.vencido.toFixed(2)}` : ''}
Entre em contato conosco para mais informações!`;
                          
                          navigator.clipboard.writeText(message);
                          alert(`Mensagem copiada para ${crediario.cliente}!\n\n${message}`);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                        title="Enviar lembrete via WhatsApp"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Relatório de Caixa Diário */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Caixa - Hoje</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Abertura</p>
              <p className="text-xl font-bold text-blue-700">R$ 200,00</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Entradas</p>
              <p className="text-xl font-bold text-green-700">R$ 4.850,00</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600 font-medium">Sangrias</p>
              <p className="text-xl font-bold text-red-700">R$ 150,00</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">Saldo Atual</p>
              <p className="text-xl font-bold text-purple-700">R$ 4.900,00</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
