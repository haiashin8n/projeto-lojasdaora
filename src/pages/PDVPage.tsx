import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, DollarSign, CreditCard, Banknote, QrCode, Calculator, User } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CustomerData {
  name: string;
  phone: string;
  email: string;
}

function PDVPage() {
  const { products, addSale, addCustomer, customers, cashStatus, openCash, closeCash, makeCashWithdrawal } = useData();
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'dinheiro' | 'cartao' | 'crediario'>('dinheiro');
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showCashModal, setShowCashModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData>({ name: '', phone: '', email: '' });
  const [cashAmount, setCashAmount] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        }];
      }
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.productId !== productId));
    } else {
      setCart(prev => prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      ));
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePaymentMethodChange = (method: 'pix' | 'dinheiro' | 'cartao' | 'crediario') => {
    setPaymentMethod(method);
    if (method === 'crediario') {
      setShowCustomerModal(true);
    }
  };

  const handleSale = () => {
    if (!cashStatus.isOpen) {
      toast.error('Caixa deve estar aberto para realizar vendas');
      return;
    }

    if (cart.length === 0) {
      toast.error('Adicione produtos ao carrinho');
      return;
    }

    if (paymentMethod === 'crediario' && !customerData.name) {
      toast.error('Dados do cliente são obrigatórios para crediário');
      return;
    }

    let customerId;
    if (paymentMethod === 'crediario') {
      // Verificar se cliente já existe
      const existingCustomer = customers.find(c => c.phone === customerData.phone);
      if (existingCustomer) {
        customerId = existingCustomer.id;
        // Verificar limite de crédito
        if (existingCustomer.currentDebt + total > existingCustomer.creditLimit) {
          toast.error('Limite de crédito insuficiente');
          return;
        }
      } else {
        // Adicionar novo cliente
        addCustomer({
          ...customerData,
          creditLimit: 1000,
          currentDebt: total
        });
        customerId = customers.length.toString();
      }
    }

    const sale = {
      customerId,
      products: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      })),
      total,
      paymentMethod,
      cashierId: user?.id || '1'
    };

    addSale(sale);
    setCart([]);
    setCustomerData({ name: '', phone: '', email: '' });
    toast.success('Venda realizada com sucesso!');
  };

  const handleOpenCash = () => {
    const amount = parseFloat(cashAmount);
    if (isNaN(amount) || amount < 0) {
      toast.error('Valor inválido');
      return;
    }
    openCash(amount);
    setCashAmount('');
    setShowCashModal(false);
    toast.success('Caixa aberto com sucesso!');
  };

  const handleCloseCash = () => {
    closeCash();
    toast.success('Caixa fechado com sucesso!');
  };

  const handleWithdrawal = () => {
    const amount = parseFloat(withdrawalAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Valor inválido');
      return;
    }
    if (amount > cashStatus.currentAmount) {
      toast.error('Valor maior que o disponível em caixa');
      return;
    }
    makeCashWithdrawal(amount);
    setWithdrawalAmount('');
    setShowWithdrawalModal(false);
    toast.success('Sangria realizada com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Ponto de Venda</h1>
        <div className="flex space-x-2">
          {!cashStatus.isOpen ? (
            <button
              onClick={() => setShowCashModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Abrir Caixa
            </button>
          ) : (
            <>
              <button
                onClick={() => setShowWithdrawalModal(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sangria
              </button>
              <button
                onClick={handleCloseCash}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Fechar Caixa
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Catálogo de Produtos */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Produtos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {products.slice(0, 12).map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carrinho */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Carrinho
          </h2>
          
          <div className="space-y-3 mb-6">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Carrinho vazio</p>
            ) : (
              cart.map((item) => (
                <div key={item.productId} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Formas de Pagamento */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Forma de Pagamento</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handlePaymentMethodChange('pix')}
                className={`p-3 rounded-lg border transition-colors flex items-center justify-center ${
                  paymentMethod === 'pix' 
                    ? 'border-orange-500 bg-orange-50 text-orange-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <QrCode className="h-4 w-4 mr-2" />
                PIX
              </button>
              <button
                onClick={() => handlePaymentMethodChange('dinheiro')}
                className={`p-3 rounded-lg border transition-colors flex items-center justify-center ${
                  paymentMethod === 'dinheiro' 
                    ? 'border-orange-500 bg-orange-50 text-orange-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Banknote className="h-4 w-4 mr-2" />
                Dinheiro
              </button>
              <button
                onClick={() => handlePaymentMethodChange('cartao')}
                className={`p-3 rounded-lg border transition-colors flex items-center justify-center ${
                  paymentMethod === 'cartao' 
                    ? 'border-orange-500 bg-orange-50 text-orange-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Cartão
              </button>
              <button
                onClick={() => handlePaymentMethodChange('crediario')}
                className={`p-3 rounded-lg border transition-colors flex items-center justify-center ${
                  paymentMethod === 'crediario' 
                    ? 'border-orange-500 bg-orange-50 text-orange-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <User className="h-4 w-4 mr-2" />
                Crediário
              </button>
            </div>
          </div>

          {/* Total e Finalizar */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-gray-900">R$ {total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleSale}
              disabled={cart.length === 0 || !cashStatus.isOpen}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Finalizar Venda
            </button>
          </div>
        </div>
      </div>

      {/* Modal Cliente */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dados do Cliente</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nome completo"
                value={customerData.name}
                onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Telefone"
                value={customerData.phone}
                onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email"
                value={customerData.email}
                onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCustomerModal(false);
                  setPaymentMethod('dinheiro');
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowCustomerModal(false)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Abrir Caixa */}
      {showCashModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Abrir Caixa</h3>
            <input
              type="number"
              placeholder="Valor inicial"
              value={cashAmount}
              onChange={(e) => setCashAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCashModal(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleOpenCash}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
              >
                Abrir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sangria */}
      {showWithdrawalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sangria</h3>
            <p className="text-sm text-gray-600 mb-4">
              Disponível em caixa: R$ {cashStatus.currentAmount.toFixed(2)}
            </p>
            <input
              type="number"
              placeholder="Valor da sangria"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowWithdrawalModal(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleWithdrawal}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PDVPage;
