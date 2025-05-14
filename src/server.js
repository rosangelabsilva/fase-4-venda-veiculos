const express = require('express');
const sequelize = require('./config/database');
const veiculoRoutes = require('./routes/vehicleRoutes');

const app = express();
app.use(express.json());

// Rotas
app.use('/api', veiculoRoutes);

// Sincronizar banco e iniciar servidor
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }) // set force: true para recriar tabelas
  .then(() => {
    console.log('Banco sincronizado!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.error('Erro ao conectar no banco', error));
