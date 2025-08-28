import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, Edit3, Trash2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  imagem: string;
  estoque: number;
  descricao: string;
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([
    {
      id: '1',
      nome: 'Tênis Nike Air Max',
      preco: 299.99,
      categoria: 'Calçados',
      imagem: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300',
      estoque: 5,
      descricao: 'Tênis esportivo de alta qualidade'
    },
    {
      id: '2',
      nome: 'Smartphone Samsung',
      preco: 899.99,
      categoria: 'Eletrônicos',
      imagem: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
      estoque: 3,
      descricao: 'Smartphone Android com 128GB'
    },
    {
      id: '3',
      nome: 'Camiseta Polo',
      preco: 79.99,
      categoria: 'Roupas',
      imagem: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
      estoque: 10,
      descricao: 'Camiseta polo 100% algodão'
    }
  ]);

  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [busca, setBusca] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  const categorias = Array.from(new Set(produtos.map(p => p.categoria)));

  const produtosFiltrados = produtos.filter(produto => {
    const matchBusca = produto.nome.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = !filtroCategoria || produto.categoria === filtroCategoria;
    return matchBusca && matchCategoria;
  });

  const excluirProduto = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(produtos.filter(p => p.id !== id));
      toast.success('Produto excluído com sucesso!');
    }
  };

  const editarProduto = (produto: Produto) => {
    setProdutoEditando(produto);
    setShowModal(true);
  };

  const novoProduto = () => {
    setProdutoEditando(null);
    setShowModal(true);
  };

  return (
    <Layout title="Gerenciar Produtos" showBackButton backTo="/admin">
      <div className="space-y-6">
        {/* Header e Filtros */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Produtos</h2>
              <p className="text-gray-600">Gerencie o catálogo de produtos</p>
            </div>
            <button
              onClick={novoProduto}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Todas as categorias</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtosFiltrados.map((produto, index) => (
            <motion.div
              key={produto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-orange-200 hover:shadow-lg transition-shadow"
            >
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{produto.nome}</h3>
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    {produto.categoria}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{produto.descricao}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-bold text-green-600">
                    R$ {produto.preco.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Estoque: {produto.estoque}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => editarProduto(produto)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Editar
                  </button>
                  <button
                    onClick={() => excluirProduto(produto.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {produtosFiltrados.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>Nenhum produto encontrado</p>
          </div>
        )}

        {/* Modal de Produto */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">
                {produtoEditando ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    defaultValue={produtoEditando?.nome || ''}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preço</label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={produtoEditando?.preco || ''}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <input
                    type="text"
                    defaultValue={produtoEditando?.categoria || ''}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estoque</label>
                  <input
                    type="number"
                    defaultValue={produtoEditando?.estoque || ''}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                  <textarea
                    defaultValue={produtoEditando?.descricao || ''}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem</label>
                  <input
                    type="url"
                    defaultValue={produtoEditando?.imagem || ''}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
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
                      toast.success(produtoEditando ? 'Produto atualizado!' : 'Produto criado!');
                      setShowModal(false);
                    }}
                    className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    {produtoEditando ? 'Atualizar' : 'Criar'}
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
