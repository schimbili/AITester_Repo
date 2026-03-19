import type { ProviderType, ProviderConfig, LlmAdapter } from '../types/index.js';
import { OllamaAdapter } from './OllamaAdapter.js';
import { GroqAdapter } from './GroqAdapter.js';
// Import other adapters here...

export class AdapterFactory {
  static getAdapter(type: ProviderType, config: ProviderConfig): LlmAdapter {
    switch (type) {
      case 'ollama':
        return new OllamaAdapter(config);
      case 'groq':
        return new GroqAdapter(config);
      // Add other cases here...
      case 'openai':
      case 'claude':
      case 'gemini':
      case 'lmstudio':
        // For now, these can be implemented similarly or use a base OpenAI compatibility class
        return new OllamaAdapter(config); 
      default:
        throw new Error(`Provider ${type} not supported yet.`);
    }
  }
}
