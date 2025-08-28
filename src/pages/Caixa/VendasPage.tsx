import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, Minus, ShoppingCart, CreditCard, DollarSign, Smartphone, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { faker } from '@faker-js/faker';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  imagem: string;
  estoque: number;
}

interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

interface Cliente {
  nome: string;
  cpf: string;
  telefone: string;
  limite: number;
}

export default function VendasPage() {
  const [produtos] = useState<Produto[]>([
    {
      id: '1',
      nome: 'Tênis Nike Air Max',
      preco: 299.99,
      categoria: 'Calçados',
      imagem: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300',
      estoque: 5
    },
    {
      id: '2',
      nome: 'Smartphone Samsung',
      preco: 899.99,
      categoria: 'Eletrônicos',
      imagem: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
      estoque: 3
    },
    {
      id: '3',
      nome: 'Camiseta Polo',
      preco: 79.99,
      categoria: 'Roupas',
      imagem: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
      estoque: 10
    },
    {
      id: '4',
      nome: 'Relógio Digital',
      preco: 199.99,
      categoria: 'Acessórios',
      imagem: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300',
      estoque: 7
    }
  ]);

  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [formaPagamento, setFormaPagamento] = useState<string>('');
  const [showCredarioModal, setShowCredarioModal] = useState(false);
  const [cliente, setCliente] = useState<Cliente>({ nome: '', cpf: '', telefone: '', limite: 0 });
  const [parcelas, setParcelas] = useState(1);
  const [valorEntrada, setValorEntrada] = useState(0);

  const adicionarAoCarrinho = (produto: Produto) => {
    const itemExistente = carrinho.find(item => item.produto.id === produto.id);
    if (itemExistente) {
      if (itemExistente.quantidade < produto.estoque) {
        setCarrinho(carrinho.map(item =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        ));
      } else {
        toast.error('Estoque insuficiente');
      }
    } else {
      setCarrinho([...carrinho, { produto, quantidade: 1 }]);
    }
  };

  const removerDoCarrinho = (produtoId: string) => {
    setCarrinho(carrinho.filter(item => item.produto.id !== produtoId));
  };

  const alterarQuantidade = (produtoId: string, quantidade: number) => {
    if (quantidade <= 0) {
      removerDoCarrinho(produtoId);
      return;
    }
    
    const produto = produtos.find(p => p.id === produtoId);
    if (produto && quantidade > produto.estoque) {
      toast.error('Estoque insuficiente');
      return;
    }

    setCarrinho(carrinho.map(item =>
      item.produto.id === produtoId
        ? { ...item, quantidade }
        : item
    ));
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0);
  };

  const finalizarVenda = () => {
    if (carrinho.length === 0) {
      toast.error('Adicione produtos ao carrinho');
      return;
    }

    if (!formaPagamento) {
      toast.error('Selecione a forma de pagamento');
      return;
    }

    if (formaPagamento === 'crediario') {
      setShowCredarioModal(true);
      return;
    }

    // Simular venda
    toast.success(`Venda finalizada! Total: R$ ${calcularTotal().toFixed(2)}`);
    setCarrinho([]);
    setFormaPagamento('');
  };

  const finalizarCrediario = () => {
    if (!cliente.nome || !cliente.cpf || !cliente.telefone) {
      toast.error('Preencha todos os dados do cliente');
      return;
    }

    const total = calcularTotal();
    const valorParcelado = total - valorEntrada;
    
    if (valorParcelado > cliente.limite) {
      toast.error(`Limite insuficiente. Limite: R$ ${cliente.limite.toFixed(2)}`);
      return;
    }

    const valorParcela = valorParcelado / parcelas;

    toast.success(
      `Crediário aprovado! 
      Entrada: R$ ${valorEntrada.toFixed(2)}
      ${parcelas}x de R$ ${valorParcela.toFixed(2)}`
    );

    setCarrinho([]);
    setFormaPagamento('');
    setShowCredarioModal(false);
    setCliente({ nome: '', cpf: '', telefone: '', limite: 0 });
    setParcelas(1);
    setValorEntrada(0);
  };

  const verificarLimite = () => {
    // Simular consulta de limite
    const limiteSimulado = faker.number.int({ min: 500, max: 2000 });
    setCliente({ ...cliente, limite: limiteSimulado });
    toast.success(`Limite encontrado: R$ ${limiteSimulado.toFixed(2)}`);
  };

  return (
    <Layout title="PDV - Vendas" showBackButton backTo="/caixa">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Produtos */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Produtos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {produtos.map((produto) => (
                <div key={produto.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-gray-900">{produto.nome}</h3>
                  <p className="text-sm text-gray-600">{produto.categoria}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-green-600">
                      R$ {produto.preco.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Estoque: {produto.estoque}</span>
                      <button
                        onClick={() => adicionarAoCarrinho(produto)}
                        className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Carrinho */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200 sticky top-24"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Carrinho ({carrinho.length})
            </h2>

            {carrinho.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Carrinho vazio</p>
            ) : (
              <div className="space-y-3">
                {carrinho.map((item) => (
                  <div key={item.produto.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.produto.nome}</h4>
                      <p className="text-green-600 font-semibold">R$ {item.produto.preco.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => alterarQuantidade(item.produto.id, item.quantidade - 1)}
                        className="p-1 text-gray-600 hover:text-red-600"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantidade}</span>
                      <button
                        onClick={() => alterarQuantidade(item.produto.id, item.quantidade + 1)}
                        className="p-1 text-gray-600 hover:text-green-600"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {carrinho.length > 0 && (
              <>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">R$ {calcularTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <h3 className="font-medium text-gray-900">Forma de Pagamento</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'pix', label: 'PIX', icon: Smartphone },
                      { id: 'dinheiro', label: 'Dinheiro', icon: DollarSign },
                      { id: 'cartao', label: 'Cartão', icon: CreditCard },
                      { id: 'crediario', label: 'Crediário', icon: Calendar }
                    ].map((forma) => (
                      <button
                        key={forma.id}
                        onClick={() => setFormaPagamento(forma.id)}
                        className={`p-3 rounded-lg border-2 flex flex-col items-center text-xs transition-all ${
                          formaPagamento === forma.id
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <forma.icon className="h-4 w-4 mb-1" />
                        {forma.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={finalizarVenda}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold mt-4"
                >
                  Finalizar Venda
                </button>
              </>
            )}
          </motion.div>
        </div>

        {/* Modal Crediário */}
        {showCredarioModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Dados do Cliente - Crediário</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={cliente.nome}
                    onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                  <input
                    type="text"
                    value={cliente.cpf}
                    onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="000.000.000-00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <input
                    type="text"
                    value={cliente.telefone}
                    onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <button
                  onClick={verificarLimite}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Consultar Limite
                </button>

                {cliente.limite > 0 && (
                  <>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-green-700 font-medium">
                        Limite disponível: R$ {cliente.limite.toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor de Entrada
                      </label>
                      <input
                        type="number"
                        value={valorEntrada}
                        onChange={(e) => setValorEntrada(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        min="0"
                        max={calcularTotal()}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Parcelas
                      </label>
                      <select
                        value={parcelas}
                        onChange={(e) => setParcelas(Number(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5, 6, 10, 12].map(num => (
                          <option key={num} value={num}>{num}x</option>
                        ))}
                      </select>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg space-y-1">
                      <p className="text-sm">
                        <strong>Total:</strong> R$ {calcularTotal().toFixed(2)}
                      </p>
                      <p className="text-sm">
                        <strong>Entrada:</strong> R$ {valorEntrada.toFixed(2)}
                      </p>
                      <p className="text-sm">
                        <strong>A parcelar:</strong> R$ {(calcularTotal() - valorEntrada).toFixed(2)}
                      </p>
                      <p className="text-sm">
                        <strong>Valor da parcela:</strong> R$ {((calcularTotal() - valorEntrada) / parcelas).toFixed(2)}
                      </p>
                    </div>
                  </>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowCredarioModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={finalizarCrediario}
                    disabled={cliente.limite === 0}
                    className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Confirmar Crediário
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
