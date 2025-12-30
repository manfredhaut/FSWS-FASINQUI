/**
 * Interface para o retorno das funções de cálculo.
 */
interface IDosageResult {
  action: 'SHOCK_DOSAGE' | 'INCREASE' | 'MAINTAIN' | 'REDUCE' | 'DRASTIC_REDUCE';
  multiplier: number;
  alert?: string;
}

interface ISafetyCheckResult {
  safe: boolean;
  alert?: string;
}

/**
 * Módulo de Lógica de Negócio para Análises Químicas do FASINQUI.
 */
export class ChemicalAnalysisService {

  /**
   * Calcula a dosagem de sulfito necessária para o controle de oxigênio.
   * Implementa a lógica não-linear de dosagem baseada no residual medido.
   * @param currentPpm O residual de sulfito (SO3) medido na caldeira.
   * @returns Um objeto com a ação recomendada e o multiplicador de dosagem.
   */
  public static calculateSulfiteDosage(currentPpm: number): IDosageResult {
    if (currentPpm < 15) {
      return {
        action: 'SHOCK_DOSAGE',
        multiplier: 1.30,
        alert: 'CRITICAL: Risk of Pitting Corrosion. Oxygen ingress detected.'
      };
    } else if (currentPpm >= 15 && currentPpm < 30) {
      return {
        action: 'INCREASE',
        multiplier: 1.15,
      };
    } else if (currentPpm >= 30 && currentPpm <= 80) {
      return {
        action: 'MAINTAIN',
        multiplier: 1.0,
      };
    } else if (currentPpm > 80 && currentPpm <= 120) {
        return {
            action: 'REDUCE',
            multiplier: 0.90,
        };
    } else { // currentPpm > 120
      return {
        action: 'DRASTIC_REDUCE',
        multiplier: 0.80,
      };
    }
  }

  /**
   * Verifica a relação de segurança entre Alcalinidade Hidróxida e Sílica.
   * Previne a formação de incrustações vítreas de sílica.
   * @param hydroxideAlkalinity A concentração de Alcalinidade Hidróxida (OH-).
   * @param silica A concentração de Sílica (SiO2).
   * @returns Um objeto indicando se a condição é segura e um alerta em caso de risco.
   */
  public static checkSilicaSafety(hydroxideAlkalinity: number, silica: number): ISafetyCheckResult {
    if (silica === 0) {
      return { safe: true }; // Evita divisão por zero
    }

    const ratio = hydroxideAlkalinity / silica;

    if (ratio < 1.5) {
      return {
        safe: false,
        alert: 'CRITICAL: Risk of Vitreous Scale Precipitation. Increase Alkalinity immediately.'
      };
    }

    return { safe: true };
  }

  /**
   * Calcula os ciclos de concentração da caldeira.
   * Utiliza um traçador químico (Cloretos) para determinar a taxa de concentração.
   * @param chlorideBoiler A concentração de cloretos na água da caldeira.
   * @param chlorideMakeup A concentração de cloretos na água de reposição.
   * @returns O número de ciclos de concentração.
   */
  public static calculateCycles(chlorideBoiler: number, chlorideMakeup: number): number {
    if (chlorideMakeup === 0) {
      return 0; // Evita divisão por zero e indica problema
    }
    return chlorideBoiler / chlorideMakeup;
  }
}
