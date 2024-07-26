import axios from 'axios';

const API_URL = 'http://localhost:8000/api/pessoas/';

export const getAllPessoas = () => {
  return axios.get(API_URL);
};


export const getPessoa = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response;
  } catch (error) {
    handleAxiosError(error);
  }
};


export const getPessoasByNome = async (nome) => {
  try {
    const response = await axios.get(API_URL, {
      params: { nome: nome }
    });
    return response;
  } catch (error) {
    console.error('Error fetching pessoas by nome:', error);
  }
};

export const addPessoa = (pessoa) => {
  return axios.post(API_URL, pessoa);
};


export const updatePessoa = (id, pessoa) => {
  return axios.put(`${API_URL}${id}/`, pessoa);
};


export const deletePessoa = (id) => {
  return axios.delete(`${API_URL}${id}/`);
};


export const getPesoIdeal = (id) => {
  return axios.get(`${API_URL}${id}/peso_ideal/`);
};


const handleAxiosError = (error) => {
  if (error.response) {
    // O servidor respondeu com um status fora do intervalo de 2xx
    if (error.response.status === 404) {
      console.error('Recurso não encontrado. Por favor, verifique o ID ou a URL.');
    } else {
      console.error(`Erro: ${error.response.status} - ${error.response.statusText}`);
    }
  } else if (error.request) {
    // A requisição foi feita, mas não houve resposta
    console.error('Erro de rede. Tente novamente mais tarde.');
  } else {
    // Algo aconteceu na configuração da requisição que causou o erro
    console.error(`Erro ao configurar a requisição: ${error.message}`);
  }
};