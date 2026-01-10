import React from 'react';
import './Admin.css'; // Importando o CSS corrigido
import {
    ArrowLeft,
    Database,
    Ruler,
    UserCog,
    UserCheck,
    Users,
    BookUser,
    FlaskConical,
    FileText, // <--- Ícone corrigido aqui (Era FileChart)
    Briefcase
} from 'lucide-react';

interface AdminDashboardProps {
    onBack: () => void;
}

type ToolkitItem = {
    icon: React.ElementType;
    label: string;
};

// Dados corrigidos com FileText
const toolkitItems: ToolkitItem[] = [
    { icon: Database, label: 'Cadastro de Equipamentos' },
    { icon: Ruler, label: 'Cadastro de Parâmetros e Set Points' },
    { icon: UserCog, label: 'Cadastro de Assistentes Técnicos' },
    { icon: UserCheck, label: 'Cadastro de Vendedores' },
    { icon: Users, label: 'Cadastro de Prestadores de Serviços' },
    { icon: BookUser, label: 'Cadastro de Clientes' },
    { icon: FlaskConical, label: 'Cadastro de Produtos de Tratamento' },
    { icon: FileText, label: 'Cadastro dos Dados de Coleta' }, // <--- E aqui
    { icon: Briefcase, label: 'Cadastro de Serviços' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
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
                    <div key={index} className="toolkit-card" onClick={() => console.log(`Clicou em ${item.label}`)}>
                        <item.icon className="icon" size={40} strokeWidth={1.5} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};