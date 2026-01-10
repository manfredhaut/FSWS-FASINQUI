import React from 'react';
import './Admin.css';
import {
    ArrowLeft,
    Database,
    Ruler,
    UserCog,
    UserCheck,
    Users,
    BookUser,
    FlaskConical,
    FileText,
    Briefcase
} from 'lucide-react';

// Ajustamos as props para aceitar onNavigate
interface AdminDashboardProps {
    onBack: () => void;
    onNavigate?: (view: any) => void; // Tornei opcional para evitar quebras se não for passado, mas idealmente seria obrigatório
}

type ToolkitItem = {
    icon: React.ElementType;
    label: string;
    action?: string; // Mapeia para a rota de visualização
};

const toolkitItems: ToolkitItem[] = [
    { icon: Database, label: 'Cadastro de Equipamentos' },
    { icon: Ruler, label: 'Cadastro de Parâmetros e Set Points' },
    { icon: UserCog, label: 'Cadastro de Assistentes Técnicos' },
    { icon: UserCheck, label: 'Cadastro de Vendedores' },
    { icon: Users, label: 'Cadastro de Prestadores de Serviços' },
    { icon: BookUser, label: 'Cadastro de Clientes', action: 'client-register' }, // Ação adicionada
    { icon: FlaskConical, label: 'Cadastro de Produtos de Tratamento' },
    { icon: FileText, label: 'Cadastro dos Dados de Coleta' },
    { icon: Briefcase, label: 'Cadastro de Serviços' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack, onNavigate }) => {
    
    const handleCardClick = (item: ToolkitItem) => {
        if (item.action && onNavigate) {
            onNavigate(item.action);
        } else {
            console.log(`Clicou em ${item.label} (Sem ação definida)`);
        }
    };

    return (
        <div className="admin-container">
            <header className="admin-header">
                <h1>Gestão Administrativa</h1>
                <button onClick={onBack} className="back-button">
                    <ArrowLeft size={18} />
                    <span>Voltar</span>
                </button>
            </header>

            <div className="toolkit-grid">
                {toolkitItems.map((item, index) => (
                    <div key={index} className="toolkit-card" onClick={() => handleCardClick(item)}>
                        <item.icon className="icon" size={40} strokeWidth={1.5} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
