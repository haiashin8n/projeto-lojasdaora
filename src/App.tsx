import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import CaixaDashboard from './pages/Caixa/CaixaDashboard';
import VendasPage from './pages/Caixa/VendasPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProdutosPage from './pages/Admin/ProdutosPage';
import MarketingPage from './pages/Admin/MarketingPage';
import RelatoriosPage from './pages/Admin/RelatoriosPage';
import SuperAdminDashboard from './pages/SuperAdmin/SuperAdminDashboard';
import ConexoesPage from './pages/SuperAdmin/ConexoesPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Rotas do Caixa */}
            <Route path="/caixa" element={
              <ProtectedRoute allowedRoles={['caixa']}>
                <CaixaDashboard />
              </ProtectedRoute>
            } />
            <Route path="/caixa/vendas" element={
              <ProtectedRoute allowedRoles={['caixa']}>
                <VendasPage />
              </ProtectedRoute>
            } />
            
            {/* Rotas do Admin */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/produtos" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ProdutosPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/marketing" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MarketingPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/relatorios" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <RelatoriosPage />
              </ProtectedRoute>
            } />
            
            {/* Rotas do Super Admin */}
            <Route path="/superadmin" element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <SuperAdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/superadmin/conexoes" element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <ConexoesPage />
              </ProtectedRoute>
            } />
          </Routes>
          <Toaster position="top-right" richColors />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
