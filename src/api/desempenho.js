import api from './api'; // Importa a instância do Axios que você criou

/**
 * Funções para requisições de Desempenho
 * tipo: 'animal' ou 'lote'
 * id: ID do animal (brinco) ou ID do lote
 * data: Data específica no formato 'DD-MM-AAAA' (opcional, se aplicável)
 */

// =========================================================
// ROTA: /api/evolucao-peso-por-dia/{brinco}/
// [1] Evolução Peso: SÓ existe para ANIMAL (brinco)
// =========================================================

/**
 * Busca a evolução de peso de um animal.
 * Rota: /api/evolucao-peso-por-dia/{brinco}/
 * @param {string} tipo - 'animal' ou 'lote'.
 * @param {number} id - Número do brinco (animal) ou ID do lote.
 * @param {string} [data=null] - Data no formato 'DD-MM-AAAA' (opcional).
 * @returns {Promise<Object>} Dados de consumo diário.
 */
export async function getEvolucaoPeso(tipo, id) { // ⬅️ AGORA ACEITA TIPO
    if (!['animal', 'lote'].includes(tipo)) {
        throw new Error("Tipo inválido para evolução de peso. Use 'animal' ou 'lote'.");
    }
    if (!id) {
        throw new Error(`ID de ${tipo} é obrigatório para buscar evolução de peso.`);
    }
    // Inclui o tipo na rota
    const url = `evolucao-peso-por-dia/${tipo}/${id}/`; 
    const apiParams= {};

    if (tipo === 'animal') {
        // Se for animal, o filtro é 'animal.brincoId' (ou o nome que a API de relatórios espera)
        apiParams['animal.brincoId'] = id; 
    } else if (tipo === 'lote') {
        // Se for lote, o filtro é 'loteId'
        apiParams['loteId'] = id;
    }

    try {
        // 4. Passe 'apiParams' para a chamada 'get'
        const response = await api.get(url, { params: apiParams });
        console.log(`[API ROTA] evol-peso URL: ${url}`);
        console.log(`[API SUCESSO] evol-peso Dados Brutos:`, response.data);
        return response.data;
       
    } catch (error) {
        // Adicionei os parâmetros ao log de erro para facilitar o debug
        console.error(`Erro ao buscar Evolução de Peso para ${tipo} ${id} (URL: ${url}, Params: ${JSON.stringify(apiParams)}):`, error.response || error);
        throw error;
    }
}

// =========================================================
// ROTA: /api/evolucao-consumo-diario/{tipo}/{id}/
// [2] Evolução Consumo: Existe para ambos (animal/lote)
// =========================================================

/**
 * Busca a evolução do consumo diário de um animal ou lote.
 * Rota: /api/evolucao-consumo-diario/<str:tipo>/<int:id>/
 * @param {string} tipo - 'animal' ou 'lote'.
 * @param {number} id - Número do brinco (animal) ou ID do lote.
 * @returns {Promise<Object>} Dados de evolução de consumo diário.
 */
export async function getEvolucaoConsumoDiario(tipo, id) {
    if (!['animal', 'lote'].includes(tipo)) {
        throw new Error("Tipo inválido para evolução de consumo. Use 'animal' ou 'lote'.");
    }
    if (!id) {
        throw new Error(`ID de ${tipo} é obrigatório para buscar evolução de consumo diário.`);
    }
    const url = `evolucao-consumo-diario/${tipo}/${id}/`;

    const apiParams= {};

    if (tipo === 'animal') {
        apiParams['animal.brincoId'] = id;
    } else if (tipo === 'lote') {
        apiParams['loteId'] = id;
    }

    try {
        const response = await api.get(url, { params: apiParams });
        console.log(`[API ROTA] consumodiario URL: ${url}`);
        console.log(`[API SUCESSO] consumodiario Dados Brutos:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar Evolução de Consumo Diário para ${tipo} ${id}:`, error.response || error);
        throw error;
    }
}

// =========================================================
// ROTA: /api/evolucao-ganho/{brinco}/
// [3] Evolução Ganho: SÓ existe para ANIMAL (brinco)
// =========================================================

/**
 * Busca a evolução do ganho de peso de um animal.
 * Rota: /api/evolucao-ganho/{brinco}/
 * @param {string} tipo - 'animal' ou 'lote'.
 * @param {number} id - Número do brinco (animal) ou ID do lote.
 * @param {string} [data=null] - Data no formato 'DD-MM-AAAA' (opcional).
 * @returns {Promise<Object>} Dados de consumo diário.
 * @param {number} id - Número do brinco do animal.
 * @returns {Promise<Object>} Dados de evolução de ganho.
 */
export async function getEvolucaoGanho(tipo, id) { // ⬅️ AGORA ACEITA TIPO
    if (!['animal', 'lote'].includes(tipo)) {
        throw new Error("Tipo inválido para evolução de ganho. Use 'animal' ou 'lote'.");
    }
    if (!id) {
        throw new Error(`ID de ${tipo} é obrigatório para buscar evolução de ganho.`);
    }
    // Inclui o tipo na rota
    const url = `evolucao-ganho/${tipo}/${id}/`; 
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar Evolução de Ganho para ${tipo} ${id}:`, error.response || error);
        throw error;
    }
}

// =========================================================
// ROTA: /api/evolucao-gmd/{brinco}/
// [4] Evolução GMD: SÓ existe para ANIMAL (brinco)
// =========================================================

/**
 * Busca a evolução do Ganho Médio Diário (GMD) de um animal.
 * Rota: /api/evolucao-gmd/{brinco}/
 * @param {string} tipo - 'animal' ou 'lote'.
 * @param {number} id - Número do brinco (animal) ou ID do lote.
 * @param {string} [data=null] - Data no formato 'DD-MM-AAAA' (opcional).
 * @returns {Promise<Object>} Dados de consumo diário.
 * @param {number} id - Número do brinco do animal.
 * @returns {Promise<Object>} Dados de evolução de GMD.
 */
export async function getEvolucaoGMD(tipo, id) { // ⬅️ AGORA ACEITA TIPO
    if (!['animal', 'lote'].includes(tipo)) {
        throw new Error("Tipo inválido para evolução de GMD. Use 'animal' ou 'lote'.");
    }
    if (!id) {
        throw new Error(`ID de ${tipo} é obrigatório para buscar evolução de GMD.`);
    }
    // Inclui o tipo na rota
    const url = `evolucao-gmd/${tipo}/${id}/`; 
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar Evolução de GMD para ${tipo} ${id}:`, error.response || error);
        throw error;
    }
}