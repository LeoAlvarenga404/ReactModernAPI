// isso é um middleware genérico, quando algo der errado no lado do servidor, ele será disparado como status 500

module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
  };
  