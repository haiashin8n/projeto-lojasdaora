import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { BarChart3, TrendingUp, Download, Calendar, DollarSign, Users, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { faker } from '@faker-js/faker';

export default function RelatoriosPage() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('7dias');

  // Dados fictícios para relatórios
  const vendasPorDia = [
    { dia: 'Seg', vendas: faker.number.int({ min: 2000, max: 5000 }) },
    { dia: 'Ter', vendas: faker.number.int({ min: 2000, max: 5000 }) },
    { dia: 'Qua', vendas: faker.number.int({ min: 2000, max: 5000 }) },
    { dia: 'Qui', vendas: faker.number.int({ min: 2000, max: 5000 }) },
    { dia: 'Sex', vendas: faker.number.int({ min: 2000, max: 5000 }) },
    { dia: 'Sáb', vendas: faker.number.int({ min: 3000, max: 6000 }) },
    { dia: 'Dom', vendas: faker.number.int({ min: 1000, max: 3000 }) }
  ];

  const vendedores = [
    { nome: 'João Silva', vendas: faker.number.int({ min: 15000, max: 25000 }) },
    { nome: 'Maria Santos', vendas: faker.number.int({ min: 12000, max: 22000 }) },
    { nome: 'Pedro Costa', vendas: faker.number.int({ min: 10000, max: 20000 }) },
    { nome: 'Ana Lima', vendas: faker.number.int({ min: 18000, max: 28000 }) }
  ];

  const categorias = [
    { name: 'Eletrônicos', value: 35, color: '#f59e0b' },
    { name: 'Roupas', value: 28, color: '#10b981' },
    { name: 'Calçados', value: 22, color: '#3b82f6' },
    { name: 'Acessórios', value: 15, color: '#8b5cf6' }
  ];

  const formasPagamento = [
    { forma: 'PIX', quantidade: 45, valor: 18750 },
    { forma: 'Cartão', quantidade: 38, valor: 22400 },
    { forma: 'Dinheiro', quantidade: 22, valor: 8800 },
    { forma: 'Crediário', quantidade: 15, valor: 12500 }
  ];

  const exportarRelatorio = (tipo: string) => {
    // Simular exportação
    const arquivo = `relatorio_${tipo}_${new Date().toISOString().split('T')[0]}.pdf`;
    alert(`Exportando ${arquivo}...`);
  };

  return (
    <Layout title="Relatórios" showBackButton backTo="/admin">
      <div className="space-y-6">
        {/* Header com Filtros */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Relatórios Gerenciais</h2>
                <p className="text-gray-600">Análise detalhada do desempenho da loja</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={periodoSelecionado}
                onChange={(e) => setPeriodoSelecionado(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="7dias">Últimos 7 dias</option>
                <option value="30dias">Últimos 30 dias</option>
                <option value="3meses">Últimos 3 meses</option>
                <option value="6meses">Últimos 6 meses</option>
                <option value="1ano">Último ano</option>
              </select>
              
              <button
                onClick={() => exportarRelatorio('geral')}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </button>
            </div>
          </div>
        </motion.div>

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: 'Faturamento Total', 
              value: 'R$ 87.450,00', 
              icon: DollarSign, 
              color: 'green',
              change: '+15.3%',
              changeType: 'positive'
            },
            { 
              title: 'Vendas Realizadas', 
              value: '342', 
              icon: ShoppingCart, 
              color: 'blue',
              change: '+8.7%',
              changeType: 'positive'
            },
            { 
              title: 'Novos Clientes', 
              value: '78', 
              icon: Users, 
              color: 'purple',
              change: '+22.1%',
              changeType: 'positive'
            },
            { 
              title: 'Ticket Médio', 
              value: 'R$ 255,70', 
              icon: TrendingUp, 
              color: 'orange',
              change: '-2.4%',
              changeType: 'negative'
            }
          ].map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <p className={`text-sm ${kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change} vs período anterior
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-${kpi.color}-100`}>
                  <kpi.icon className={`h-6 w-6 text-${kpi.color}-600`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vendas por Dia */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Vendas por Dia</h3>
              <button
                onClick={() => exportarRelatorio('vendas_diarias')}
                className="text-gray-500 hover:text-gray-700"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendasPorDia}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, 'Vendas']} />
                <Bar dataKey="vendas" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Performance por Vendedor */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Performance por Vendedor</h3>
              <button
                onClick={() => exportarRelatorio('vendedores')}
                className="text-gray-500 hover:text-gray-700"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendedores} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="nome" type="category" width={80} />
                <Tooltip formatter={(value) => [`R$ ${value}`, 'Vendas']} />
                <Bar dataKey="vendas" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vendas por Categoria */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Vendas por Categoria (%)</h3>
              <button
                onClick={() => exportarRelatorio('categorias')}
                className="text-gray-500 hover:text-gray-700"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center">
              <ResponsiveContainer width="60%" height={250}>
                <PieChart>
                  <Pie
                    data={categorias}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {categorias.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Participação']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {categorias.map((categoria, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: categoria.color }}
                    />
                    <span className="text-sm text-gray-700">{categoria.name}</span>
                    <span className="text-sm font-semibold text-gray-900">{categoria.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Formas de Pagamento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Formas de Pagamento</h3>
              <button
                onClick={() => exportarRelatorio('pagamentos')}
                className="text-gray-500 hover:text-gray-700"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {formasPagamento.map((forma, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    <span className="font-medium text-gray-900">{forma.forma}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">R$ {forma.valor.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{forma.quantidade} transações</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Resumo Financeiro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Resumo Financeiro - {periodoSelecionado}</h3>
            <button
              onClick={() => exportarRelatorio('financeiro')}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar Financeiro
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <h4 className="text-lg font-semibold text-green-700 mb-2">Total de Entradas</h4>
              <p className="text-3xl font-bold text-green-800">R$ 87.450,00</p>
              <p className="text-sm text-green-600 mt-1">342 transações</p>
            </div>
            
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <h4 className="text-lg font-semibold text-red-700 mb-2">Total de Saídas</h4>
              <p className="text-3xl font-bold text-red-800">R$ 23.680,00</p>
              <p className="text-sm text-red-600 mt-1">45 transações</p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <h4 className="text-lg font-semibold text-blue-700 mb-2">Lucro Líquido</h4>
              <p className="text-3xl font-bold text-blue-800">R$ 63.770,00</p>
              <p className="text-sm text-blue-600 mt-1">Margem: 72.9%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
