import React, { useState } from 'react';
import { InputPanel } from './components/InputPanel';
import { ProviderSelector } from './components/ProviderSelector';
import { TestCaseTable } from './components/TestCaseTable';
import { ExportOptions } from './components/ExportOptions';
import { apiService, TestCase } from './services/apiService';
import './styles/App.css';

function App() {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('ollama');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (requirement: string, context?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.generateTestCases(
        requirement,
        context,
        selectedProvider
      );

      if (response.success) {
        setTestCases(response.testCases);
      } else {
        setError(response.error || 'Failed to generate test cases');
        setTestCases([]);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setTestCases([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🤖 LocalLLMTestGenBuddy</h1>
        <p>Generate test cases using local LLMs</p>
      </header>

      <main className="container">
        <div className="sidebar">
          <ProviderSelector onProviderChange={setSelectedProvider} />
        </div>

        <div className="content">
          <InputPanel onGenerate={handleGenerate} isLoading={loading} />

          {error && <div className="error-banner">{error}</div>}

          <TestCaseTable testCases={testCases} isLoading={loading} />

          {testCases.length > 0 && <ExportOptions testCases={testCases} disabled={loading} />}
        </div>
      </main>

      <footer className="footer">
        <p>LocalLLMTestGenBuddy v1.0.0</p>
      </footer>
    </div>
  );
}

export default App;
