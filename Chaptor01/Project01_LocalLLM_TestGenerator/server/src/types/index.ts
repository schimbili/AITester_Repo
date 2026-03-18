export interface TestGenerationRequest {
  requirement: string;
  provider: ProviderType;
  model?: string;
}

export type ProviderType = 'ollama' | 'lmstudio' | 'groq' | 'openai' | 'claude' | 'gemini';

export interface JiraTestCase {
  summary: string;
  description: string;
  steps: string[];
  expectedResult: string;
  priority: 'High' | 'Medium' | 'Low';
  type: 'Functional' | 'Non-Functional';
}

export interface LlmAdapter {
  generateTestCases(request: TestGenerationRequest): Promise<string>;
  testConnection(): Promise<boolean>;
}

export interface ProviderConfig {
  apiKey?: string;
  baseUrl?: string;
  model?: string;
}
