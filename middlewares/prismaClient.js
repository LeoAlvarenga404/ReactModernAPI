const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model == 'Estudo' && params.action == 'update') {
    if (params.args.data.porcentagemConcluida === 100) {
      params.args.data.finalizado = true;
    }
  }
  return next(params);
});

module.exports = prisma;
