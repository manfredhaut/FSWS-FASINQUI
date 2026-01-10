import React from 'react';
import { IconClose } from './Icons';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  // A função onNavigate agora recebe a view para qual navegar
  onNavigate: (view: 'home' | 'admin') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose, onNavigate }) => {
  const links = [
    { label: "Home", view: 'home' },
    { label: "Gestão Administr.", view: 'admin' },
    // Outros links podem ser adicionados aqui no futuro
    { label: "Laboratório (Entrada)", view: 'home' }, // Exemplo
    { label: "Operacional (Campo)", view: 'home' },
    { label: "Inteligência IA", view: 'home' },
    { label: "Commercial (Surveys)", view: 'home' }, 
    { label: "Importar Planilhas", view: 'home' },
    { label: "Infraestrutura", view: 'home' }
  ];

  const handleNavigation = (view: 'home' | 'admin') => {
    onNavigate(view);
    onClose();
  };

  return (
    <>
      <div className={`sidebar-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div style={{padding: '24px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <span style={{fontWeight:800, fontSize:'14px', color:'#94a3b8', letterSpacing:'0.1em'}}>MENU</span>
          <button className="icon-btn" onClick={onClose}><IconClose /></button>
        </div>
        <nav>
          {links.map((link, i) => (
            <a 
              href="#" 
              key={i} 
              // A classe 'active' pode ser gerenciada com base na view atual se necessário
              className={`nav-item ${link.view === 'home' && i === 0 ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(link.view as 'home' | 'admin');
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};
