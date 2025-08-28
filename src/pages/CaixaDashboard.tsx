import React from 'react';
import { DollarSign, TrendingUp, ShoppingCart, Clock } from 'lucide-react';
import { useData } from '../contexts/DataContext';

function CaixaDashboard() {
  const { sales, cashStatus } = useData();

  const todaySales = sales.length;
  const todayRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const averageTicket = todaySales > 0 ? todayRevenue / todaySales : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Caixa</h1>
        <p className="text-gray-600">Acompanhe suas vendas do dia</p>
      </div>

      {/* Status do Caixa */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Status do Caixa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Status</p>
            <p className={`text-lg font-semibold ${cashStatus.isOpen ? 'text-green-600' : 'text-red-600'}`}>
              {cashStatus.isOpen ? 'Aberto' : 'Fechado'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Valor de Abertura</p>
            <p className="text-lg font-semibold text-gray-900">
              R$ {cashStatus.openingAmount.toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Valor Atual</p>
            <p className="text-lg font-semibold text-gray-900">
              R$ {cashStatus.currentAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vendas Hoje</p>
              <p className="text-3xl font-bold text-gray-900">{todaySales}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Faturamento</p>
              <p className="text-3xl font-bold text-gray-900">
                R$ {todayRevenue.toFixed(2)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
              <p className="text-3xl font-bold text-gray-900">
                R$ {averageTicket.toFixed(2)}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tempo Ativo</p>
              <p className="text-3xl font-bold text-gray-900">8h 30m</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Últimas Vendas */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Últimas Vendas</h2>
        </div>
        <div className="p-6">
          {sales.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nenhuma venda realizada hoje</p>
          ) : (
            <div className="space-y-4">
              {sales.slice(-5).reverse().map((sale) => (
                <div key={sale.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Venda #{sale.id.slice(0, 8)}</p>
                    <p className="text-sm text-gray-500">
                      {sale.date.toLocaleTimeString('pt-BR')} - {sale.paymentMethod}
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    R$ {sale.total.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CaixaDashboard;
