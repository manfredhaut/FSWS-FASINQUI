import { useState } from 'react';
import './Home.css'; // Estilos Globais do Protótipo

// Componentes Principais
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { ChatFAB } from './components/ChatFAB';

// Visualizações (Páginas)
import { Hero } from './components/Hero';
import { AdminDashboard } from './components/AdminDashboard';

// Definindo os tipos para as visualizações possíveis
type View = 'home' | 'admin';

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
        return <AdminDashboard onBack={() => navigate('home')} />;
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
        onNavigate={navigate}
      />
      <main>
        {renderMainContent()}
      </main>
      <ChatFAB />
    </div>
  );
}

export default App;
