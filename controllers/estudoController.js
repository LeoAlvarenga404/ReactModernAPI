// É necessário importar o prismaclient para conectar com o banco
const { PrismaClient } = require('@prisma/client');

// Depois de importar o prismaclient, esse aqui cria uma instância para acessar o banco 
const prisma = new PrismaClient();

// func cria um novo estudo
async function criarEstudo(req, res) {
  // pega o título, descrição, porcentagem e o userId do body
  const { titulo, descricao, porcentagem, userId } = req.body;

  // na hora de fazer o post, verifica se tem titulo e o id do usuario (obrigatórios)
  if (!titulo || !userId) {
    return res.status(400).json({ error: 'Título e userId são obrigatórios' });
  }

  const status = porcentagem >= 100 ? 'Concluído' : 'Em Progresso';
  
  // func cria um novo estudo no banco
  const novoEstudo = await prisma.study.create({
    data: { titulo, descricao, porcentagem, status, userId: parseInt(userId, 10) }, // parseint é para converter o userId para um inteiro caso não seja, para não dar erro na hora do post.
  });
  
  // json com o estudo que foi criado atraves do post
  res.status(201).json(novoEstudo);
}

// func deletar um estudo existente
async function deletarEstudo(req, res) {
  // pega o id e o user id do parametro da rota 
  const { id, userId } = req.params;

  // busca o estudo pelo id e o userId fornecidos
  const estudo = await prisma.study.findFirst({
    where: { id: parseInt(id, 10), userId: parseInt(userId, 10) },
  });

  // verifica se o estudo existe e pertence ao usuário 
  if (!estudo) {
    return res.status(404).json({ error: 'Estudo não encontrado ou não pertence ao usuário.' });
  }

  // deleta o estudo do banco de dados
  await prisma.study.delete({ where: { id: parseInt(id, 10) } });
  
  // opcional, retorna 204 que a requisição foi sucedida e não tem nenhum retorno
  res.status(204).send();
}

// func atualiza um estudo (PUT)
async function atualizarEstudo(req, res) {
  // pega o id, userId do paramatro da rota
  const { id, userId } = req.params;
  // pega o titulo, descricao, porcentagem do body
  const { titulo, descricao, porcentagem } = req.body;

  const status = porcentagem >= 100 ? 'Concluído' : 'Em Progresso';
  
  // busca o estudo pelo id e userId fornecidos
  const estudo = await prisma.study.findFirst({
    where: { id: parseInt(id, 10), userId: parseInt(userId, 10) },
  });

  // verifica se o estudo existe e pertence ao usuário
  if (!estudo) {
    return res.status(404).json({ error: 'Estudo não encontrado ou não pertence ao usuário.' });
  }

  // atualiza o estudo com os novos dados
  const estudoAtualizado = await prisma.study.update({
    where: { id: parseInt(id, 10) },
    data: { titulo, descricao, porcentagem, status },
  });

  // retorna o estudo atualizado
  res.json(estudoAtualizado);
}

// func que pega todos os estudos que tem no usuário fornecido.
async function obterTodosEstudos(req, res) {

  const { userId } = req.params;

  // Busca todos os estudos do usuário
  const estudos = await prisma.study.findMany({ where: { userId: parseInt(userId, 10) } });
  
  // Retorna a lista de estudos
  res.json(estudos);
}

// func que busca um estudo específico (por id do usuario e id do estudo)
async function obterEstudoPeloId(req, res) {

  const { id, userId } = req.params;

  const estudo = await prisma.study.findFirst({
    where: { id: parseInt(id, 10), userId: parseInt(userId, 10) },
  });

  if (!estudo) {
    return res.status(404).json({ error: 'Estudo não encontrado ou não pertence ao usuário.' });
  }
  res.json(estudo);
}

// exporta as funções que sera usado no routes para definir as rotas de requisição.

module.exports = {
  criarEstudo,
  deletarEstudo,
  obterTodosEstudos,
  obterEstudoPeloId,
  atualizarEstudo
};
