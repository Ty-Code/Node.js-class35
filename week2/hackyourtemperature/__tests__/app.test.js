import request from 'supertest';
import { app } from '../app.js';
import { temperature } from '../app.js';
import supertest from 'supertest';

const req = supertest(app);

describe('POST /weather', () => {
  describe('when the city name is provided', () => {
    it('should respond with a status code of 200', async () => {
      const response = await request(app).post('/weather').send({
        cityName: 'cityName',
      });
      expect(response.status).toBe(200);
    });
    it('should respond with a temperature', async () => {
      const response = await request(app).post('/weather').send({
        cityName: 'Istanbul',
      });
      expect(response.text).toBe(`Istanbul ${temperature}`);
    });
  });
  describe('when the city name is incorrect', () => {
    it('should respond with a warning text', async () => {
      const response = await request(app).post('/weather').send({
        cityName: 'Istanbulll',
      });
      expect(response.body.weatherText).toBeDefined();
    });
  });
  describe('when the city name is missing', () => {
    it('should respond with a status code of 400', async () => {
      const response = await request(app).post('/weather').send({});
      expect(response.status).toBe(400);
    });
  });
});
