// api/lotes.js
import api from './api'; // Importa a instância configurada do Axios

/**
 * Funções de Serviço para a entidade 'Lotes'.
 * Endpoint Base: /lotes/
 */

// =========================================================
// 1. GET (Leitura)
// =========================================================

/**
 * Busca um lote específico ou lista todos os lotes.
 * Rotas: GET /lotes/ ou GET /lotes/{id}/
 * @param {string | number | null} id - O ID do lote, ou null para listar todos.
 * @returns {Promise<Array | Object>} Retorna uma lista de lotes ou um lote único.
 */
export async function loteGet(id = null) {
    // Se o ID for fornecido, a rota é 'lotes/{id}/'; caso contrário, é 'lotes/'.
    const url = id ? `lotes/${id}/` : `lotes/`;

    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error(`[API Erro] Falha ao buscar Lote(s) ${id || 'todos'}:`, error.response || error);
        throw error;
    }
}

// =========================================================
// 2. POST (Criação)
// =========================================================

/**
 * Cria um novo lote.
 * Rota: POST /lotes/
 * @param {Object} data - Objeto contendo { nome: "Lote 01", n_animais: 10, ... }
 * @returns {Promise<Object>} Retorna o lote criado.
 */
export async function loteCreate(data) {
    if (!data.nome) {
        throw new Error("O nome do lote é obrigatório para a criação.");
    }

    // A rota para criação (POST) é o endpoint base
    const url = 'lotes/'; 

    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        console.error("[API Erro] Falha ao criar novo Lote:", error.response || error);
        throw error;
    }
}

// =========================================================
// 3. PUT (Atualização)
// =========================================================

/**
 * Atualiza todas as informações de um lote existente.
 * Rota: PUT /lotes/{id}/
 * @param {string | number} id - O ID do lote a ser atualizado.
 * @param {Object} data - Objeto com os dados de atualização.
 * @returns {Promise<Object>} Retorna o lote atualizado.
 */
export async function loteUpdate(id, data) {
    if (!id) {
        throw new Error("ID do lote é obrigatório para atualização (PUT).");
    }

    const url = `lotes/${id}/`;

    try {
        // Usa o método PUT para substituição completa do recurso
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        console.error(`[API Erro] Falha ao atualizar lote ${id} (PUT):`, error.response || error);
        throw error;
    }
}

// =========================================================
// 4. DELETE (Exclusão)
// =========================================================

/**
 * Remove um lote específico.
 * Rota: DELETE /lotes/{id}/
 * @param {string | number} id - O ID do lote a ser excluído.
 * @returns {Promise<Object>} Retorna uma resposta de sucesso/vazia.
 */
export async function loteDelete(id) {
    if (!id) {
        throw new Error("ID do lote é obrigatório para exclusão.");
    }

    const url = `lotes/${id}/`;

    try {
        const response = await api.delete(url);
        return response.data; // Normalmente retorna 204 No Content ou um objeto vazio
    } catch (error) {
        console.error(`[API Erro] Falha ao excluir lote ${id}:`, error.response || error);
        throw error;
    }
}