const express = require('express');
const router = express.Router();
const VeiculoController = require('../controllers/vehicleController');

router.post('/veiculos', VeiculoController.create);
router.put('/veiculos/:id', VeiculoController.update);
router.post('/veiculos/:id/venda', VeiculoController.sell);
router.post('/webhook/pagamento', VeiculoController.webhookPagamento);

module.exports = router;
