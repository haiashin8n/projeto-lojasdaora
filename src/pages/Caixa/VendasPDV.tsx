import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { faker } from '@faker-js/faker';
import { Plus, Minus, ShoppingCart, CreditCard, Smartphone, DollarSign, Receipt } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CaixaStatus {
  isOpen: boolean;
  valorAbertura: number;
  valorAtual: number;
}

export function VendasPDV() {
  const [products] = useState<Product[]>(() => 
    Array.from({ length: 20 }, () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: parseFloat(faker.commerce.price({ min: 10, max: 500, dec: 2 })),
      category: faker.commerce.department(),
      image: `https://picsum.photos/200/200?random=${Math.random()}`
    }))
  );

  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'dinheiro' | 'cartao' | 'crediario'>('pix');
  const [showClientModal, setShowClientModal] = useState(false);
  const [showCaixaModal, setShowCaixaModal] = useState(false);
  const [caixaStatus, setCaixaStatus] = useState<CaixaStatus>({
    isOpen: false,
    valorAbertura: 0,
    valorAtual: 0
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const finalizeSale = () => {
    if (!caixaStatus.isOpen) {
      toast.error('Caixa precisa estar aberto para realizar vendas!');
      return;
    }

    if (cart.length === 0) {
      toast.error('Carrinho vazio!');
      return;
    }

    if (paymentMethod === 'crediario') {
      setShowClientModal(true);
      return;
    }

    // Simular venda
    setCaixaStatus(prev => ({
      ...prev,
      valorAtual: prev.valorAtual + total
    }));

    toast.success(`Venda finalizada! Total: R$ ${total.toFixed(2)}`);
    setCart([]);
  };

  const handleCaixaAction = (action: 'abrir' | 'fechar' | 'sangria', valor?: number) => {
    switch (action) {
      case 'abrir':
        if (valor !== undefined) {
          setCaixaStatus({
            isOpen: true,
            valorAbertura: valor,
            valorAtual: valor
          });
          toast.success('Caixa aberto com sucesso!');
        }
        break;
      case 'fechar':
        setCaixaStatus({
          isOpen: false,
          valorAbertura: 0,
          valorAtual: 0
        });
        toast.success('Caixa fechado com sucesso!');
        break;
      case 'sangria':
        if (valor !== undefined && valor <= caixaStatus.valorAtual) {
          setCaixaStatus(prev => ({
            ...prev,
            valorAtual: prev.valorAtual - valor
          }));
          toast.success(`Sangria realizada: R$ ${valor.toFixed(2)}`);
        } else {
          toast.error('Valor inválido para sangria!');
        }
        break;
    }
    setShowCaixaModal(false);
  };

  return (
    <Layout title="PDV - Ponto de Venda">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controle de Caixa */}
        <div className="lg:col-span-3 mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${caixaStatus.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <h3 className="text-lg font-semibold">
                  Status do Caixa: {caixaStatus.isOpen ? 'Aberto' : 'Fechado'}
                </h3>
                {caixaStatus.isOpen && (
                  <span className="text-sm text-gray-600">
                    Valor atual: R$ {caixaStatus.valorAtual.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowCaixaModal(true)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Gerenciar Caixa
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Catálogo de Produtos */}
        <div className="lg:col-span-2">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
            <h3 className="text-lg font-semibold mb-4">Produtos</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-lg p-4 shadow-sm border border-orange-100 cursor-pointer hover:shadow-md transition-all"
                  onClick={() => addToCart(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <h4 className="font-medium text-sm mb-1 truncate">{product.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                  <p className="text-orange-600 font-bold">R$ {product.price.toFixed(2)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Carrinho */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-200">
          <div className="flex items-center space-x-2 mb-4">
            <ShoppingCart className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-semibold">Carrinho</h3>
          </div>

          <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-orange-50 rounded-lg p-3">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-orange-600 font-bold">R$ {item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center hover:bg-orange-300"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center hover:bg-orange-300"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Forma de Pagamento */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">Forma de Pagamento</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPaymentMethod('pix')}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                  paymentMethod === 'pix'
                    ? 'bg-orange-100 border-orange-300 text-orange-700'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="text-sm">PIX</span>
              </button>
              <button
                onClick={() => setPaymentMethod('dinheiro')}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                  paymentMethod === 'dinheiro'
                    ? 'bg-orange-100 border-orange-300 text-orange-700'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Dinheiro</span>
              </button>
              <button
                onClick={() => setPaymentMethod('cartao')}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                  paymentMethod === 'cartao'
                    ? 'bg-orange-100 border-orange-300 text-orange-700'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-sm">Cartão</span>
              </button>
              <button
                onClick={() => setPaymentMethod('crediario')}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                  paymentMethod === 'crediario'
                    ? 'bg-orange-100 border-orange-300 text-orange-700'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Receipt className="w-4 h-4" />
                <span className="text-sm">Crediário</span>
              </button>
            </div>
          </div>

          {/* Total e Finalizar */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-orange-600">R$ {total.toFixed(2)}</span>
            </div>
            <button
              onClick={finalizeSale}
              disabled={cart.length === 0 || !caixaStatus.isOpen}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Finalizar Venda
            </button>
          </div>
        </div>
      </div>

      {/* Modal Gerenciar Caixa */}
      <AnimatePresence>
        {showCaixaModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowCaixaModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Gerenciar Caixa</h3>
              <div className="space-y-4">
                {!caixaStatus.isOpen ? (
                  <div>
                    <label className="block text-sm font-medium mb-2">Valor de Abertura</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full p-3 border rounded-lg"
                      placeholder="0.00"
                      onChange={(e) => {
                        const valor = parseFloat(e.target.value) || 0;
                        e.target.setAttribute('data-valor', valor.toString());
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.querySelector('input[type="number"]') as HTMLInputElement;
                        const valor = parseFloat(input?.getAttribute('data-valor') || '0');
                        handleCaixaAction('abrir', valor);
                      }}
                      className="w-full mt-3 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                    >
                      Abrir Caixa
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        const valor = prompt('Valor da sangria:');
                        if (valor) handleCaixaAction('sangria', parseFloat(valor));
                      }}
                      className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
                    >
                      Fazer Sangria
                    </button>
                    <button
                      onClick={() => handleCaixaAction('fechar')}
                      className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    >
                      Fechar Caixa
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Cliente Crediário */}
      <AnimatePresence>
        {showClientModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowClientModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Dados do Cliente - Crediário</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nome completo"
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="CPF"
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Telefone"
                  className="w-full p-3 border rounded-lg"
                />
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>Limite disponível:</strong> R$ 1.500,00
                  </p>
                  <p className="text-sm text-green-700">
                    <strong>Total da compra:</strong> R$ {total.toFixed(2)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setCaixaStatus(prev => ({
                        ...prev,
                        valorAtual: prev.valorAtual + total
                      }));
                      toast.success('Venda no crediário finalizada!');
                      setCart([]);
                      setShowClientModal(false);
                    }}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                  >
                    Aprovar
                  </button>
                  <button
                    onClick={() => setShowClientModal(false)}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
