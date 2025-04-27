const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  it('deve responder com status 200 e uma mensagem', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Hello CI/CD!');
  });
});
