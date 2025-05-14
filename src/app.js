const express = require('express');
const { addVehicle, getVehicles, updateVehicle } = require('./vehicles');

const app = express();
app.use(express.json());

app.post('/vehicles', async (req, res) => {
  try {
    const { marca, modelo, ano, cor, preco } = req.body;
    if (!marca || !modelo || !ano || !cor || !preco) {
      return res.status(400).json({ message: 'Dados obrigatórios faltando.' });
    }
    const newVehicle = await addVehicle({ marca, modelo, ano, cor, preco });
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar veículo', error: err.message });
  }
});

app.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await getVehicles();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar veículos', error: err.message });
  }
});

app.put('/vehicles/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedVehicle = await updateVehicle(id, req.body);
    if (!updatedVehicle) {
      return res.status(404).json({ message: 'Veículo não encontrado.' });
    }
    res.json(updatedVehicle);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar veículo', error: err.message });
  }
});

module.exports = app;
