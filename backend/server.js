const express = require('express');
const cors = require('cors');
const app = express();

// Middleware para habilitar CORS para todas as rotas
app.use(cors({
  origin: 'http://localhost:3001', // Permite o frontend em localhost:3001
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite esses métodos
  allowedHeaders: ['Content-Type'], // Permite o cabeçalho Content-Type
  preflightContinue: false, // Impede o envio de múltiplos preflights
  optionsSuccessStatus: 204 // Para garantir que a requisição OPTIONS tenha sucesso
}));

// Usar o express para poder analisar o corpo das requisições (necessário para POST)
app.use(express.json()); // Para interpretar o corpo das requisições como JSON

// Rota para criar uma nova colmeia (POST)
app.post('/colmeias', (req, res) => {
  const newColmeia = req.body; // Recebe os dados enviados no corpo da requisição
  console.log(newColmeia); // Exibe os dados no console para debug

  // Aqui você pode adicionar lógica para salvar a nova colmeia no banco de dados

  res.status(201).send({ message: 'Colmeia criada com sucesso!', colmeia: newColmeia });
});

// Rota para pegar as colmeias cadastradas (GET)
app.get('/colmeias', (req, res) => {
  const colmeias = [
    { id: '1', nome: 'Colmeia Feliz', localizacao: 'Local 3', temperatura: 25.5, umidade: 60, criadoEm: new Date() },
    // Adicione outras colmeias de teste aqui
  ];
  res.json(colmeias);
});

// Rodando o servidor na porta 3000
// Permitir que o navegador realize a requisição OPTIONS para verificar CORS
app.options('/colmeias', cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }));
  