// É necessário importar o prismaclient para conectar com o banco
const { PrismaClient } = require('@prisma/client');
// bcrypt criptografa e descriptografa a senha
const bcrypt = require('bcrypt');
// jsonwebtoken cria e verifica os tokens JWT
const jwt = require('jsonwebtoken');

// Depois de importar o prismaclient, esse aqui cria uma instância para acessar o banco 
const prisma = new PrismaClient();

// Função para criar um usuário
async function criarUsuario(req, res) {
  // pega o nome, email e senha do body
  const { nome, email, senha } = req.body;

  // condição que verifica se todos os campos estão preenchidos
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
  }

    // verifica se já existe um usuário com um email igual
    const usuarioExistente = await prisma.user.findUnique({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ erro: 'Email já está em uso' });
    }

    // criptografa a senha usando o bcrypt
    const senhaCriptografada = await bcrypt.hash(senha, 10); // esse 10 é o nivel da criptografia dele, quanto maior o número, mais complexo e seguro.

    // cria um novo usuário no banco de dados
    const novoUsuario = await prisma.user.create({
      data: { nome, email, senha: senhaCriptografada },
    });

    // aqui está pegando a senha do usuário e renomeando para "_" por questões de segurança. depois está pegando todas as outras informações e atribuindo pro novoUsuário
    const { senha: _, ...usuarioSemSenha } = novoUsuario;

    // retorna os dados do novo usuário sem a senha
    res.status(201).json(usuarioSemSenha);
  }

// Função para fazer login de um usuário
async function loginUsuario(req, res) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  const usuario = await prisma.user.findUnique({ where: { email } });

  if (!usuario) {
    return res.status(401).json({ erro: 'Email ou senha inválidos' });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    return res.status(401).json({ erro: 'Email ou senha inválidos' });
  }

  const token = jwt.sign({ usuarioId: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '6h' });

  // Retorne tanto o token quanto os dados do usuário
  res.json({ usuario, token });
}


// Função que puxa todos os usuarios do banco
async function obterTodosUsuarios(req, res) {
    // busca todos os usuários que tem no banco
    const usuarios = await prisma.user.findMany();

    // json com todos os usuários
    res.json(usuarios);

}

// essa bosta tem q exportar assim por causa dos modules
module.exports = {
  criarUsuario,
  loginUsuario,
  obterTodosUsuarios,
};