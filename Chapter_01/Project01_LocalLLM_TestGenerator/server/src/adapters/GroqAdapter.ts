import axios from 'axios';
import type { LlmAdapter, TestGenerationRequest, ProviderConfig } from '../types/index.js';
import { JiraFormatter } from '../utils/JiraFormatter.js';

export class GroqAdapter implements LlmAdapter {
  private config: ProviderConfig;

  constructor(config: ProviderConfig) {
    this.config = config;
    if (!this.config.baseUrl) {
      this.config.baseUrl = 'https://api.groq.com/openai/v1';
    }
  }

  async generateTestCases(request: TestGenerationRequest): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error('Groq API Key is missing');
    }

    try {
      const response = await axios.post(`${this.config.baseUrl}/chat/completions`, {
        model: request.model || "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: JiraFormatter.getSystemPrompt() },
          { role: "user", content: `Requirement: ${request.requirement}` }
        ],
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.choices[0].message.content;
    } catch (error: any) {
      throw new Error(`Groq Error: ${error.message}`);
    }
  }

  async testConnection(): Promise<boolean> {
    if (!this.config.apiKey) return false;
    try {
      const response = await axios.get(`${this.config.baseUrl}/models`, {
        headers: { 'Authorization': `Bearer ${this.config.apiKey}` }
      });
      return response.status === 200;
    } catch {
      return false;
    }
  }
}
