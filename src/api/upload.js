// api/upload.js
import api from './api'; // Importa a instância configurada do Axios

/**
 * Funções de Serviço para Criação via CSV (Upload de Arquivos).
 * Endpoint: POST /api/cria-animais-com-csv/
 */

// =========================================================
// 1. POST (Upload de CSV)
// =========================================================

/**
 * Envia o arquivo CSV para o servidor para criar animais e refeições.
 * Rota: POST /cria-animais-com-csv/
 * Requer: multipart/form-data
 * @param {File} file - O objeto File do input do usuário.
 * @returns {Promise<Object>} Resposta de sucesso (ex: { "sucesso": "..." }).
 */
export async function uploadCSV(file) {
    if (!file) {
        throw new Error("O arquivo CSV é obrigatório para o upload.");
    }
    
    // 1. Cria o objeto FormData
    const formData = new FormData();
    // 2. Adiciona o arquivo com o nome do campo EXATO esperado pela API ('arquivo')
    formData.append('arquivo', file); 

    // A rota é o endpoint base
    const url = 'cria-animais-com-csv/'; 

    try {
        // 3. Faz a requisição POST
        const response = await api.post(
            url, 
            formData, 
            {
                // ATENÇÃO: É uma boa prática informar o Content-Type como 'multipart/form-data',
                // mas o Axios/navegador geralmente definem o boundary correto automaticamente
                // quando se passa um objeto FormData.
                headers: {
                    // Omitimos o Content-Type para deixar o Axios configurar o 'boundary'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("[API Erro] Falha ao fazer upload do CSV:", error.response || error);
        throw error;
    }
}