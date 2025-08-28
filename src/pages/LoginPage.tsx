import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Store, User, CreditCard } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (role: 'superadmin' | 'admin' | 'caixa') => {
    login(role);
    
    switch (role) {
      case 'superadmin':
        navigate('/superadmin');
        break;
      case 'admin':
        navigate('/admin');
        break;
      case 'caixa':
        navigate('/caixa');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-4">
            <Store className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Lojas DAORA
          </h1>
          <p className="text-gray-600 mt-2">Sistema de Gestão Completo</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-orange-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Escolha seu perfil de acesso
          </h2>
          
          <div className="space-y-4">
            <button
              onClick={() => handleLogin('superadmin')}
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <User className="h-5 w-5 mr-3" />
              Entrar como Super Admin
            </button>
            
            <button
              onClick={() => handleLogin('admin')}
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Store className="h-5 w-5 mr-3" />
              Entrar como Admin
            </button>
            
            <button
              onClick={() => handleLogin('caixa')}
              className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <CreditCard className="h-5 w-5 mr-3" />
              Entrar como Caixa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
