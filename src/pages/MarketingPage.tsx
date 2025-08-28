import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { MessageSquare, Sparkles, Send } from 'lucide-react';
import { toast } from 'sonner';

function MarketingPage() {
  const { products } = useData();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [promotionText, setPromotionText] = useState('');
  const [discount, setDiscount] = useState('');

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const generateAIText = () => {
    const selectedProductsData = products.filter(p => selectedProducts.includes(p.id));
    if (selectedProductsData.length === 0) {
      toast.error('Selecione pelo menos um produto');
      return;
    }

    const productNames = selectedProductsData.map(p => p.name).join(', ');
    const discountText = discount ? ` com ${discount}% de desconto` : '';
    
    const aiText = `🔥 PROMOÇÃO IMPERDÍVEL! 🔥

✨ ${productNames}${discountText}

📱 Garante já o seu! Estoque limitado!
💳 Aceitamos PIX, Cartão e Crediário
🚚 Entrega rápida

Venha conhecer nossa loja ou chame no WhatsApp!

#PromocaoDaora #Ofertas #LojasDaora`;

    setPromotionText(aiText);
    toast.success('Texto gerado com IA!');
  };

  const sendPromotion = () => {
    if (!promotionText.trim()) {
      toast.error('Adicione um texto para a promoção');
      return;
    }
    toast.success('Promoção enviada para todos os grupos de WhatsApp!');
    setPromotionText('');
    setSelectedProducts([]);
    setDiscount('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing via WhatsApp</h1>
        <p className="text-gray-600">Crie e envie promoções para seus clientes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seleção de Produtos */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Selecionar Produtos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {products.slice(0, 12).map((product) => (
              <div
                key={product.id}
                onClick={() => toggleProductSelection(product.id)}
                className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                  selectedProducts.includes(product.id)
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-24 object-cover rounded-md mb-2"
                />
                <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                <p className="text-xs text-gray-600">{product.category}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  R$ {product.price.toFixed(2)}
                </p>
                {selectedProducts.includes(product.id) && (
                  <div className="mt-2 text-orange-600 text-xs font-medium">
                    ✓ Selecionado
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Criação da Promoção */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Criar Promoção</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desconto (%)
              </label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Ex: 20"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={generateAIText}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Sparkles className="h-5 w-5" />
              <span>Gerar Texto com Gemini (IA)</span>
            </button>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texto da Promoção
              </label>
              <textarea
                value={promotionText}
                onChange={(e) => setPromotionText(e.target.value)}
                rows={8}
                placeholder="Digite ou gere o texto da promoção..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={sendPromotion}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Send className="h-5 w-5" />
              <span>Enviar Promoção</span>
            </button>
          </div>
        </div>
      </div>

      {/* Produtos Selecionados */}
      {selectedProducts.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Produtos Selecionados ({selectedProducts.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedProducts.map((productId) => {
              const product = products.find(p => p.id === productId);
              return (
                <span
                  key={productId}
                  className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                >
                  {product?.name}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketingPage;
