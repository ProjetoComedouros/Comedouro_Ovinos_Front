import api from './api'; // Importa a instância do Axios

/**
 * Funções para requisições de Viabilidade Econômica
 * tipo: 'animal' ou 'lote'
 * id: ID do animal (brinco) ou ID do lote
 */

// =========================================================
// ROTA: viabilidade/custo-total
// =========================================================

/**
 * Busca o custo total de um animal ou lote com base no preço da ração.
 * Rota: /viabilidade/custo-total/<str:tipo>/<int:id>/?preco_kg_racao=<float>
 * @param {string} tipo - 'animal' ou 'lote'.
 * @param {number} id - Número do brinco (animal) ou ID do lote.
 * @param {number} precoKgRacao - Preço por quilo da ração.
 * @returns {Promise<Object>} Dados de custo total.
 */
export async function getCustoTotal(tipo, id, precoKgRacao) {
    if (!['animal', 'lote'].includes(tipo)) {
        throw new Error("Tipo inválido. Use 'animal' ou 'lote'.");
    }
    if (!id) {
        throw new Error(`ID de ${tipo} é obrigatório para buscar custo total.`);
    }
    const url = `custo-total/${tipo}/${id}/${precoKgRacao}/`;
    try {
        // A chamada Axios é simplificada, pois o preço está na URL
        const response = await api.get(url); 
        console.log(`[API ROTA] custototal URL: ${url}`);
        console.log(`[API SUCESSO] custototal Dados Brutos:`, response.data);
        return response.data;
        
    } catch (error) {
        console.error(`Erro ao buscar Custo Total para ${tipo} ${id}:`, error.response || error);
        throw error;
    }
}

// =========================================================
// ROTA: viabilidade/evolucao-custo-diario
// =========================================================

/**
 * Busca a evolução do custo diário de um animal ou lote.
 * Rota: /viabilidade/evolucao-custo-diario/<str:tipo>/<int:id>/?preco_kg_racao=<float>
 * @param {string} tipo - 'animal' ou 'lote'.
 * @param {number} id - Número do brinco (animal) ou ID do lote.
 * @param {number} precoKgRacao - Preço por quilo da ração.
 * @returns {Promise<Object>} Dados de evolução do custo diário.
 */
export async function getEvolucaoCustoDiario(tipo, id, precoKgRacao) {
    if (!['animal', 'lote'].includes(tipo)) {
        throw new Error("Tipo inválido. Use 'animal' ou 'lote'.");
    }
    if (!id) {
        throw new Error(`ID de ${tipo} é obrigatório para buscar evolução de custo diário.`);
    }
    const url = `evolucao-custo-diario/${tipo}/${id}/${precoKgRacao}/`;
    const apiParams= {
        preco_kg_racao: precoKgRacao
    }; 

    try {
        const response = await api.get(url, { params: apiParams }); 
        console.log(`[API ROTA] evolcusto URL: ${url}`);
        console.log(`[API SUCESSO] evolcusto Dados Brutos:`, response.data);
        return response.data;
        
    } catch (error) {
        console.error(`Erro ao buscar Evolução de Custo Diário para ${tipo} ${id}:`, error.response || error);
        throw error;
    }
}

// =========================================================
// ROTA: viabilidade/ganho-por-dia
// =========================================================

/**
 * Busca o ganho por dia de um animal ou lote com base no preço do peso vivo.
 * Rota: /viabilidade/ganho-por-dia/<str:tipo>/<int:id>/?preco_kg_peso_vivo=<float>
 * @param {string} tipo - 'animal' ou 'lote'.
 * @param {number} id - Número do brinco (animal) ou ID do lote.
 * @param {number} precoKgPesoVivo - Preço por quilo do peso vivo.
 * @returns {Promise<Object>} Dados de ganho por dia.
 */
export async function getGanhoPorDia(tipo, id, precoKgPesoVivo) {

    if (!['animal', 'lote'].includes(tipo)) {
        throw new Error("Tipo inválido. Use 'animal' ou 'lote'.");
    }
    // Adicione a verificação de ID se não estiver lá
    if (!id) {
        throw new Error(`ID de ${tipo} é obrigatório.`);
    }
    
    const url = `ganho-por-dia/${tipo}/${id}/${precoKgPesoVivo}/`;

    const apiParams= {
        preco_kg_peso_vivo: precoKgPesoVivo
    }; 

    try {
        // A chamada Axios é simplificada, pois o preço está na URL
        const response = await api.get(url, { params: apiParams }); 
        return response.data;
        
    } catch (error) {
        console.error(`Erro ao buscar Ganho por Dia para ${tipo} ${id}:`, error.response || error);
        throw error;
    }
}
