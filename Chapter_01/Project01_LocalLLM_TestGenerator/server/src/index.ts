import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { LlmService } from './services/LlmService.js';
import type { ProviderType, ProviderConfig } from './types/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const llmService = LlmService.getInstance();

// Generate Test Cases
app.post('/api/generate', async (req, res) => {
  try {
    const { requirement, provider, model } = req.body;
    if (!requirement || !provider) {
      return res.status(400).json({ error: 'Requirement and Provider are required' });
    }
    const result = await llmService.generateTestCases({ requirement, provider, model });
    res.json({ result });
  } catch (error: any) {
    console.error('Generation Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update/Save Configuration
app.post('/api/config', (req, res) => {
  const { type, config }: { type: ProviderType, config: ProviderConfig } = req.body;
  if (!type || !config) {
    return res.status(400).json({ error: 'Provider type and config are required' });
  }
  llmService.updateConfig(type, config);
  res.json({ status: 'success', message: `Config updated for ${type}` });
});

// Test Connection
app.post('/api/test-connection', async (req, res) => {
  try {
    const { type, config } = req.body;
    const isConnected = await llmService.testConnection(type, config);
    res.json({ success: isConnected });
  } catch (error: any) {
    res.json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
