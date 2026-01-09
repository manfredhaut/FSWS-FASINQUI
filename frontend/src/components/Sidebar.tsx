import React from 'react';
import { IconClose } from './Icons';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose, onNavigate }) => {
  const links = [
    { label: "Home", path: "/" },
    { label: "Gestão Administr.", path: "/admin-hub" },
    { label: "Laboratório (Entrada)", path: "/laboratorio" },
    { label: "Operacional (Campo)", path: "#" },
    { label: "Inteligência IA", path: "#" },
    { label: "Commercial (Surveys)", path: "#" },
    { label: "Importar Planilhas", path: "#" },
    { label: "Infraestrutura", path: "#" }
  ];

  const handleNavigation = (path: string) => {
    onNavigate(path);
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
              className={`nav-item ${i === 0 ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(link.path);
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
