const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Vehicle = require('../src/models/Vehicle');

beforeAll(async () => {
  // Conecta ao banco antes dos testes
  await mongoose.connect('mongodb://localhost:27017/vehicles_db_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Fecha conexão depois dos testes
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Limpa a coleção antes de cada teste
  await Vehicle.deleteMany({});
});

describe('API de Veículos', () => {
  it('Deve cadastrar um novo veículo', async () => {
    const response = await request(app)
      .post('/vehicles')
      .send({
        marca: 'Ford',
        modelo: 'Ka',
        ano: 2019,
        cor: 'Prata',
        preco: 25000
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.marca).toBe('Ford');
  });

  it('Deve listar veículos cadastrados', async () => {
    await Vehicle.create({
      marca: 'Fiat',
      modelo: 'Argo',
      ano: 2020,
      cor: 'Vermelho',
      preco: 55000
    });

    const response = await request(app).get('/vehicles');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Deve atualizar um veículo existente', async () => {
    const vehicle = await Vehicle.create({
      marca: 'Honda',
      modelo: 'Civic',
      ano: 2021,
      cor: 'Preto',
      preco: 85000
    });

    const response = await request(app)
      .put(`/vehicles/${vehicle._id}`)
      .send({ cor: 'Branco' });

    expect(response.status).toBe(200);
    expect(response.body.cor).toBe('Branco');
  });
});
