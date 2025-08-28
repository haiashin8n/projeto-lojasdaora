import React from 'react';
import { useData } from '../contexts/DataContext';
import { Edit, Trash2, Plus } from 'lucide-react';

function ProdutosPage() {
  const { products } = useData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Novo Produto</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-md transition-shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold text-gray-900">
                  R$ {product.price.toFixed(2)}
                </span>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  product.stock > 10 
                    ? 'bg-green-100 text-green-800' 
                    : product.stock > 0 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock} em estoque
                </span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors">
                  <Edit className="h-4 w-4" />
                  <span className="text-sm">Editar</span>
                </button>
                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors">
                  <Trash2 className="h-4 w-4" />
                  <span className="text-sm">Excluir</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProdutosPage;
