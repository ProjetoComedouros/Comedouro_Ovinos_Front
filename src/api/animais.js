import api from "./api";


// faz uma requisição GET para a rota /animais/ e retorna a resposta
export async function animalGet(id=null) {
    try {
        const route = id ? `animais/${id}/` : `animais/`;
        const response = await api.get(route);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


// faz uma requisição POST para a rota /animais/ e retorna a resposta
export async function animalCreate(data = {}) {
  try {
    // define o corpo da requisição
    const body = {
      sexo: null,
      meses: null,
      raca: "",
      categoria: "",
      frequencia_livre: false,
      frequencia: null,
      brinco: null,
      lote: null,
      ...data // sobrepõe os valores padrão
    };

    const response = await api.post('animais/', body);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function animalUpdate(id, data = {}) {
  try {
    const response = await api.put(`animais/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar o animal ${id}:`, error);
    throw error;
  }
}


// faz uma requisição DELETE para a rota /animais/<id> e retorna a resposta
export async function animalDelete(id) {
  try {
    const response = await api.delete(`animais/${id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}