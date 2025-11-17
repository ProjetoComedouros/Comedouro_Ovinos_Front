// api/refeicoes.js
import api from './api'; // Importa a instância configurada do Axios

/**
 * Funções de Serviço para a entidade 'Refeições'.
 * Endpoint Base: /refeicoes/
 */

// =========================================================
// 1. GET (Leitura e Filtros)
// =========================================================

/**
 * Busca uma refeição específica ou lista todas as refeições, opcionalmente com filtros.
 * Rotas: GET /refeicoes/ ou GET /refeicoes/{id}/
 * Filtros: ?animal={id}, ?data=YYYY-MM-DD
 * @param {string | number | null} id - O ID (chave primária) da refeição, ou null para listar todas.
 * @param {Object} [filters={}] - Objeto com filtros opcionais (ex: { animal: 52, data: '2025-10-10' }).
 * @returns {Promise<Array | Object>} Retorna uma lista de refeições ou uma refeição única.
 */
export async function refeicaoGet(id = null, filters = {}) {
    // 1. Define a rota base: 'refeicoes/' ou 'refeicoes/{id}/'
    
    const url = id ? `refeicoes/${id}/` : `refeicoes/`;
    
    console.log("Filtro enviado:", filters.animal);

    const apiParams=  {};
    if(filters.animal){
        apiParams['animal.brincoId'] = filters.animal;
    }
    if(filters.data){
        apiParams['data'] = filters.data;
    }

    // console.log("filtro REAL enviado p api:", apiParams);
    try {
        // 2. A requisição GET usa o objeto 'params' para enviar os filtros como Query String
        // Os nomes das chaves em 'filters' devem ser 'animal' e 'data' (conforme o README)
        const response = await api.get(url, { params: apiParams });
        
        return response.data;
    } catch (error) {
        console.error(`[API Erro] Falha ao buscar Refeição(ões) ${id || 'todas'}:`, error.response || error);
        throw error;
    }
}

// =========================================================
// 2. POST (Criação)
// =========================================================

/**
 * Cria um novo registro de refeição.
 * Rota: POST /refeicoes/
 * @param {Object} data - Objeto contendo os dados da refeição (horario_entrada, consumo_kg, animal, etc.).
 * @returns {Promise<Object>} Retorna a refeição criada.
 */
export async function refeicaoCreate(data) {
    // Você pode adicionar validações aqui (ex: verificar se data.animal existe)
    
    const url = 'refeicoes/'; 

    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        console.error("[API Erro] Falha ao criar nova Refeição:", error.response || error);
        throw error;
    }
}

// =========================================================
// 3. PUT (Atualização Completa)
// =========================================================

/**
 * Atualiza todas as informações de uma refeição existente.
 * Rota: PUT /refeicoes/{id}/
 * @param {string | number} id - O ID (chave primária) da refeição a ser atualizada.
 * @param {Object} data - Objeto com os dados de atualização.
 * @returns {Promise<Object>} Retorna a refeição atualizada.
 */
export async function refeicaoUpdate(id, data) {
    if (!id) {
        throw new Error("ID da refeição é obrigatório para atualização (PUT).");
    }

    const url = `refeicoes/${id}/`;

    try {
        // Usa o método PUT para substituição completa do recurso
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        console.error(`[API Erro] Falha ao atualizar refeição ${id} (PUT):`, error.response || error);
        throw error;
    }
}

// =========================================================
// 4. DELETE (Exclusão)
// =========================================================

/**
 * Remove uma refeição específica.
 * Rota: DELETE /refeicoes/{id}/
 * @param {string | number} id - O ID (chave primária) da refeição a ser excluído.
 * @returns {Promise<Object>} Retorna uma resposta de sucesso/vazia.
 */
export async function refeicaoDelete(id) {
    if (!id) {
        throw new Error("ID da refeição é obrigatório para exclusão.");
    }

    const url = `refeicoes/${id}/`;

    try {
        const response = await api.delete(url);
        return response.data; // Normalmente retorna 204 No Content ou um objeto vazio
    } catch (error) {
        console.error(`[API Erro] Falha ao excluir refeição ${id}:`, error.response || error);
        throw error;
    }
}