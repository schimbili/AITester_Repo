/**
 * Test Case API Routes
 */

import { Router, Request, Response } from 'express';
import { BaseLLMProvider, LLMConfig } from '../providers/BaseLLMProvider';
import { LLMProviderFactory } from '../providers';
import { parseTestCases, TestCase } from '../utils/testCaseParser';
import { logger } from '../utils/logger';

const router = Router();

// Store current provider in memory (in production, use config or database)
let currentProvider: BaseLLMProvider | null = null;

/**
 * POST /api/generate-testcases
 * Generate test cases from a requirement
 */
router.post('/generate-testcases', async (req: Request, res: Response) => {
  try {
    const { requirement, context, provider } = req.body;

    if (!requirement || requirement.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Requirement is required and cannot be empty',
      });
    }

    logger.info('Generating test cases for requirement');

    // Initialize or switch provider if specified
    if (provider || !currentProvider) {
      const config: LLMConfig = {
        provider: provider || process.env.LLM_PROVIDER || 'ollama',
        model: '',
      };
      currentProvider = LLMProviderFactory.createProvider(config);
    }

    // Generate test cases via LLM
    const llmResponse = await currentProvider.generateTestCases(requirement, context);

    if (!llmResponse.success) {
      logger.error('LLM generation failed:', llmResponse.error);
      return res.status(500).json({
        success: false,
        error: llmResponse.error || 'Failed to generate test cases',
      });
    }

    // Parse generated response into structured test cases
    logger.debug('LLM response length:', llmResponse.content.length);
    logger.debug('LLM response preview:', llmResponse.content.substring(0, 500));
    const testCases = parseTestCases(llmResponse.content);

    logger.info(`Generated ${testCases.length} test cases`);

    return res.json({
      success: true,
      testCases: testCases,
      rawResponse: llmResponse.content,
      model: llmResponse.model,
      tokens: llmResponse.tokens,
    });
  } catch (error: any) {
    logger.error('Test case generation error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
});

/**
 * GET /api/providers
 * Get list of available providers and current configuration
 */
router.get('/providers', (req: Request, res: Response) => {
  try {
    const providers = [
      {
        name: 'Ollama',
        id: 'ollama',
        configured: !!process.env.OLLAMA_BASE_URL,
        model: process.env.OLLAMA_MODEL || 'mistral',
      },
      {
        name: 'OpenAI',
        id: 'openai',
        configured: !!process.env.OPENAI_API_KEY,
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      },
    ];

    const currentProviderName = currentProvider ? currentProvider.getProviderName() : null;

    res.json({
      success: true,
      providers: providers,
      currentProvider: currentProviderName,
    });
  } catch (error: any) {
    logger.error('Error fetching providers:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/test-provider
 * Test connection to the configured provider
 */
router.post('/test-provider', async (req: Request, res: Response) => {
  try {
    if (!currentProvider) {
      const config: LLMConfig = {
        provider: process.env.LLM_PROVIDER || 'ollama',
        model: '',
      };
      currentProvider = LLMProviderFactory.createProvider(config);
    }

    const isConnected = await currentProvider.testConnection();

    if (isConnected) {
      logger.info(`${currentProvider.getProviderName()} connection successful`);
      res.json({
        success: true,
        provider: currentProvider.getProviderName(),
        message: 'Connection successful',
      });
    } else {
      res.status(500).json({
        success: false,
        provider: currentProvider.getProviderName(),
        error: `Could not connect to ${currentProvider.getProviderName()}`,
      });
    }
  } catch (error: any) {
    logger.error('Provider test error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/configure-provider
 * Configure or switch LLM provider
 */
router.post('/configure-provider', (req: Request, res: Response) => {
  try {
    const { provider, config } = req.body;

    if (!provider) {
      return res.status(400).json({
        success: false,
        error: 'Provider name is required',
      });
    }

    const providerConfig: LLMConfig = {
      provider: provider,
      ...config,
    };

    currentProvider = LLMProviderFactory.createProvider(providerConfig);

    logger.info(`Provider switched to: ${provider}`);

    res.json({
      success: true,
      provider: currentProvider.getProviderName(),
      message: `Switched to ${provider} provider`,
    });
  } catch (error: any) {
    logger.error('Provider configuration error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
