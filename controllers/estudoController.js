// É necessário importar o prismaclient para conectar com o banco
const { PrismaClient } = require('@prisma/client');

// Depois de importar o prismaclient, esse aqui cria uma instância para acessar o banco 
const prisma = new PrismaClient();

// Função que cria um novo estudo
async function criarEstudo(req, res) {
  // Extrai título, descrição, porcentagem e userId do corpo da requisição
  const { titulo, descricao, porcentagem, userId } = req.body;

  // Verifica se o título e o userId foram fornecidos
  if (!titulo || !userId) {
    return res.status(400).json({ error: 'Título e userId são obrigatórios' });
  }

  // Define o status com base na porcentagem concluída
  const status = porcentagem >= 100 ? 'Concluído' : 'Em Progresso';
  
  // Cria um novo estudo no banco de dados
  const novoEstudo = await prisma.study.create({
    data: { titulo, descricao, porcentagem, status, userId: parseInt(userId, 10) },
  });
  
  // Retorna o novo estudo criado
  res.status(201).json(novoEstudo);
}

// Função para deletar um estudo existente
async function deletarEstudo(req, res) {
  // Extrai id e userId dos parâmetros da requisição
  const { id, userId } = req.params;

  // Busca o estudo pelo id e userId fornecidos
  const estudo = await prisma.study.findFirst({
    where: { id: parseInt(id, 10), userId: parseInt(userId, 10) },
  });

  // Verifica se o estudo existe e pertence ao usuário
  if (!estudo) {
    return res.status(404).json({ error: 'Estudo não encontrado ou não pertence ao usuário.' });
  }

  // Deleta o estudo do banco de dados
  await prisma.study.delete({ where: { id: parseInt(id, 10) } });
  
  // Retorna status 204 indicando que a operação foi bem-sucedida e não há conteúdo para retornar
  res.status(204).send();
}

// Função para atualizar um estudo existente
async function atualizarEstudo(req, res) {
  // Extrai id, userId e os novos dados do corpo da requisição
  const { id, userId } = req.params;
  const { titulo, descricao, porcentagem } = req.body;

  // Define o status com base na porcentagem concluída
  const status = porcentagem >= 100 ? 'Concluído' : 'Em Progresso';
  
  // Busca o estudo pelo id e userId fornecidos
  const estudo = await prisma.study.findFirst({
    where: { id: parseInt(id, 10), userId: parseInt(userId, 10) },
  });

  // Verifica se o estudo existe e pertence ao usuário
  if (!estudo) {
    return res.status(404).json({ error: 'Estudo não encontrado ou não pertence ao usuário.' });
  }

  // Atualiza o estudo com os novos dados
  const estudoAtualizado = await prisma.study.update({
    where: { id: parseInt(id, 10) },
    data: { titulo, descricao, porcentagem, status },
  });

  // Retorna o estudo atualizado
  res.json(estudoAtualizado);
}

// Função para obter todos os estudos de um usuário
async function obterTodosEstudos(req, res) {
  // Extrai userId dos parâmetros da requisição
  const { userId } = req.params;

  // Busca todos os estudos do banco de dados para o userId fornecido
  const estudos = await prisma.study.findMany({ where: { userId: parseInt(userId, 10) } });
  
  // Retorna a lista de estudos
  res.json(estudos);
}

// Função para obter um estudo específico por id
async function obterEstudoPeloId(req, res) {
  // Extrai id e userId dos parâmetros da requisição
  const { id, userId } = req.params;

  // Busca o estudo pelo id e userId fornecidos
  const estudo = await prisma.study.findFirst({
    where: { id: parseInt(id, 10), userId: parseInt(userId, 10) },
  });

  // Verifica se o estudo existe e pertence ao usuário
  if (!estudo) {
    return res.status(404).json({ error: 'Estudo não encontrado ou não pertence ao usuário.' });
  }

  // Retorna o estudo encontrado
  res.json(estudo);
}

// exporta as funções

module.exports = {
  criarEstudo,
  deletarEstudo,
  obterTodosEstudos,
  obterEstudoPeloId,
  atualizarEstudo
};
