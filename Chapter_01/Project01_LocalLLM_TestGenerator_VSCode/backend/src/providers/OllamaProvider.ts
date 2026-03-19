/**
 * Ollama LLM Provider - Local LLM support via Ollama
 */

import axios, { AxiosInstance } from 'axios';
import { BaseLLMProvider, LLMResponse, LLMConfig } from './BaseLLMProvider';
import { logger } from '../utils/logger';

export class OllamaProvider extends BaseLLMProvider {
  private client: AxiosInstance;

  constructor(config: LLMConfig) {
    super(config);
    this.client = axios.create({
      baseURL: this.config.baseUrl || 'http://localhost:11434',
      timeout: 300000, // 5 minutes for slow LLM inference
    });
  }

  async generateTestCases(requirement: string, context?: string): Promise<LLMResponse> {
    try {
      if (!this.validateConfig()) {
        return {
          success: false,
          content: '',
          model: this.config.model,
          error: 'Invalid Ollama configuration',
        };
      }

      const prompt = this.buildPrompt(requirement, context);

      logger.info(`Calling Ollama model: ${this.config.model}`);

      const response = await this.client.post('/api/generate', {
        model: this.config.model,
        prompt: prompt,
        stream: false,
      });

      return {
        success: true,
        content: response.data.response,
        model: this.config.model,
      };
    } catch (error: any) {
      logger.error('Ollama provider error:', error.message);
      return {
        success: false,
        content: '',
        model: this.config.model,
        error: error.message || 'Failed to generate test cases via Ollama',
      };
    }
  }

  validateConfig(): boolean {
    return !!(this.config.baseUrl && this.config.model);
  }

  getProviderName(): string {
    return 'Ollama';
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await this.client.get('/api/tags');
      const models = response.data?.models || [];
      const modelExists = models.some((m: any) => m.name === this.config.model);

      if (!modelExists) {
        logger.warn(`Model ${this.config.model} not found in Ollama. Available models:`, models.map((m: any) => m.name));
      }

      return true;
    } catch (error: any) {
      logger.error('Ollama connection test failed:', error.message);
      return false;
    }
  }

  private buildPrompt(requirement: string, context?: string): string {
    return `You are an expert QA engineer. Generate exactly 5-8 comprehensive test cases for this requirement.

IMPORTANT: Format EVERY test case with the EXACT structure below. Separate each test case with "---" on its own line.

TEST CASE STRUCTURE:
Test ID: [TC-001, TC-002, etc]
Title: [One line title]
Precondition: [Setup needed]
Steps:
1. [Step 1]
2. [Step 2]
3. [Step 3]
Expected Result: [What should happen]

---

Requirement: ${requirement}

${context ? `Additional Context: ${context}\n` : ''}

GENERATE 5-8 TEST CASES USING THE FORMAT ABOVE. SEPARATE EACH WITH "---" ON ITS OWN LINE.`;
  }
}
