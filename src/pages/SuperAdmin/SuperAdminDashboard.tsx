import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Store, Users, DollarSign, TrendingUp, Plus, Edit3, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { faker } from '@faker-js/faker';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: 'admin' | 'caixa';
  loja: string;
  status: 'ativo' | 'inativo';
}

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: '1',
      nome: 'João Silva',
      email: 'joao@loja1.com',
      role: 'admin',
      loja: 'Loja Centro',
      status: 'ativo'
    },
    {
      id: '2',
      nome: 'Maria Santos',
      email: 'maria@loja1.com',
      role: 'caixa',
      loja: 'Loja Centro',
      status: 'ativo'
    },
    {
      id: '3',
      nome: 'Pedro Costa',
      email: 'pedro@loja2.com',
      role: 'admin',
      loja: 'Loja Shopping',
      status: 'ativo'
    },
    {
      id: '4',
      nome: 'Ana Lima',
      email: 'ana@loja2.com',
      role: 'caixa',
      loja: 'Loja Shopping',
      status: 'inativo'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  const toggleStatus = (userId: string) => {
    setUsuarios(usuarios.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'ativo' ? 'inativo' : 'ativo' }
        : user
    ));
    toast.success('Status atualizado!');
  };

  const excluirUsuario = (userId: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsuarios(usuarios.filter(user => user.id !== userId));
      toast.success('Usuário excluído!');
    }
  };

  const editarUsuario = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
    setShowModal(true);
  };

  const novoUsuario = () => {
    setUsuarioEditando(null);
    setShowModal(true);
  };

  return (
    <Layout title="Super Admin Dashboard">
      <div className="space-y-6">
        {/* Métricas da Rede */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: 'Lojas Ativas', 
              value: '8', 
              icon: Store, 
              color: 'blue',
              description: 'Em funcionamento'
            },
            { 
              title: 'Total de Vendas', 
              value: 'R$ 245.8K', 
              icon: DollarSign, 
              color: 'green',
              description: 'Este mês'
            },
            { 
              title: 'Usuários Ativos', 
              value: '127', 
              icon: Users, 
              color: 'purple',
              description: 'Administradores e caixas'
            },
            { 
              title: 'Crescimento', 
              value: '+18.5%', 
              icon: TrendingUp, 
              color: 'orange',
              description: 'vs mês anterior'
            }
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
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
                <div className={`p-3 rounded-xl bg-${metric.color}-100`}>
                  <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navegação Rápida */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('/superadmin/conexoes')}
              className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all text-left"
            >
              <h4 className="font-semibold">Gerenciar Conexões WhatsApp</h4>
              <p className="text-sm opacity-90">Configurar e monitorar conexões</p>
            </button>
            
            <button
              onClick={novoUsuario}
              className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all text-left"
            >
              <h4 className="font-semibold">Cadastrar Novo Usuário</h4>
              <p className="text-sm opacity-90">Adicionar Admin ou Caixa</p>
            </button>
          </div>
        </motion.div>

        {/* Gestão de Usuários */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Gerenciamento de Usuários</h3>
            <button
              onClick={novoUsuario}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Usuário
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Nome</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Perfil</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Loja</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{usuario.nome}</td>
                    <td className="py-3 px-4">{usuario.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        usuario.role === 'admin' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {usuario.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">{usuario.loja}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleStatus(usuario.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          usuario.status === 'ativo'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {usuario.status}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => editarUsuario(usuario)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => excluirUsuario(usuario.id)}
                          className="p-1 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Modal de Usuário */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">
                {usuarioEditando ? 'Editar Usuário' : 'Novo Usuário'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    defaultValue={usuarioEditando?.nome || ''}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={usuarioEditando?.email || ''}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Perfil</label>
                  <select
                    defaultValue={usuarioEditando?.role || ''}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    <option value="admin">Admin</option>
                    <option value="caixa">Caixa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loja</label>
                  <select
                    defaultValue={usuarioEditando?.loja || ''}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    <option value="Loja Centro">Loja Centro</option>
                    <option value="Loja Shopping">Loja Shopping</option>
                    <option value="Loja Norte">Loja Norte</option>
                    <option value="Loja Sul">Loja Sul</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      toast.success(usuarioEditando ? 'Usuário atualizado!' : 'Usuário criado!');
                      setShowModal(false);
                    }}
                    className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    {usuarioEditando ? 'Atualizar' : 'Criar'}
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
