import React, { useState } from 'react';
import './ClientRegister.css';
import { ArrowLeft } from 'lucide-react';

interface ClientRegisterProps {
  onBack: () => void;
}

export const ClientRegister: React.FC<ClientRegisterProps> = ({ onBack }) => {
  // Estado para controlar a exibição das seções
  const [activeSection, setActiveSection] = useState<'vapor' | 'resfriamento' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificação de segurança
    if (!activeSection) {
        alert('Por favor, selecione e preencha um dos sistemas técnicos (Vapor ou Resfriamento).');
        return;
    }

    let message = 'Dados Corporativos Processados!';
    if (activeSection === 'vapor') message += '\n+ Dados de Gerador de Vapor';
    if (activeSection === 'resfriamento') message += '\n+ Dados de Sistema de Resfriamento';

    alert(message + '\nGravado com sucesso!');
  };

  return (
    <div className="client-register-wrapper">
      <div className="client-register-container">
        
        {/* Header com Botão Voltar */}
        <div className="register-header">
            <div className="back-button-wrapper">
                <button type="button" className="back-button-reg" onClick={onBack}>
                    <ArrowLeft size={24} /> Voltar
                </button>
            </div>
            <h1>FASINQUI</h1>
            <div className="subtitle">Smart Water System - Survey Técnico</div>
        </div>

        {/* Card Principal */}
        <div className="glass-card">
            <form id="surveyForm" onSubmit={handleSubmit}>
                
                {/* 1. DADOS CORPORATIVOS */}
                <div className="form-section">
                    <div className="section-header">
                        <h2>Dados Corporativos</h2>
                        <div className="section-line"></div>
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label>EMPRESA</label>
                            <input type="text" id="empresa" required placeholder="Razão Social" />
                        </div>
                        <div className="form-group">
                            <label>CNPJ</label>
                            <input type="text" id="cnpj" placeholder="00.000.000/0000-00" />
                        </div>
                        <div className="form-group">
                            <label>CIDADE / UF</label>
                            <input type="text" id="cidade" />
                        </div>
                        <div className="form-group">
                            <label>CONTATO RESPONSÁVEL</label>
                            <input type="text" id="contato" required />
                        </div>
                        <div className="form-group">
                            <label>EMAIL</label>
                            <input type="email" id="email" required />
                        </div>
                        <div className="form-group">
                            <label>TELEFONE</label>
                            <input type="tel" id="telefone" />
                        </div>
                        <div className="form-group">
                            <label>RAMO DA ATIVIDADE</label>
                            <input type="text" id="ramo" />
                        </div>
                        <div className="form-group">
                            <label>PRODUÇÃO</label>
                            <input type="text" id="producao" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>TIPO DE PROPOSTA</label>
                        <div className="options-group">
                            <label className="custom-check"><input type="checkbox" name="proposta" value="Tratamento" /> Tratamento Químico</label>
                            <label className="custom-check"><input type="checkbox" name="proposta" value="Limpeza" /> Limpeza Técnica</label>
                        </div>
                    </div>
                </div>

                {/* SELETOR DE SISTEMA (Abas) */}
                <div className="toolkit-selector">
                    <div className="toolkit-title">Selecione o Sistema para Cadastro</div>
                    <div className="toolkit-buttons">
                        <button 
                            type="button" 
                            className={`type-btn ${activeSection === 'vapor' ? 'active' : ''}`} 
                            onClick={() => setActiveSection('vapor')}
                        >
                            Gerador de Vapor
                        </button>
                        <button 
                            type="button" 
                            className={`type-btn ${activeSection === 'resfriamento' ? 'active' : ''}`} 
                            onClick={() => setActiveSection('resfriamento')}
                        >
                            Sistema de Resfriamento
                        </button>
                    </div>
                </div>

                {/* 2A. SISTEMA GERADOR DE VAPOR */}
                {activeSection === 'vapor' && (
                <div id="section-vapor" className="fade-in">
                    <div className="form-section">
                        <div className="section-header">
                            <h2>Sistema Gerador de Vapor</h2>
                            <div className="section-line"></div>
                        </div>
                        
                        <div className="grid-3">
                            <div className="form-group">
                                <label>FABRICANTE</label>
                                <input type="text" id="fab_cald" />
                            </div>
                            <div className="form-group">
                                <label>TIPO DE CALDEIRA</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="radio" name="estado_cald" value="Nova" /> Nova</label>
                                    <label className="custom-check"><input type="radio" name="estado_cald" value="Usada" /> Usada</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>QUEM FORNECE O ATUAL TRATAMENTO?</label>
                                <input type="text" id="fornec_cald" />
                            </div>
                        </div>

                        <div className="grid-4">
                            <div className="form-group">
                                <label>PRODUÇÃO PROJETO</label>
                                <div className="input-wrapper"><input type="number" id="prod_proj_cald" step="0.01" /><span>ton/h</span></div>
                            </div>
                            <div className="form-group">
                                <label>PRODUÇÃO REAL</label>
                                <div className="input-wrapper"><input type="number" id="prod_real_cald" step="0.01" /><span>ton/h</span></div>
                            </div>
                            <div className="form-group">
                                <label>MEDIÇÃO PRODUÇÃO VAPOR</label>
                                <input type="text" id="medicao_vapor" />
                            </div>
                            <div className="form-group"></div>
                            <div className="form-group">
                                <label>PRESSÃO DE TRABALHO PROJETO</label>
                                <div className="input-wrapper"><input type="number" id="press_proj_cald" step="0.01" /><span>kgf/cm²</span></div>
                            </div>
                            <div className="form-group">
                                <label>PRESSÃO DE TRABALHO REAL</label>
                                <div className="input-wrapper"><input type="number" id="press_real_cald" step="0.01" /><span>kgf/cm²</span></div>
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label>FONTE DE REPOSIÇÃO</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="checkbox" name="repo_cald" value="Poco" /> Poço</label>
                                    <label className="custom-check"><input type="checkbox" name="repo_cald" value="Rio" /> Rio</label>
                                    <label className="custom-check"><input type="checkbox" name="repo_cald" value="Lago" /> Lago</label>
                                    <label className="custom-check"><input type="checkbox" name="repo_cald" value="ETA" /> ETA</label>
                                    <label className="custom-check"><input type="checkbox" name="repo_cald" value="Outro" /> Outro</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>PRÉ-TRATAMENTO</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="checkbox" name="pre_cald" value="Abrandador" /> Abrand.</label>
                                    <label className="custom-check"><input type="checkbox" name="pre_cald" value="Osmose" /> Osmose</label>
                                    <label className="custom-check"><input type="checkbox" name="pre_cald" value="Desmi" /> Desmi.</label>
                                    <label className="custom-check"><input type="checkbox" name="pre_cald" value="Filtro" /> Filtro</label>
                                    <label className="custom-check"><input type="checkbox" name="pre_cald" value="Nenhum" /> Nenhum</label>
                                </div>
                            </div>
                        </div>

                        <div className="grid-4">
                            <div className="form-group">
                                <label>RETORNO DE CONDENSADO</label>
                                <div className="input-wrapper" style={{ marginBottom: '5px' }}>
                                    <input type="number" id="retorno_pct" placeholder="0" />
                                    <span>%</span>
                                </div>
                                <span className="sub-label" style={{ border: 'none', padding: 0, marginTop: '10px' }}>DIRETO ?</span>
                                <div className="options-group">
                                    <label className="custom-check"><input type="radio" name="retorno_direto" value="Sim" /> Sim</label>
                                    <label className="custom-check"><input type="radio" name="retorno_direto" value="Nao" /> Não</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>DESAERADOR?</label>
                                <div className="options-group" style={{ marginTop: '25px' }}>
                                    <label className="custom-check"><input type="radio" name="desaerador" value="Sim" /> Sim</label>
                                    <label className="custom-check"><input type="radio" name="desaerador" value="Nao" /> Não</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>ECONOMIZADOR?</label>
                                <div className="options-group" style={{ marginTop: '25px' }}>
                                    <label className="custom-check"><input type="radio" name="economizador" value="Sim" /> Sim</label>
                                    <label className="custom-check"><input type="radio" name="economizador" value="Nao" /> Não</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>TEMPERATURA DE ÁGUA DE ALIMENTAÇÃO</label>
                                <div className="input-wrapper"><input type="number" id="temp_alim" step="0.1" /><span>°C</span></div>
                            </div>
                        </div>

                        <div className="grid-4">
                            <div className="form-group">
                                <label>DOSAGEM</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="checkbox" name="dosagem" value="Linha" /> Linha</label>
                                    <label className="custom-check"><input type="checkbox" name="dosagem" value="TA" /> T.A.</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>MONITORA/REGISTRA TEMP. ALIM.</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="radio" name="monitora_temp" value="Sim" /> Sim</label>
                                    <label className="custom-check"><input type="radio" name="monitora_temp" value="Nao" /> Não</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>TIPO DE PURGA</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="checkbox" name="tipo_purga" value="Continua" /> Contínua</label>
                                    <label className="custom-check"><input type="checkbox" name="tipo_purga" value="Fundo" /> Fundo</label>
                                    <label className="custom-check"><input type="checkbox" name="tipo_purga" value="Manual" /> Manual</label>
                                    <label className="custom-check"><input type="checkbox" name="tipo_purga" value="Automatica" /> Automática</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>ALIMENTAÇÃO</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="radio" name="alimentacao" value="Continua" /> Contínua</label>
                                    <label className="custom-check"><input type="radio" name="alimentacao" value="Intermitente" /> Intermitente</label>
                                </div>
                            </div>
                        </div>

                        <div className="grid-4">
                            <div className="form-group">
                                <label>DIÂMETRO DAS DESCARGAS</label>
                                <input type="text" id="diametro_desc" />
                            </div>
                            <div className="form-group">
                                <label>QUANTIDADE DE DESCARGAS</label>
                                <input type="number" id="qtd_desc" />
                            </div>
                            <div className="form-group">
                                <label>HIDRÔMETRO</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="checkbox" name="hidrometro" value="Alimentacao" /> Alimentação</label>
                                    <label className="custom-check"><input type="checkbox" name="hidrometro" value="Reposicao" /> Reposição</label>
                                </div>
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label>REGIME DE OPERAÇÃO (Horas)</label>
                                <div className="input-wrapper"><input type="number" id="regime_hora" step="0.1" /><span>h/dia</span></div>
                            </div>
                            <div className="form-group">
                                <label>REGIME DE OPERAÇÃO (Dias)</label>
                                <div className="input-wrapper"><input type="number" id="regime_dia" /><span>dia/mês</span></div>
                            </div>
                        </div>

                        <div className="grid-3">
                            <div className="form-group">
                                <label>TIPO DE COMBUSTÍVEL</label>
                                <input type="text" id="combustivel" />
                            </div>
                            <div className="form-group">
                                <label>UMIDADE COMBUSTÍVEL</label>
                                <div className="input-wrapper"><input type="number" id="umidade_comb" step="0.1" /><span>%</span></div>
                            </div>
                            <div className="form-group">
                                <label>CONSUMO DO COMBUSTÍVEL</label>
                                <div className="input-wrapper"><input type="number" id="consumo_comb" step="0.01" /><span>qtdd/mês</span></div>
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label>UNIDADE CONSUMO COMBUSTÍVEL</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="radio" name="unid_comb" value="mst" /> mst</label>
                                    <label className="custom-check"><input type="radio" name="unid_comb" value="m3" /> m³</label>
                                    <label className="custom-check"><input type="radio" name="unid_comb" value="ton" /> ton</label>
                                    <label className="custom-check"><input type="radio" name="unid_comb" value="Nm3" /> Nm³</label>
                                    <label className="custom-check"><input type="radio" name="unid_comb" value="Litros" /> Litros</label>
                                    <label className="custom-check"><input type="radio" name="unid_comb" value="Outro" /> Outro</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>USA VAPOR DIRETO NO PROCESSO?</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="radio" name="vapor_direto" value="Sim" /> Sim</label>
                                    <label className="custom-check"><input type="radio" name="vapor_direto" value="Nao" /> Não</label>
                                </div>
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label>DATA DA ÚLTIMA INSPEÇÃO + RELATÓRIO</label>
                                <input type="date" id="data_inspecao" />
                            </div>
                            <div className="form-group">
                                <label>VOLUME ESTÁTICO (LAVAGEM QUÍMICA)</label>
                                <div className="input-wrapper"><input type="number" id="vol_estatico_cald" step="0.01" /><span>m³</span></div>
                            </div>
                        </div>
                        
                        <div className="form-group" style={{ marginTop: '15px' }}>
                            <label>OBSERVAÇÕES EXTRAS (VAPOR):</label>
                            <textarea id="obs_extras_vapor" placeholder="Observações específicas do gerador de vapor..."></textarea>
                        </div>
                    </div>
                </div>
                )}

                {/* 2B. SISTEMA DE RESFRIAMENTO */}
                {activeSection === 'resfriamento' && (
                <div id="section-resfriamento" className="fade-in">
                    <div className="form-section">
                        <div className="section-header">
                            <h2>Sistema de Resfriamento</h2>
                            <div className="section-line"></div>
                        </div>

                        <div className="grid-4">
                            <div className="form-group">
                                <label>RAMO DE ATIVIDADE</label>
                                <input type="text" id="ramo_resf" />
                            </div>
                            <div className="form-group">
                                <label>QUANTIDADE DE PRODUÇÃO POR DIA</label>
                                <input type="text" id="qtd_producao" placeholder="Quantidade" />
                            </div>
                            <div className="form-group">
                                <label>TEMPO DE PRODUÇÃO</label>
                                <input type="text" id="tempo_producao" placeholder="Tempo" />
                            </div>
                            <div className="form-group">
                                <label>IDENTIFICAÇÃO / TAG</label>
                                <input type="text" id="tag_resf" />
                            </div>
                        </div>

                        <div className="grid-3">
                            <div className="form-group">
                                <label>FABRICANTE</label>
                                <input type="text" id="fab_resf" />
                            </div>
                            <div className="form-group">
                                <label>TIPO CONSTRUTIVO</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="radio" name="tipo_const" value="Torre" /> Torre</label>
                                    <label className="custom-check"><input type="radio" name="tipo_const" value="Condensador" /> Condensador</label>
                                    <label className="custom-check"><input type="radio" name="tipo_const" value="Outro" /> Outro</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>ESTADO DO EQUIPAMENTO</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="radio" name="estado_equip" value="Nova" /> Nova</label>
                                    <label className="custom-check"><input type="radio" name="estado_equip" value="Usada" /> Usada</label>
                                </div>
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label>QUEM FORNECE O ATUAL TRATAMENTO?</label>
                                <input type="text" id="fornec_tratamento" />
                            </div>
                            <div className="form-group">
                                <label>CARGA TÉRMICA NOMINAL</label>
                                <div className="input-wrapper"><input type="number" id="carga_termica_nom" step="0.01" /><span>Mkcal/h</span></div>
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label>TIPO DE REPOSIÇÃO</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="checkbox" name="tipo_repo" value="Poco" /> Poço</label>
                                    <label className="custom-check"><input type="checkbox" name="tipo_repo" value="Rio" /> Rio</label>
                                    <label className="custom-check"><input type="checkbox" name="tipo_repo" value="Lago" /> Lago</label>
                                    <label className="custom-check"><input type="checkbox" name="tipo_repo" value="ETA" /> ETA</label>
                                    <label className="custom-check"><input type="checkbox" name="tipo_repo" value="Outro" /> Outro</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>PRÉ TRATAMENTO (CLARIFICAÇÃO)</label>
                                <div className="grid-2" style={{ gridTemplateColumns: 'auto 1fr', gap: '10px' }}>
                                    <div className="options-group">
                                        <label className="custom-check"><input type="radio" name="pre_trat" value="Sim" /> Sim</label>
                                        <label className="custom-check"><input type="radio" name="pre_trat" value="Nao" /> Não</label>
                                    </div>
                                    <input type="text" id="pre_trat_qual" placeholder="Qual?" />
                                </div>
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label>HIDRÔMETRO NA REPOSIÇÃO</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="radio" name="hidro_repo" value="Sim" /> Sim</label>
                                    <label className="custom-check"><input type="radio" name="hidro_repo" value="Nao" /> Não</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>TIPOS DE TROCADORES</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="checkbox" name="tipo_troc" value="CascoTubo" /> Casco tubo</label>
                                    <label className="custom-check"><input type="checkbox" name="tipo_troc" value="Camisa" /> Camisa</label>
                                    <label className="custom-check"><input type="checkbox" name="tipo_troc" value="Serpentina" /> Serpentina</label>
                                    <label className="custom-check"><input type="checkbox" name="tipo_troc" value="Outro" /> Outro</label>
                                </div>
                            </div>
                        </div>

                        <div className="grid-2">
                            <div className="form-group">
                                <label>TIPO DE RECHEIO</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="checkbox" name="tipo_recheio" value="Respingo" /> Respingo</label>
                                    <label className="custom-check"><input type="checkbox" name="tipo_recheio" value="Filme" /> Filme</label>
                                    <label className="custom-check"><input type="checkbox" name="tipo_recheio" value="Colmeia" /> Colmeia</label>
                                    <label className="custom-check"><input type="checkbox" name="tipo_recheio" value="Outro" /> Outro</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>METAIS NO CIRCUITO</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="checkbox" name="metais" value="AcoCarbono" /> Aço carbono</label>
                                    <label className="custom-check"><input type="checkbox" name="metais" value="Inox" /> Inox 304/316</label>
                                    <label className="custom-check"><input type="checkbox" name="metais" value="Cobre" /> Cobre</label>
                                    <label className="custom-check"><input type="checkbox" name="metais" value="Galvanizado" /> Galvanizado</label>
                                    <label className="custom-check"><input type="checkbox" name="metais" value="Ligas" /> Ligas</label>
                                    <label className="custom-check"><input type="checkbox" name="metais" value="Outro" /> Outro</label>
                                </div>
                            </div>
                        </div>

                        <div className="grid-3">
                            <div className="form-group">
                                <label>VAZÃO DE RECIRCULAÇÃO</label>
                                <div className="input-wrapper"><input type="number" id="vazao_recirc" step="0.1" /><span>m³/h</span></div>
                            </div>
                            <div className="form-group">
                                <label>VOLUME ÁGUA DAS BACIAS</label>
                                <div className="input-wrapper"><input type="number" id="vol_bacias" step="0.1" /><span>m³</span></div>
                            </div>
                            <div className="form-group">
                                <label>VOLUME TOTAL DO SISTEMA</label>
                                <div className="input-wrapper"><input type="number" id="vol_total" step="0.1" /><span>m³</span></div>
                            </div>
                        </div>

                        <div className="grid-3">
                            <div className="form-group">
                                <label>TEMP. ÁGUA QUENTE (RETORNO)</label>
                                <div className="input-wrapper"><input type="number" id="temp_quente" step="0.1" /><span>°C</span></div>
                            </div>
                            <div className="form-group">
                                <label>TEMP. ÁGUA FRIA (BACIA)</label>
                                <div className="input-wrapper"><input type="number" id="temp_fria" step="0.1" /><span>°C</span></div>
                            </div>
                            <div className="form-group">
                                <label>TEMPERATURA DE BULBO ÚMIDO (SE CONDENSADOR)</label>
                                <div className="input-wrapper"><input type="number" id="temp_bulbo" step="0.1" /><span>°C</span></div>
                            </div>
                        </div>

                        <div className="grid-3">
                            <div className="form-group">
                                <label>MONITORA/REGISTRA TEMPERATURA</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="radio" name="monitora_temp_resf" value="Sim" /> Sim</label>
                                    <label className="custom-check"><input type="radio" name="monitora_temp_resf" value="Nao" /> Não</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>TIPO DE PURGA</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="radio" name="purga_resf" value="Continua" /> Contínua</label>
                                    <label className="custom-check"><input type="radio" name="purga_resf" value="Intermitente" /> Intermitente</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Nº CÉLULAS/BACIAS INTERLIGADAS</label>
                                <input type="number" id="num_celulas" />
                            </div>
                        </div>

                        <div className="grid-3">
                            <div className="form-group">
                                <label>TIRAGEM</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="radio" name="tiragem" value="Forcada" /> Forçada</label>
                                    <label className="custom-check"><input type="radio" name="tiragem" value="Induzida" /> Induzida</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>REGIME DE OPERAÇÃO (h/dia)</label>
                                <div className="input-wrapper"><input type="number" id="regime_resf_hora" step="0.1" /><span>h/dia</span></div>
                            </div>
                            <div className="form-group">
                                <label>REGIME DE OPERAÇÃO (dia/mês)</label>
                                <div className="input-wrapper"><input type="number" id="regime_resf_dia" /><span>dia/mês</span></div>
                            </div>
                        </div>
                        
                        <div className="grid-2">
                            <div className="form-group">
                                <label>GERAÇÃO DE ENERGIA (CONDENSADOR)</label>
                                <div className="options-group">
                                    <label className="custom-check"><input type="radio" name="geracao_energia" value="Sim" /> Sim</label>
                                    <label className="custom-check"><input type="radio" name="geracao_energia" value="Nao" /> Não</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>DATA DA ÚLTIMA INSPEÇÃO</label>
                                <input type="date" id="data_inspecao_resf" />
                            </div>
                        </div>
                        <div className="form-group" style={{ marginTop: '15px' }}>
                            <label>OBSERVAÇÕES EXTRAS (RESFRIAMENTO):</label>
                            <textarea id="obs_extras_resf" placeholder="Observações específicas do sistema de resfriamento..."></textarea>
                        </div>
                    </div>
                </div>
                )}

                {/* 3. OBSERVAÇÕES FINAIS */}
                <div className="form-section">
                    <div className="section-header">
                        <h2>Observações Gerais</h2>
                        <div className="section-line"></div>
                    </div>
                    <div className="form-group">
                        <label>OBSERVAÇÕES EXTRAS GERAIS</label>
                        <textarea id="obs_extras" placeholder="Digite aqui informações adicionais importantes..."></textarea>
                    </div>
                </div>

                {/* Botões de Ação */}
                <div className="actions">
                    <button type="reset" className="btn btn-secondary">Limpar</button>
                    <button type="submit" className="btn btn-primary">GRAVAR DADOS</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};
