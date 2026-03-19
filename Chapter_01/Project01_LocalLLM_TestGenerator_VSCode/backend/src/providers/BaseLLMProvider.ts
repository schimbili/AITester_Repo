/**
 * LLM Provider Interface - Abstract interface for all LLM implementations
 */

export interface LLMResponse {
  success: boolean;
  content: string;
  model: string;
  tokens?: {
    prompt: number;
    completion: number;
  };
  error?: string;
}

export interface LLMConfig {
  provider: string;
  model: string;
  apiKey?: string;
  baseUrl?: string;
  [key: string]: any;
}

/**
 * Abstract base class for LLM providers
 */
export abstract class BaseLLMProvider {
  protected config: LLMConfig;

  constructor(config: LLMConfig) {
    this.config = config;
  }

  /**
   * Generate test cases from a requirement
   * @param requirement User's requirement/description
   * @param context Additional context for test case generation
   */
  abstract generateTestCases(requirement: string, context?: string): Promise<LLMResponse>;

  /**
   * Validate provider configuration
   */
  abstract validateConfig(): boolean;

  /**
   * Get provider name
   */
  abstract getProviderName(): string;

  /**
   * Test connection to the LLM service
   */
  abstract testConnection(): Promise<boolean>;
}
