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
  // pega o email e a senha do body
  const { email, senha } = req.body;

  // verifica se email e senha estão preenchidos. Isso depende também das dependencias de como é a estrutura da tabela Usuário, se tiver mais dados obrigatórios, aqui terá mais.
  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

    // Busca o usuário pelo email que foi passado
    const usuario = await prisma.user.findUnique({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    // esse compare faz a comparação da senha que foi passada no input com a senha criptografada no banco de dados
    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    // cria um token JWT para o usuário que expira em 1 hora, também precisa do JWT_SECRET que fica na .env
    const token = jwt.sign({ usuarioId: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // retorna o token JWT
    res.json({ token });

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