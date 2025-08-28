import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Smartphone, QrCode, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Conexao {
  id: string;
  nome: string;
  numero: string;
  status: 'conectado' | 'desconectado' | 'conectando';
  ultimaAtividade: string;
  loja: string;
}

export default function ConexoesPage() {
  const [conexoes, setConexoes] = useState<Conexao[]>([
    {
      id: '1',
      nome: 'WhatsApp Loja Centro',
      numero: '+55 11 99999-9999',
      status: 'conectado',
      ultimaAtividade: '2 min atrás',
      loja: 'Loja Centro'
    },
    {
      id: '2',
      nome: 'WhatsApp Loja Shopping',
      numero: '+55 11 88888-8888',
      status: 'conectado',
      ultimaAtividade: '5 min atrás',
      loja: 'Loja Shopping'
    },
    {
      id: '3',
      nome: 'WhatsApp Loja Norte',
      numero: '+55 11 77777-7777',
      status: 'desconectado',
      ultimaAtividade: '2 horas atrás',
      loja: 'Loja Norte'
    }
  ]);

  const [showQRModal, setShowQRModal] = useState(false);
  const [conexaoSelecionada, setConexaoSelecionada] = useState<Conexao | null>(null);

  const gerarQRCode = (conexao: Conexao) => {
    setConexaoSelecionada(conexao);
    setShowQRModal(true);
  };

  const reconectar = (id: string) => {
    setConexoes(conexoes.map(conn =>
      conn.id === id
        ? { ...conn, status: 'conectando' }
        : conn
    ));

    // Simular reconexão
    setTimeout(() => {
      setConexoes(conexoes.map(conn =>
        conn.id === id
          ? { ...conn, status: 'conectado', ultimaAtividade: 'agora' }
          : conn
      ));
      toast.success('Conexão restabelecida!');
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'conectado': return 'text-green-600';
      case 'desconectado': return 'text-red-600';
      case 'conectando': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'conectado': return CheckCircle;
      case 'desconectado': return XCircle;
      case 'conectando': return RefreshCw;
      default: return XCircle;
    }
  };

  return (
    <Layout title="Conexões WhatsApp" showBackButton backTo="/superadmin">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <Smartphone className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Gerenciar Conexões WhatsApp</h2>
              <p className="text-gray-600">Monitore e configure as conexões das lojas</p>
            </div>
          </div>
        </motion.div>

        {/* Status Geral */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Conectadas', value: conexoes.filter(c => c.status === 'conectado').length, color: 'green' },
            { label: 'Desconectadas', value: conexoes.filter(c => c.status === 'desconectado').length, color: 'red' },
            { label: 'Total', value: conexoes.length, color: 'blue' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
            >
              <div className="text-center">
                <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lista de Conexões */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Conexões Ativas</h3>
          
          <div className="space-y-4">
            {conexoes.map((conexao) => {
              const StatusIcon = getStatusIcon(conexao.status);
              
              return (
                <div
                  key={conexao.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-100 rounded-xl">
                      <Smartphone className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{conexao.nome}</h4>
                      <p className="text-sm text-gray-600">{conexao.numero}</p>
                      <p className="text-xs text-gray-500">{conexao.loja}</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className={`flex items-center justify-center space-x-2 ${getStatusColor(conexao.status)}`}>
                      <StatusIcon className={`h-5 w-5 ${conexao.status === 'conectando' ? 'animate-spin' : ''}`} />
                      <span className="font-medium capitalize">{conexao.status}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{conexao.ultimaAtividade}</p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => gerarQRCode(conexao)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                      title="Gerar QR Code"
                    >
                      <QrCode className="h-4 w-4" />
                    </button>
                    
                    {conexao.status === 'desconectado' && (
                      <button
                        onClick={() => reconectar(conexao.id)}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                        title="Reconectar"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Modal QR Code */}
        {showQRModal && conexaoSelecionada && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Conectar WhatsApp</h3>
              <p className="text-gray-600 mb-4">{conexaoSelecionada.nome}</p>
              
              {/* QR Code Simulado */}
              <div className="bg-gray-100 p-8 rounded-xl text-center mb-6">
                <div className="w-48 h-48 mx-auto bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="h-24 w-24 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">QR Code para conexão</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p>1. Abra o WhatsApp no seu celular</p>
                <p>2. Toque em Menu &gt; Dispositivos conectados</p>
                <p>3. Toque em "Conectar um dispositivo"</p>
                <p>4. Aponte seu celular para esta tela</p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowQRModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    toast.success('QR Code atualizado!');
                  }}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Atualizar QR
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
