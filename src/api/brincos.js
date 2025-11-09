// api/brincos.js
import api from './api'; // Importa a instância configurada do Axios

/**
 * Funções de Serviço para a entidade 'Brincos'.
 * Endpoint Base: /brincos/
 */

// =========================================================
// 1. GET (Leitura)
// =========================================================

/**
 * Busca um brinco específico ou lista todos os brincos.
 * Rotas: GET /brincos/ ou GET /brincos/{id}/
 * @param {string | number | null} id - O ID (chave primária) do brinco, ou null para listar todos.
 * @returns {Promise<Array | Object>} Retorna uma lista de brincos ou um brinco único.
 */
export async function brincoGet(id = null) {
    // Se o ID for fornecido, a rota é 'brincos/{id}/'; caso contrário, é 'brincos/'.
    const url = id ? `brincos/${id}/` : `brincos/`;

    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error(`[API Erro] Falha ao buscar Brinco(s) ${id || 'todos'}:`, error.response || error);
        throw error;
    }
}

// =========================================================
// 2. POST (Criação)
// =========================================================

/**
 * Cria um novo brinco.
 * Rota: POST /brincos/
 * @param {Object} data - Objeto contendo { tag_id: "TAG1234", numero: "001" }
 * @returns {Promise<Object>} Retorna o brinco criado.
 */
export async function brincoCreate(data) {
    if (!data.tag_id || !data.numero) {
        throw new Error("Os campos 'tag_id' e 'numero' são obrigatórios para a criação do brinco.");
    }

    // A rota para criação (POST) é o endpoint base
    const url = 'brincos/'; 

    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        console.error("[API Erro] Falha ao criar novo Brinco:", error.response || error);
        throw error;
    }
}

// =========================================================
// 3. PUT (Atualização)
// =========================================================

/**
 * Atualiza todas as informações de um brinco existente.
 * Rota: PUT /brincos/{id}/
 * @param {string | number} id - O ID (chave primária) do brinco a ser atualizado.
 * @param {Object} data - Objeto com os dados de atualização (ex: { tag_id: "TAG1234", numero: "002" }).
 * @returns {Promise<Object>} Retorna o brinco atualizado.
 */
export async function brincoUpdate(id, data) {
    if (!id) {
        throw new Error("ID do brinco é obrigatório para atualização (PUT).");
    }

    const url = `brincos/${id}/`;

    try {
        // Usa o método PUT para substituição completa do recurso
        const response = await api.put(url, data);
        return response.data;
    } catch (error) {
        console.error(`[API Erro] Falha ao atualizar brinco ${id} (PUT):`, error.response || error);
        throw error;
    }
}

// =========================================================
// 4. DELETE (Exclusão)
// =========================================================

/**
 * Remove um brinco específico.
 * Rota: DELETE /brincos/{id}/
 * @param {string | number} id - O ID (chave primária) do brinco a ser excluído.
 * @returns {Promise<Object>} Retorna uma resposta de sucesso/vazia.
 */
export async function brincoDelete(id) {
    if (!id) {
        throw new Error("ID do brinco é obrigatório para exclusão.");
    }

    const url = `brincos/${id}/`;

    try {
        const response = await api.delete(url);
        return response.data; // Normalmente retorna 204 No Content ou um objeto vazio
    } catch (error) {
        console.error(`[API Erro] Falha ao excluir brinco ${id}:`, error.response || error);
        throw error;
    }
}