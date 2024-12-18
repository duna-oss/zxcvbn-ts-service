import express, { Express } from 'express';
import helmet from 'helmet';
import { zxcvbnAsync, zxcvbnOptions, type ZxcvbnResult } from '@zxcvbn-ts/core';
import {
  isFeatureEnabled,
  resolveZxcvbnOptionsFromEnvironment,
} from './options.js';

export async function createApp(): Promise<Express> {
  const app = express();
  app.use(express.json());

  const options = await resolveZxcvbnOptionsFromEnvironment();
  zxcvbnOptions.setOptions(options);

  if (isFeatureEnabled(process.env.HELMET, true)) {
    app.use(helmet());
  }

  app.get('/health', (_, res) => {
    res.status(200).json({
      status: 'healthy',
      uptime: process.uptime(),
    });
  });

  app.get('/ready', (_, res) => {
    res.status(200).json({ status: 'ready' });
  });

  app.post('/password-strength', async (req, res, nex) => {
    const { password } = req.body;

    if (!password) {
      res.status(400).json({ error: 'Password is required' });
      return;
    }

    const passwordStrength = await zxcvbnAsync(password);
    res.status(200).json(passwordStrength satisfies ZxcvbnResult);
  });

  return app;
}
