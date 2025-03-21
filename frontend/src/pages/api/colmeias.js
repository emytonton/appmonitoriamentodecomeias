import axios from 'axios';

const backendUrl = 'http://localhost:3000'; // URL do backend

export const config = {
  api: {
    bodyParser: true, // Garante que req.body seja interpretado como JSON
  },
};

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Buscar todas as colmeias
      const response = await axios.get(`${backendUrl}/colmeias`);
      res.status(200).json(response.data);
    } else if (req.method === 'POST') {
      // Criar uma nova colmeia
      const response = await axios.post(`${backendUrl}/colmeias`, req.body);
      res.status(201).json(response.data);
    } else if (req.method === 'PUT') {
      // Atualizar uma colmeia existente
      const { id } = req.query;
      const response = await axios.put(`${backendUrl}/colmeias/${id}`, req.body);
      res.status(200).json(response.data);
    } else if (req.method === 'DELETE') {
      // Deletar uma colmeia
      const { id } = req.query;
      await axios.delete(`${backendUrl}/colmeias/${id}`);
      res.status(204).end();
    } else {
      res.status(405).json({ message: 'Método não permitido' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar a requisição', details: error.message });
  }
}