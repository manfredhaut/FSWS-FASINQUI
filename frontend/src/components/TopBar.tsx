import React from 'react';
import { IconMenu, IconZapOutline, IconSearch, IconBell, IconUser } from './Icons';

interface TopBarProps {
  onMenuToggle: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuToggle }) => (
  <header className="topbar">
    <div className="topbar-left">
      <button className="icon-btn" onClick={onMenuToggle}>
        <IconMenu />
      </button>
    </div>

    {/* STATUS CENTRALIZADOS */}
    <div className="status-group">
      <div className="status-item text-white">
        100% CLOUD SYNC
      </div>
      <div className="status-item text-cyan">
        <span className="zap-icon-top"><IconZapOutline /></span>
        2.5ms LATENCY
      </div>
      <div className="status-item text-green">
        <div className="dot"></div>
        CLOUD SYNC ONLINE
      </div>
    </div>

    <div className="topbar-right">
      <button className="icon-btn" title="Buscar"><IconSearch /></button>
      <button className="icon-btn" title="Notificações"><IconBell /></button>
      <button className="icon-btn" title="Perfil"><IconUser /></button>
    </div>
  </header>
);
