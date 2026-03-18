/**
 * LLM Provider Factory - Instantiate the configured LLM provider
 */

import { BaseLLMProvider, LLMConfig } from './BaseLLMProvider';
import { OllamaProvider } from './OllamaProvider';
import { OpenAIProvider } from './OpenAIProvider';
import { logger } from '../utils/logger';

export class LLMProviderFactory {
  static createProvider(config: LLMConfig): BaseLLMProvider {
    const provider = config.provider?.toLowerCase() || 'ollama';

    logger.info(`Creating LLM provider: ${provider}`);

    switch (provider) {
      case 'ollama':
        return new OllamaProvider({
          provider: 'ollama',
          model: process.env.OLLAMA_MODEL || 'gemma3:1b',
          baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
        });

      case 'openai':
        return new OpenAIProvider({
          provider: 'openai',
          model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
          apiKey: process.env.OPENAI_API_KEY,
        });

      default:
        logger.warn(`Unknown provider: ${provider}, falling back to Ollama`);
        return new OllamaProvider({
          provider: 'ollama',
          model: process.env.OLLAMA_MODEL || 'mistral',
          baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
        });
    }
  }
}
