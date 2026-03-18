/**
 * OpenAI LLM Provider - GPT-3.5-turbo and GPT-4 support
 */

import axios, { AxiosInstance } from 'axios';
import { BaseLLMProvider, LLMResponse, LLMConfig } from './BaseLLMProvider';
import { logger } from '../utils/logger';

export class OpenAIProvider extends BaseLLMProvider {
  private client: AxiosInstance;

  constructor(config: LLMConfig) {
    super(config);
    this.client = axios.create({
      baseURL: 'https://api.openai.com/v1',
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 60000,
    });
  }

  async generateTestCases(requirement: string, context?: string): Promise<LLMResponse> {
    try {
      if (!this.validateConfig()) {
        return {
          success: false,
          content: '',
          model: this.config.model,
          error: 'Invalid OpenAI configuration - missing API key',
        };
      }

      const messages = [
        {
          role: 'system',
          content: `You are an expert QA engineer. Generate comprehensive test cases based on user requirements.
          Format each test case with:
          - Test ID
          - Title
          - Precondition
          - Steps (numbered)
          - Expected Result
          Generate 3-8 test cases covering normal flow, edge cases, and error scenarios.`,
        },
        {
          role: 'user',
          content: `Based on this requirement, generate test cases:\n\n${requirement}${context ? `\n\nAdditional Context:\n${context}` : ''}`,
        },
      ];

      logger.info(`Calling OpenAI model: ${this.config.model}`);

      const response = await this.client.post('/chat/completions', {
        model: this.config.model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
      });

      const content = response.data?.choices?.[0]?.message?.content || '';
      const usage = response.data?.usage;

      return {
        success: true,
        content: content,
        model: this.config.model,
        tokens: {
          prompt: usage?.prompt_tokens || 0,
          completion: usage?.completion_tokens || 0,
        },
      };
    } catch (error: any) {
      logger.error('OpenAI provider error:', error.message);
      return {
        success: false,
        content: '',
        model: this.config.model,
        error: error.response?.data?.error?.message || error.message || 'Failed to generate test cases via OpenAI',
      };
    }
  }

  validateConfig(): boolean {
    return !!(this.config.apiKey && this.config.model);
  }

  getProviderName(): string {
    return 'OpenAI';
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await this.client.get('/models');
      const models = response.data?.data || [];
      const modelExists = models.some((m: any) => m.id === this.config.model);

      if (!modelExists) {
        logger.warn(`Model ${this.config.model} not found. Available models:`, models.map((m: any) => m.id).slice(0, 5));
      }

      return true;
    } catch (error: any) {
      logger.error('OpenAI connection test failed:', error.message);
      return false;
    }
  }
}
