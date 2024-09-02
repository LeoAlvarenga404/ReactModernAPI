const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createEstudo = async (req, res) => {
  const { titulo, descricao, porcentagem, userId } = req.body;

  const status = porcentagem >= 100 ? 'Concluído' : 'Em Progresso';
  const novoEstudo = await prisma.study.create({
    data: {
      titulo,
      descricao,
      porcentagem,
      status,
      userId: parseInt(userId, 10),
    },
  });
  res.status(201).json(novoEstudo);
  } 

exports.deleteEstudo = async (req, res) => {
  const { id, userId } = req.params;
  const estudo = await prisma.study.findFirst({
    where: {
      id: parseInt(id, 10),
      userId: parseInt(userId, 10),
    },
  });

  if (!estudo) {
    return res.status(404).json({ error: 'Estudo não encontrado ou não pertence ao usuário.' });
  }

  await prisma.study.delete({
    where: { id: parseInt(id, 10) },
  });
  res.status(204).send();
};

exports.updateEstudo = async (req, res) => {
  const { id, userId } = req.params;
  const { titulo, descricao, porcentagem } = req.body;

  const status = porcentagem >= 100 ? 'Concluído' : 'Em Progresso';

  const estudo = await prisma.study.findFirst({
    where: {
      id: parseInt(id, 10),
      userId: parseInt(userId, 10),
    },
  });

  if (!estudo) {
    return res.status(404).json({ error: 'Estudo não encontrado ou não pertence ao usuário.' });
  }

  const estudoAtualizado = await prisma.study.update({
    where: { id: parseInt(id, 10) },
    data: {
      titulo,
      descricao,
      porcentagem,
      status,
    },
  });

    res.json(estudoAtualizado);
};

exports.getAllEstudos = async (req, res) => {
  const { userId } = req.params;

  const userIdInt = parseInt(userId, 10);

  const estudos = await prisma.study.findMany({
    where: { userId: userIdInt },
  });

  res.json(estudos);

};

exports.getEstudoById = async (req, res) => {
  const { id, userId } = req.params;

  const estudo = await prisma.study.findFirst({
    where: {
      id: parseInt(id, 10),
      userId: parseInt(userId, 10),
    },
  });

  if (!estudo) {
    return res.status(404).json({ error: 'Estudo não encontrado ou não pertence ao usuário.' });
  }

  res.json(estudo);

};
