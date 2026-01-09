import { useState, useEffect } from 'react';
import './Home.css'; // Estilos Globais do Protótipo

// Componentes da Home
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { ChatFAB } from './components/ChatFAB';

// Interfaces simplificadas para as "páginas"
interface PageProps {
  navigate: (path: string) => void;
}

// -----------------------------------------------------------------------------
// PÁGINA: HOME (Login / Entrada) - AGORA COM O NOVO VISUAL
// -----------------------------------------------------------------------------
function HomePage({ navigate }: PageProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-container">
      <TopBar onMenuToggle={() => setMenuOpen(!menuOpen)} />
      <Sidebar 
        open={menuOpen} 
        onClose={() => setMenuOpen(false)} 
        onNavigate={navigate}
      />
      <main>
        <Hero />
      </main>
      <ChatFAB />
    </div>
  );
}

// -----------------------------------------------------------------------------
// PÁGINA: ADMIN HUB (Painel de Gestão) - Mantendo funcionalidade anterior
// -----------------------------------------------------------------------------
function AdminHub({ navigate }: PageProps) {
  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backButton}>
        ← Voltar
      </button>

      <header style={styles.header}>
        <h1 style={styles.title}>Painel de Gestão</h1>
        <p style={styles.subtitle}>Selecione uma ferramenta administrativa</p>
      </header>

      <div style={styles.grid}>
        {/* Card: Cadastro */}
        <div style={styles.card} onClick={() => window.location.href = '/cadastro-clientes.html'}>
          <div style={styles.icon}>📝</div>
          <h3 style={styles.cardTitle}>Novo Cadastro</h3>
          <p style={styles.cardDesc}>Registrar novo Survey Técnico</p>
        </div>

        {/* Card: Consulta */}
        <div style={styles.card} onClick={() => window.location.href = '/consulta-clientes.html'}>
          <div style={styles.icon}>🔍</div>
          <h3 style={styles.cardTitle}>Consultar Base</h3>
          <p style={styles.cardDesc}>Visualizar histórico de clientes</p>
        </div>

        {/* Card: Importar */}
        <div style={styles.card} onClick={() => window.location.href = '/importar-planilhas.html'}>
          <div style={styles.icon}>📊</div>
          <h3 style={styles.cardTitle}>Importar Dados</h3>
          <p style={styles.cardDesc}>Carregar planilhas antigas</p>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PÁGINA: LABORATÓRIO (Link para página HTML existente)
// -----------------------------------------------------------------------------
function LaboratoryRedirect() {
  useEffect(() => {
    window.location.href = '/laboratorio-entrada.html';
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={{ color: 'white' }}>Redirecionando para o Laboratório...</h2>
    </div>
  );
}


// -----------------------------------------------------------------------------
// COMPONENTE PRINCIPAL (Roteamento Simples)
// -----------------------------------------------------------------------------
function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Função simples de navegação (SPA simulada)
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Escutar o botão "voltar" do navegador
  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Roteador Básico
  if (currentPath === '/' || currentPath === '/index.html') {
    return <HomePage navigate={navigate} />;
  }
  
  if (currentPath === '/admin-hub') {
    return <AdminHub navigate={navigate} />;
  }

  if (currentPath === '/laboratorio') {
    return <LaboratoryRedirect />;
  }

  // Fallback 404
  return (
    <div style={styles.container}>
      <h1 style={{ color: 'white' }}>404 - Página não encontrada</h1>
      <button onClick={() => navigate('/')} style={styles.buttonPrimary}>
        Voltar ao Início
      </button>
    </div>
  );
}

// -----------------------------------------------------------------------------
// ESTILOS INLINE (Apenas para as páginas legadas/AdminHub)
// -----------------------------------------------------------------------------
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at 50% 0%, #0b3d75 0%, #020c1b 80%)',
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    background: 'linear-gradient(90deg, #fff, #a3d9ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 10px 0',
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#00d2ff',
    fontSize: '1.1rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '900px',
  },
  card: {
    background: 'rgba(2, 12, 27, 0.7)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(64, 123, 255, 0.1)',
    borderRadius: '20px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  cardTitle: {
    fontSize: '1.3rem',
    color: '#fff',
    margin: '15px 0 10px 0',
  },
  cardDesc: {
    color: '#a0aab5',
    fontSize: '0.9rem',
    margin: 0,
  },
  icon: {
    fontSize: '3rem',
    marginBottom: '10px',
  },
  buttonPrimary: {
    padding: '12px 24px',
    background: '#00d2ff',
    color: '#020c1b',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '300px',
  },
  backButton: {
    position: 'absolute',
    top: '80px', // Ajustado para não colidir com a TopBar se ela existisse aqui
    left: '20px',
    background: 'transparent',
    border: 'none',
    color: '#a0aab5',
    cursor: 'pointer',
    fontSize: '1rem',
    zIndex: 100
  }
};

export default App;
