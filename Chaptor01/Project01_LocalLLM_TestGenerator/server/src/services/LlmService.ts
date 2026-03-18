import type { TestGenerationRequest, ProviderConfig, ProviderType } from '../types/index.js';
import { AdapterFactory } from '../adapters/AdapterFactory.js';

export class LlmService {
  private static instance: LlmService;
  private configs: Map<ProviderType, ProviderConfig> = new Map();

  private constructor() {}

  static getInstance(): LlmService {
    if (!LlmService.instance) {
      LlmService.instance = new LlmService();
    }
    return LlmService.instance;
  }

  updateConfig(type: ProviderType, config: ProviderConfig) {
    this.configs.set(type, config);
  }

  async generateTestCases(request: TestGenerationRequest): Promise<string> {
    const config = this.configs.get(request.provider) || {};
    const adapter = AdapterFactory.getAdapter(request.provider, config);
    return await adapter.generateTestCases(request);
  }

  async testConnection(type: ProviderType, config: ProviderConfig): Promise<boolean> {
    const adapter = AdapterFactory.getAdapter(type, config);
    return await adapter.testConnection();
  }
}
