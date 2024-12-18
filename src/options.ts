import { OptionsType as ZxcvbnOptions } from '@zxcvbn-ts/core/src/types.js';

export function isFeatureEnabled(
  feature: string | undefined,
  isDefaultEnabled: boolean,
): boolean {
  return feature !== undefined ? feature === 'true' : isDefaultEnabled;
}

export async function resolveZxcvbnOptionsFromEnvironment(): Promise<ZxcvbnOptions> {
  const { ADJACENCY_GRAPHS, EN_TRANSLATIONS, PASSWORDS_DICTIONARY } =
    process.env;

  const [graphs, translations, passwords] = await Promise.all([
    isFeatureEnabled(ADJACENCY_GRAPHS, true)
      ? importAdjacencyGraphs()
      : undefined,
    isFeatureEnabled(EN_TRANSLATIONS, true)
      ? importEnglishTranslations()
      : undefined,
    isFeatureEnabled(PASSWORDS_DICTIONARY, true)
      ? importPasswordsDictionary()
      : undefined,
  ]);

  return {
    graphs,
    translations,
    dictionary: passwords ? { passwords } : undefined,
  };
}

async function importAdjacencyGraphs() {
  const { adjacencyGraphs } = await import('@zxcvbn-ts/language-common');
  return adjacencyGraphs;
}

async function importEnglishTranslations() {
  const { translations } = await import('@zxcvbn-ts/language-en');
  return translations;
}

async function importPasswordsDictionary() {
  const { default: passwords } = await import(
    '@zxcvbn-ts/language-common/src/passwords.json',
    {
      with: {
        type: 'json',
      },
    }
  );
  return passwords;
}
