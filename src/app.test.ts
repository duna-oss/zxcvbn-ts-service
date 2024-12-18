import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import { createApp } from './app.js';
import { Express } from 'express';
import { ZxcvbnResult, zxcvbnAsync } from '@zxcvbn-ts/core';

describe('Express App', () => {
  let app: Express;

  beforeAll(async () => {
    app = await createApp();
    app.listen(0);
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          status: 'healthy',
          uptime: expect.any(Number),
        }),
      );
    });
  });

  describe('GET /ready', () => {
    it('should return readiness status', async () => {
      const response = await request(app).get('/ready');
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ status: 'ready' });
    });
  });

  describe('POST /password-strength', () => {
    it('returns zxcvbn password strength for a given password', async () => {
      const password = 'MyStr0ngP@ssword!';

      const expectedBody = await zxcvbnAsync(password);

      const response = await request(app)
        .post('/password-strength')
        .send({ password });

      expect(response.status).toEqual(200);

      const body = response.body as ZxcvbnResult;

      const { calcTime: bodyCalcTime, ...bodyWithoutCalcTime } = body;
      const { calcTime: expectedBodyCalcTime, ...expectedBodyWithoutCalcTime } =
        expectedBody;

      expect(bodyWithoutCalcTime).toEqual(expectedBodyWithoutCalcTime);
      expect(bodyCalcTime).toBeGreaterThan(0);
      expect(expectedBodyCalcTime).toBeGreaterThan(0);
    });

    it('returns 400 if no password is provided', async () => {
      const response = await request(app).post('/password-strength').send({});
      expect(response.status).toEqual(400);
      expect(response.body).toEqual({ error: 'Password is required' });
    });
  });
});
