import React from 'react';
import { IconZapFilled } from './Icons';
import logoFinal from '../logo-final.png';

export const Hero: React.FC = () => (
  <section className="hero">
    <div className="hero-badge" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
      <IconZapFilled />
      NEURAL ANALYSIS ACTIVE
    </div>
    
    <div className="hero-title">
      <img
        src={logoFinal}
        alt="FASINQUI Smart Water System"
        className="hero-logo-img"
        style={{
          maxWidth: '90%',
          height: 'auto',
          maxHeight: '260px', /* Aumentado para destaque total */
          marginBottom: '10px',
          objectFit: 'contain',
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
        }}
      />
      <span
        className="title-smart"
        style={{
          display: 'block',
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',   /* Responsividade fluida */
          fontWeight: '800',    /* Peso extra bold para combinar com a marca */
          letterSpacing: '1px', /* Espaçamento ajustado */
          color: '#ffffff',     /* Branco puro */
          marginTop: '20px',    /* Respiro do logo */
          textShadow: '0 2px 4px rgba(0,0,0,0.3)' /* Sombra sutil para destacar do fundo */
        }}
      >
        Smart Water System
      </span>
    </div>

    <p className="hero-desc">
      SISTEMA INTEGRADO DE ANÁLISE DE ÁGUAS INDUSTRIAIS
    </p>
  </section>
);
