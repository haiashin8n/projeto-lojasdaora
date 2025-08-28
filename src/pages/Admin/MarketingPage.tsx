import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Sparkles, Send, Image, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  imagem: string;
}

export default function MarketingPage() {
  const [produtos] = useState<Produto[]>([
    {
      id: '1',
      nome: 'Tênis Nike Air Max',
      preco: 299.99,
      categoria: 'Calçados',
      imagem: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300'
    },
    {
      id: '2',
      nome: 'Smartphone Samsung',
      preco: 899.99,
      categoria: 'Eletrônicos',
      imagem: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300'
    },
    {
      id: '3',
      nome: 'Camiseta Polo',
      preco: 79.99,
      categoria: 'Roupas',
      imagem: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300'
    },
    {
      id: '4',
      nome: 'Relógio Digital',
      preco: 199.99,
      categoria: 'Acessórios',
      imagem: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300'
    }
  ]);

  const [produtosSelecionados, setProdutosSelecionados] = useState<string[]>([]);
  const [textoPromocao, setTextoPromocao] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleProduto = (produtoId: string) => {
    setProdutosSelecionados(prev =>
      prev.includes(produtoId)
        ? prev.filter(id => id !== produtoId)
        : [...prev, produtoId]
    );
  };

  const gerarTextoComIA = async () => {
    if (produtosSelecionados.length === 0) {
      toast.error('Selecione pelo menos um produto para a promoção');
      return;
    }

    setIsGenerating(true);
    
    // Simular chamada para IA
    setTimeout(() => {
      const produtosTexto = produtos
        .filter(p => produtosSelecionados.includes(p.id))
        .map(p => `${p.nome} - R$ ${p.preco.toFixed(2)}`)
        .join('\n');

      const textoGerado = `🔥 SUPER PROMOÇÃO LOJAS DAORA! 🔥

Aproveite estas ofertas imperdíveis:

${produtosTexto}

⚡ Ofertas por tempo limitado!
💳 Parcelamos em até 12x
🚚 Entrega rápida
📱 WhatsApp: (11) 99999-9999

Não perca essa oportunidade! 
Venha para a Loja DAORA e aproveite!

#LojaDAORA #Promoção #Ofertas`;

      setTextoPromocao(textoGerado);
      setIsGenerating(false);
      toast.success('Texto gerado pela IA!');
    }, 2000);
  };

  const enviarPromocao = () => {
    if (!textoPromocao.trim()) {
      toast.error('Escreva ou gere um texto para a promoção');
      return;
    }

    // Simular envio
    setTimeout(() => {
      toast.success(`Promoção enviada para 156 contatos!`);
      setProdutosSelecionados([]);
      setTextoPromocao('');
    }, 1000);
  };

  return (
    <Layout title="Marketing WhatsApp" showBackButton backTo="/admin">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-xl">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Marketing via WhatsApp</h2>
              <p className="text-gray-600">Crie e envie promoções para seus clientes</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seleção de Produtos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Image className="h-5 w-5 mr-2" />
              Selecionar Produtos ({produtosSelecionados.length})
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {produtos.map((produto) => (
                <div
                  key={produto.id}
                  onClick={() => toggleProduto(produto.id)}
                  className={`cursor-pointer border-2 rounded-xl p-3 transition-all ${
                    produtosSelecionados.includes(produto.id)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <h4 className="font-medium text-sm">{produto.nome}</h4>
                  <p className="text-green-600 font-semibold">R$ {produto.preco.toFixed(2)}</p>
                  <span className="text-xs text-gray-500">{produto.categoria}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Criar Promoção */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Criar Promoção
            </h3>

            <div className="space-y-4">
              <button
                onClick={gerarTextoComIA}
                disabled={isGenerating || produtosSelecionados.length === 0}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isGenerating ? 'Gerando com IA...' : 'Gerar Texto com Gemini (IA)'}
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texto da Promoção
                </label>
                <textarea
                  value={textoPromocao}
                  onChange={(e) => setTextoPromocao(e.target.value)}
                  className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Digite ou gere automaticamente o texto da sua promoção..."
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Prévia do Envio</h4>
                <p className="text-sm text-gray-600">
                  A promoção será enviada para <strong>156 contatos</strong> da sua lista de clientes.
                </p>
              </div>

              <button
                onClick={enviarPromocao}
                disabled={!textoPromocao.trim()}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Promoção
              </button>
            </div>
          </motion.div>
        </div>

        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas de Marketing</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">156</p>
              <p className="text-sm text-blue-600">Contatos Ativos</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">23</p>
              <p className="text-sm text-green-600">Campanhas Enviadas</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">68%</p>
              <p className="text-sm text-purple-600">Taxa de Abertura</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">R$ 12.5k</p>
              <p className="text-sm text-orange-600">Vendas Geradas</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
