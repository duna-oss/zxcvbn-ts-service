import { createApp } from './app.js';

async function main() {
  const app = await createApp();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`zxcvbn-ts-service is running on port ${PORT}`),
  );
}

main().catch(console.error);
