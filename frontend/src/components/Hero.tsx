import React from 'react';
import { IconZapFilled } from './Icons';

export const Hero: React.FC = () => (
  <section className="hero">
    <div className="hero-badge">
      <IconZapFilled />
      NEURAL ANALYSIS ACTIVE
    </div>
    
    <div className="hero-title">
      <span className="title-fasinqui">FASINQUI</span>
      <span className="title-smart">Smart Water System</span>
    </div>

    <p className="hero-desc">
      SISTEMA INTEGRADO DE ANÁLISE DE ÁGUAS INDUSTRIAIS
    </p>
  </section>
);
