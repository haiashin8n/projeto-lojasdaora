import React from 'react';
import { MessageSquare, QrCode, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Connection {
  id: string;
  name: string;
  phone: string;
  status: 'connected' | 'disconnected';
  lastActivity: string;
}

function ConexoesPage() {
  const connections: Connection[] = [
    {
      id: '1',
      name: 'WhatsApp Loja Principal',
      phone: '+55 11 99999-0001',
      status: 'connected',
      lastActivity: '2 minutos atrás'
    },
    {
      id: '2',
      name: 'WhatsApp Marketing',
      phone: '+55 11 99999-0002',
      status: 'connected',
      lastActivity: '15 minutos atrás'
    },
    {
      id: '3',
      name: 'WhatsApp Suporte',
      phone: '+55 11 99999-0003',
      status: 'disconnected',
      lastActivity: '2 horas atrás'
    },
    {
      id: '4',
      name: 'WhatsApp Vendas',
      phone: '+55 11 99999-0004',
      status: 'connected',
      lastActivity: '5 minutos atrás'
    }
  ];

  const generateQRCode = (connectionName: string) => {
    toast.success(`QR Code gerado para ${connectionName}!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Conexões WhatsApp</h1>
        <p className="text-gray-600">Gerencie suas conexões de WhatsApp para automação</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => (
          <div
            key={connection.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{connection.name}</h3>
                  <p className="text-sm text-gray-600">{connection.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                {connection.status === 'connected' ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
            </div>

            <div className="mb-4">
              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                connection.status === 'connected'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {connection.status === 'connected' ? 'Conectado' : 'Desconectado'}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Última atividade: {connection.lastActivity}
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => generateQRCode(connection.name)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <QrCode className="h-4 w-4" />
                <span>Gerar QR Code</span>
              </button>
              
              {connection.status === 'disconnected' && (
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                  Reconectar
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Card para adicionar nova conexão */}
        <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-dashed border-orange-300 hover:border-orange-400 transition-colors cursor-pointer">
          <div className="text-center">
            <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Nova Conexão</h3>
            <p className="text-sm text-gray-600 mb-4">
              Adicione uma nova conexão WhatsApp
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors">
              Adicionar
            </button>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Estatísticas de Conexões</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">
              {connections.filter(c => c.status === 'connected').length}
            </p>
            <p className="text-sm text-gray-600">Conectadas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">
              {connections.filter(c => c.status === 'disconnected').length}
            </p>
            <p className="text-sm text-gray-600">Desconectadas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">2.5k</p>
            <p className="text-sm text-gray-600">Mensagens Enviadas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">98%</p>
            <p className="text-sm text-gray-600">Taxa de Entrega</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConexoesPage;
