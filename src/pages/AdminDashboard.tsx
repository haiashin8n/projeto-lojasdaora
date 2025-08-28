import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Users, MessageCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { toast } from 'sonner';

function AdminDashboard() {
  const { customers, creditPayments, sales } = useData();

  // Dados para gráficos
  const salesData = [
    { name: 'João', vendas: 32 },
    { name: 'Maria', vendas: 28 },
    { name: 'Carlos', vendas: 25 },
    { name: 'Ana', vendas: 22 },
    { name: 'Pedro', vendas: 18 }
  ];

  const cashFlowData = [
    { month: 'Jan', entradas: 45000, saidas: 32000 },
    { month: 'Fev', entradas: 52000, saidas: 38000 },
    { month: 'Mar', entradas: 48000, saidas: 35000 },
    { month: 'Abr', entradas: 61000, saidas: 42000 },
    { month: 'Mai', entradas: 55000, saidas: 39000 },
    { month: 'Jun', entradas: 67000, saidas: 45000 }
  ];

  const handleWhatsAppReminder = (customerName: string) => {
    toast.success(`Lembrete enviado via WhatsApp para ${customerName}!`);
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalCustomers = customers.length;
  const overduePayments = creditPayments.filter(p => p.status === 'vencido').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
        <p className="text-gray-600">Gestão completa da sua loja</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Faturamento</p>
              <p className="text-3xl font-bold text-gray-900">
                R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
              <p className="text-sm font-medium text-gray-600">Clientes</p>
              <p className="text-3xl font-bold text-gray-900">{totalCustomers}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vendas Hoje</p>
              <p className="text-3xl font-bold text-gray-900">{sales.length}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cobranças Vencidas</p>
              <p className="text-3xl font-bold text-gray-900">{overduePayments}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <MessageCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ranking de Vendas por Atendente</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="vendas" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fluxo de Caixa Mensal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="entradas" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="saidas" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status dos Crediários */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Status dos Crediários</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Vencido</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Próximo Vencimento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Futuro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {creditPayments.slice(0, 8).map((payment) => {
                const customer = customers.find(c => c.id === payment.customerId);
                const valorVencido = payment.status === 'vencido' ? payment.totalAmount - payment.paidAmount : 0;
                const valorFuturo = payment.totalAmount - payment.paidAmount;
                
                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {customer?.name || 'Cliente não encontrado'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      R$ {valorVencido.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.dueDate.toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      R$ {valorFuturo.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        payment.status === 'pago' ? 'bg-green-100 text-green-800' :
                        payment.status === 'vencido' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleWhatsAppReminder(customer?.name || 'Cliente')}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                        title="Enviar lembrete via WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
