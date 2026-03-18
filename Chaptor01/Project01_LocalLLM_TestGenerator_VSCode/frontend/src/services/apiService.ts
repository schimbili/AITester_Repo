import axios, { AxiosInstance } from 'axios';

export interface TestCase {
  testId: string;
  title: string;
  precondition: string;
  steps: string[];
  expectedResult: string;
  priority?: string;
  status?: string;
}

export interface TestCaseResponse {
  success: boolean;
  testCases: TestCase[];
  rawResponse: string;
  model: string;
  tokens?: {
    prompt: number;
    completion: number;
  };
  error?: string;
}

export interface Provider {
  name: string;
  id: string;
  configured: boolean;
  model: string;
}

export interface ProvidersResponse {
  success: boolean;
  providers: Provider[];
  currentProvider: string | null;
}

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: '/api',
      timeout: 300000, // 5 minutes for slow LLM inference
    });
  }

  async generateTestCases(
    requirement: string,
    context?: string,
    provider?: string
  ): Promise<TestCaseResponse> {
    try {
      const response = await this.client.post<TestCaseResponse>('/generate-testcases', {
        requirement,
        context,
        provider,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        testCases: [],
        rawResponse: '',
        model: '',
        error: error.response?.data?.error || error.message || 'Failed to generate test cases',
      };
    }
  }

  async getProviders(): Promise<ProvidersResponse> {
    try {
      const response = await this.client.get<ProvidersResponse>('/providers');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        providers: [],
        currentProvider: null,
      };
    }
  }

  async testProvider(): Promise<{ success: boolean; provider?: string; message?: string; error?: string }> {
    try {
      const response = await this.client.post('/test-provider', {});
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  }

  async configureProvider(provider: string, config: any): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const response = await this.client.post('/configure-provider', {
        provider,
        config,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  }

  async healthCheck(): Promise<{ success: boolean }> {
    try {
      const response = await this.client.get('/health');
      return response.data;
    } catch (error) {
      return { success: false };
    }
  }
}

export const apiService = new ApiService();
