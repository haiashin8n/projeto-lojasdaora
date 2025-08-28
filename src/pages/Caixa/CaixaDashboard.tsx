import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { DollarSign, TrendingUp, ShoppingCart, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function CaixaDashboard() {
  const navigate = useNavigate();
  const [caixaAberto, setCaixaAberto] = useState(false);
  const [valorAbertura, setValorAbertura] = useState('');
  const [showAbrirCaixa, setShowAbrirCaixa] = useState(false);
  const [showFecharCaixa, setShowFecharCaixa] = useState(false);
  const [showSangria, setShowSangria] = useState(false);
  const [valorSangria, setValorSangria] = useState('');
  const [motivoSangria, setMotivoSangria] = useState('');

  const handleAbrirCaixa = () => {
    if (!valorAbertura) {
      toast.error('Informe o valor de abertura do caixa');
      return;
    }
    setCaixaAberto(true);
    setShowAbrirCaixa(false);
    toast.success(`Caixa aberto com R$ ${valorAbertura}`);
  };

  const handleFecharCaixa = () => {
    setCaixaAberto(false);
    setShowFecharCaixa(false);
    toast.success('Caixa fechado com sucesso!');
  };

  const handleSangria = () => {
    if (!valorSangria || !motivoSangria) {
      toast.error('Preencha todos os campos da sangria');
      return;
    }
    setShowSangria(false);
    toast.success(`Sangria de R$ ${valorSangria} realizada`);
    setValorSangria('');
    setMotivoSangria('');
  };

  return (
    <Layout title="Dashboard do Caixa">
      <div className="space-y-6">
        {/* Status do Caixa */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Status do Caixa</h2>
              <p className={`text-sm ${caixaAberto ? 'text-green-600' : 'text-red-600'}`}>
                {caixaAberto ? 'Caixa Aberto' : 'Caixa Fechado'}
              </p>
            </div>
            <div className="flex space-x-2">
              {!caixaAberto ? (
                <button
                  onClick={() => setShowAbrirCaixa(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Abrir Caixa
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowSangria(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Sangria
                  </button>
                  <button
                    onClick={() => setShowFecharCaixa(true)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Fechar Caixa
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Vendas Hoje', value: 'R$ 2.450,00', icon: DollarSign, color: 'green' },
            { title: 'Transações', value: '23', icon: ShoppingCart, color: 'blue' },
            { title: 'Ticket Médio', value: 'R$ 106,52', icon: TrendingUp, color: 'purple' },
            { title: 'Crediários', value: '5', icon: AlertCircle, color: 'orange' }
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
                </div>
                <div className={`p-3 rounded-xl bg-${metric.color}-100`}>
                  <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ações Rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/caixa/vendas')}
              disabled={!caixaAberto}
              className={`p-4 rounded-xl text-left transition-all ${
                caixaAberto
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <h3 className="font-semibold">Nova Venda</h3>
              <p className="text-sm opacity-90">Registrar nova venda no PDV</p>
            </button>
            
            <button
              disabled={!caixaAberto}
              className={`p-4 rounded-xl text-left transition-all ${
                caixaAberto
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <h3 className="font-semibold">Consultar Estoque</h3>
              <p className="text-sm opacity-90">Verificar disponibilidade</p>
            </button>
          </div>
        </motion.div>

        {/* Modal Abrir Caixa */}
        {showAbrirCaixa && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Abrir Caixa</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor de Abertura
                  </label>
                  <input
                    type="number"
                    value={valorAbertura}
                    onChange={(e) => setValorAbertura(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0,00"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAbrirCaixa(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAbrirCaixa}
                    className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Abrir Caixa
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Fechar Caixa */}
        {showFecharCaixa && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Fechar Caixa</h3>
              <p className="text-gray-600 mb-4">
                Tem certeza que deseja fechar o caixa? Esta ação não pode ser desfeita.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowFecharCaixa(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleFecharCaixa}
                  className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Fechar Caixa
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Sangria */}
        {showSangria && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">Fazer Sangria</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valor da Sangria
                  </label>
                  <input
                    type="number"
                    value={valorSangria}
                    onChange={(e) => setValorSangria(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motivo
                  </label>
                  <input
                    type="text"
                    value={motivoSangria}
                    onChange={(e) => setMotivoSangria(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ex: Troco, Despesas..."
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowSangria(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSangria}
                    className="flex-1 bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Confirmar Sangria
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
