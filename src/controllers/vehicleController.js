const Veiculo = require('../models/Vehicle');

// Cadastrar veículo
exports.create = async (req, res) => {
  try {
    const veiculo = await Veiculo.create(req.body);
    res.status(201).json(veiculo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Editar veículo
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) return res.status(404).json({ error: 'Veículo não encontrado' });

    await veiculo.update(req.body);
    res.json(veiculo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Efetuar venda de veículo
exports.sell = async (req, res) => {
  try {
    const { id } = req.params;
    const { cpfComprador, dataVenda } = req.body;

    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) return res.status(404).json({ error: 'Veículo não encontrado' });
    if (veiculo.status === 'vendido') return res.status(400).json({ error: 'Veículo já vendido' });

    await veiculo.update({
      status: 'vendido',
      cpfComprador,
      dataVenda
    });

    res.json(veiculo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Webhook para atualizar status de pagamento (exemplo simples)
exports.webhookPagamento = async (req, res) => {
  const { codigoPagamento, status } = req.body;
  
  // Aqui você deveria buscar o pagamento, mas para o exemplo,
  // vamos supor que o veículo é atualizado diretamente.

  console.log(`Recebido status ${status} para pagamento ${codigoPagamento}`);
  
  // Se precisar implementar, pode buscar um pagamento e mudar status.
  
  res.status(200).json({ message: 'Webhook recebido' });
};
