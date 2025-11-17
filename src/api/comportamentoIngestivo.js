import api from './api.js';

/**
 * Busca o consumo diário (resumo) OU os dados por hora (detalhe).
 * Se 'data' for null, retorna o resumo diário (ex: {"2025-10-10": 55.1}).
 * Se 'data' for (YYYY-MM-DD), retorna o detalhe por hora (ex: {"12:58:00": 300.5}).
 */
export async function getConsumoDiario(tipo, id, data = null) {
    if (!['animal', 'lote'].includes(tipo)) {
        throw new Error("Tipo inválido. Use 'animal' ou 'lote'.");
    }

    // Constrói a URL base
    let url = `consumo-diario/${tipo}/${id}/`;

    // ⬅️ ATUALIZAÇÃO AQUI
    // Se uma data for fornecida, anexa à URL
    if (data) {
        url += `${data}/`;
    }

    console.log(`[API ROTA] Consumo Diário URL: ${url}`);

    try {
        const response = await api.get(url);
        console.log(`[API SUCESSO] Consumo Diário Dados Brutos:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`[API ERRO] Consumo Diário Falhou para ${tipo}/${id}:`, error.response?.status, error.response?.data);
        throw error;
    }
}

/**
 * Busca o tempo médio por refeição (resumo diário).
 * Esta função não muda.
 */
export async function getMinutoPorRefeicao(tipo, id, data = null) {
    if (!['animal', 'lote'].includes(tipo)) {
        throw new Error("Tipo inválido. Use 'animal' ou 'lote'.");
    }

    let url = `minuto-por-refeicao/${tipo}/${id}`;
    if (data) {
        url += `/${data}/`;
    }

    console.log(`[API ROTA] Min/Refeição URL: ${url}`);
    try {
        const response = await api.get(url);
        console.log(`[API SUCESSO] Min/Refeição Dados Brutos:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`[API ERRO] Min/Refeição Falhou para ${tipo}/${id}:`, error.response?.status, error.response?.data);
        throw error;
    }
}