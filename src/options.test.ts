import { describe, it, expect } from 'vitest';
import { resolveZxcvbnOptionsFromEnvironment } from './options.js';

describe('resolveZxcvbnOptionsFromEnvironment', () => {
  describe('Adjacency Graphs Feature', () => {
    it('loads adjacency graphs by default when the feature is not set', async () => {
      delete process.env.ADJACENCY_GRAPHS;
      const options = await resolveZxcvbnOptionsFromEnvironment();
      expect(options.graphs).toBeDefined();
    });

    it('loads adjacency graphs when the feature is enabled', async () => {
      process.env.ADJACENCY_GRAPHS = 'true';
      const options = await resolveZxcvbnOptionsFromEnvironment();
      expect(options.graphs).toBeDefined();
    });

    it('does not load adjacency graphs when the feature is disabled', async () => {
      process.env.ADJACENCY_GRAPHS = 'false';
      const options = await resolveZxcvbnOptionsFromEnvironment();
      expect(options.graphs).toBeUndefined();
    });
  });

  describe('English Translations Feature', () => {
    it('loads translations by default when the feature is not set', async () => {
      delete process.env.EN_TRANSLATIONS;
      const options = await resolveZxcvbnOptionsFromEnvironment();
      expect(options.translations).toBeDefined();
    });

    it('loads translations when the feature is enabled', async () => {
      process.env.EN_TRANSLATIONS = 'true';
      const options = await resolveZxcvbnOptionsFromEnvironment();
      expect(options.translations).toBeDefined();
    });

    it('does not load translations when the feature is disabled', async () => {
      process.env.EN_TRANSLATIONS = 'false';
      const options = await resolveZxcvbnOptionsFromEnvironment();
      expect(options.translations).toBeUndefined();
    });
  });

  describe('Passwords Dictionary Feature', () => {
    it('loads the passwords dictionary by default when the feature is not set', async () => {
      delete process.env.PASSWORDS_DICTIONARY;
      const options = await resolveZxcvbnOptionsFromEnvironment();
      expect(options.dictionary).toBeDefined();
      expect(Array.isArray(options.dictionary?.passwords)).toBe(true);
    });

    it('loads the passwords dictionary when the feature is enabled', async () => {
      process.env.PASSWORDS_DICTIONARY = 'true';
      const options = await resolveZxcvbnOptionsFromEnvironment();
      expect(options.dictionary).toBeDefined();
      expect(Array.isArray(options.dictionary?.passwords)).toBe(true);
    });

    it('does not load the passwords dictionary when the feature is disabled', async () => {
      process.env.PASSWORDS_DICTIONARY = 'false';
      const options = await resolveZxcvbnOptionsFromEnvironment();
      expect(options.dictionary).toBeUndefined();
    });
  });
});
