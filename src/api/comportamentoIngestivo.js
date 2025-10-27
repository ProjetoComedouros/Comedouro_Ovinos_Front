import api from './api'; // Importa a instância do Axios que você criou

/**
 * Funções para requisições de Comportamento Ingestivo
 * animal_ou_lote: 'animal' ou 'lote'
 * numero: ID do animal (brinco) ou ID do lote
 * data: Data específica no formato 'DD-MM-AAAA' (opcional)
 */


// =========================================================
// ROTA: consumo-diario
// =========================================================

/**
 * Busca o consumo diário de um animal ou lote.
 * Rotas:
 * - /consumo-diario/<str:animal_ou_lote>/<int:numero>/
 * - /consumo-diario/<str:animal_ou_lote>/<int:numero>/<str:data>/
 * * @param {string} tipo - 'animal' ou 'lote'.
 * @param {number} id - Número do brinco (animal) ou ID do lote.
 * @param {string} [data=null] - Data no formato 'DD-MM-AAAA' (opcional).
 * @returns {Promise<Object>} Dados de consumo diário.
 */
export async function getConsumoDiario(tipo, id, data = null) {
    if (!['animal', 'lote'].includes(tipo)) {
        throw new Error("Tipo inválido. Use 'animal' ou 'lote'.");
    }
    
    // Constrói a URL base
    let url = `/consumo-diario/${tipo}/${id}/`;
    
    // Adiciona a data à URL se fornecida
    if (data) {
        url += `${data}/`;
    }

    try {
        const response = await api.get(url);
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        // Lança o erro para ser tratado pelo componente que chamou
        console.error("Erro ao buscar Consumo Diário:", error.response || error);
        throw error; 
    }
}


// =========================================================
// ROTA: minuto-por-refeicao
// =========================================================

/**
 * Busca o relatório de minuto por refeição de um animal ou lote.
 * Rotas:
 * - /minuto-por-refeicao/<str:animal_ou_lote>/<int:numero>/
 * - /minuto-por-refeicao/<str:animal_ou_lote>/<int:numero>/<str:data>/
 * * @param {string} tipo - 'animal' ou 'lote'.
 * @param {number} id - Número do brinco (animal) ou ID do lote.
 * @param {string} [data=null] - Data no formato 'DD-MM-AAAA' (opcional).
 * @returns {Promise<Object>} Dados de minuto por refeição.
 */
export async function getMinutoPorRefeicao(tipo, id, data = null) {
    if (!['animal', 'lote'].includes(tipo)) {
        throw new Error("Tipo inválido. Use 'animal' ou 'lote'.");
    }
    
    // Constrói a URL base
    let url = `/minuto-por-refeicao/${tipo}/${id}/`;
    
    // Adiciona a data à URL se fornecida
    if (data) {
        url += `${data}/`;
    }

    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar Minuto Por Refeição:", error.response || error);
        throw error;
    }
}