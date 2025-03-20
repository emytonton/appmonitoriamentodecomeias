const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(express.json());

// endpoint para criar uma nova colmeia (POST /colmeias)
app.post('/colmeias', async (req, res) => {
  const { nome, localizacao, temperatura, umidade } = req.body;

  try {
    const colmeia = await prisma.colmeia.create({
      data: {
        nome,
        localizacao,
        temperatura,
        umidade,
      },
    });
    res.status(201).json(colmeia);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar colmeia', details: error.message });
  }
});

// endpoint para listar todas as colmeias (GET /colmeias)
app.get('/colmeias', async (req, res) => {
  try {
    const colmeias = await prisma.colmeia.findMany();
    res.status(200).json(colmeias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar colmeias', details: error.message });
  }
});

// endpoint para buscar uma colmeia por ID (GET /colmeias/:id)
app.get('/colmeias/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const colmeia = await prisma.colmeia.findUnique({
      where: { id },
    });

    if (!colmeia) {
      return res.status(404).json({ error: 'Colmeia não encontrada' });
    }

    res.status(200).json(colmeia);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar colmeia', details: error.message });
  }
});

// endpoint para atualizar uma colmeia (PUT /colmeias/:id)
app.put('/colmeias/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, localizacao, temperatura, umidade } = req.body;

  try {
    const colmeia = await prisma.colmeia.update({
      where: { id },
      data: {
        nome,
        localizacao,
        temperatura,
        umidade,
      },
    });
    res.status(200).json(colmeia);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar colmeia', details: error.message });
  }
});

// endpoint para deletar uma colmeia (DELETE /colmeias/:id)
app.delete('/colmeias/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.colmeia.delete({
      where: { id },
    });
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar colmeia', details: error.message });
  }
});

// iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});