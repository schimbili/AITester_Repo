import axios from 'axios';
import type { LlmAdapter, TestGenerationRequest, ProviderConfig } from '../types/index.js';
import { JiraFormatter } from '../utils/JiraFormatter.js';

export class OllamaAdapter implements LlmAdapter {
  private config: ProviderConfig;

  constructor(config: ProviderConfig) {
    this.config = config;
    if (!this.config.baseUrl) {
      this.config.baseUrl = 'http://localhost:11434';
    }
    if (!this.config.model) {
      this.config.model = 'llama3'; // Default model
    }
  }

  async generateTestCases(request: TestGenerationRequest): Promise<string> {
    try {
      const response = await axios.post(`${this.config.baseUrl}/api/generate`, {
        model: request.model || this.config.model,
        prompt: `${JiraFormatter.getSystemPrompt()}\n\nRequirement: ${request.requirement}`,
        stream: false
      });

      return response.data.response;
    } catch (error: any) {
      throw new Error(`Ollama Error: ${error.message}`);
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.config.baseUrl}/api/tags`);
      return response.status === 200;
    } catch {
      return false;
    }
  }
}
