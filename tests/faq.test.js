
import request from 'supertest';
import app from '../app.js';

describe('FAQ API', () => {
  it('should create a new FAQ', async () => {
    const response = await request(app)
      .post('/api/faqs')
      .send({
        question: 'What is Node.js?',
        answer: '<p>Node.js is a runtime...</p>',
        question_hi: 'Node.js क्या है?',
        question_bn: 'Node.js কি?',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('question');
  });

  it('should fetch FAQs in English', async () => {
    const response = await request(app).get('/api/faqs?lang=en');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should fetch FAQs in Hindi', async () => {
    const response = await request(app).get('/api/faqs?lang=hi');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});