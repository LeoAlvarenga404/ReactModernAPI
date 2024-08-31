const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Função que cria um estudo
exports.createEstudo = async (req, res) => {
  const { nome, descricao, porcentagemConcluida, finalizado } = req.body;

    const novoEstudo = await prisma.estudo.create({
      data: {
        nome,
        descricao,
        porcentagemConcluida,
        finalizado,
      },
    });
    res.status(201).json(novoEstudo);
 
};

// Função que apaga um estudo específico
exports.deleteEstudo = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.estudo.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar o estudo' });
  }
};

// Função que atualiza um estudo específico
exports.updateEstudo = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, porcentagemConcluida, finalizado } = req.body;
  try {
    const estudo = await prisma.estudo.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        descricao,
        porcentagemConcluida,
        finalizado,
      },
    });
    res.json(estudo);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Estudo não encontrado' });
    } else {
      res.status(500).json({ error: 'Erro ao atualizar o estudo' });
    }
  }
};

// Função que lista tudo
exports.getAllEstudos = async (req, res) => {
    const estudos = await prisma.estudo.findMany();
    res.json(estudos);
};

// Função para obter um estudo específico
exports.getEstudoById = async (req, res) => {
  const { id } = req.params;
  try {
    const estudo = await prisma.estudo.findUnique({
      where: { id: parseInt(id) },
    });
    if (!estudo) {
      return res.status(404).json({ error: 'Estudo não encontrado' });
    }
    res.json(estudo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar o estudo' });
  }
};
