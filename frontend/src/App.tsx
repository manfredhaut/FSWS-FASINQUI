import { useState } from 'react';
import './Home.css'; // Estilos Globais do Protótipo

// Componentes Principais
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { ChatFAB } from './components/ChatFAB';

// Visualizações (Páginas)
import { Hero } from './components/Hero';
import { AdminDashboard } from './components/AdminDashboard';
import { ClientRegister } from './components/ClientRegister'; // Nova importação

// Definindo os tipos para as visualizações possíveis
type View = 'home' | 'admin' | 'client-register';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');

  // Função para navegar entre as visualizações
  const navigate = (view: View) => {
    setCurrentView(view);
  };

  // Função para renderizar o conteúdo principal com base na view atual
  const renderMainContent = () => {
    switch (currentView) {
      case 'admin':
        // Agora passamos a função de navegação para o AdminDashboard também
        return <AdminDashboard onBack={() => navigate('home')} onNavigate={navigate} />;
      case 'client-register':
        return <ClientRegister onBack={() => navigate('admin')} />;
      case 'home':
      default:
        return <Hero />;
    }
  };

  return (
    <div className="app-container">
      <TopBar onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <Sidebar 
        open={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        onNavigate={navigate} // O Sidebar também pode navegar para lá se configurado
      />
      <main>
        {renderMainContent()}
      </main>
      <ChatFAB />
    </div>
  );
}

export default App;
