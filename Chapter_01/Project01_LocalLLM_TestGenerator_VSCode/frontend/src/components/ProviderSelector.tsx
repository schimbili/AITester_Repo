import React, { useState, useEffect } from 'react';
import { apiService, ProvidersResponse } from '../services/apiService';
import styles from '../styles/ProviderSelector.module.css';

interface ProviderSelectorProps {
  onProviderChange?: (provider: string) => void;
}

export const ProviderSelector: React.FC<ProviderSelectorProps> = ({ onProviderChange }) => {
  const [providers, setProviders] = useState<ProvidersResponse | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const result = await apiService.getProviders();
      setProviders(result);
      
      // Set the selected provider - prefer current, fallback to first available
      if (result.currentProvider) {
        setSelectedProvider(result.currentProvider.toLowerCase());
      } else if (result.providers && result.providers.length > 0) {
        setSelectedProvider(result.providers[0].id);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to load providers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provider = e.target.value;
    setSelectedProvider(provider);
    onProviderChange?.(provider);
  };

  const handleTestConnection = async () => {
    try {
      setTesting(true);
      setTestResult(null);
      const result = await apiService.testProvider();
      setTestResult({
        success: result.success,
        message: result.message || result.error || 'Connection test result unknown',
      });
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || 'Connection test failed',
      });
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return <div className={styles.selector}>Loading providers...</div>;
  }

  return (
    <div className={styles.selector}>
      <label htmlFor="provider">LLM Provider:</label>
      <div className={styles.selectorGroup}>
        <select
          id="provider"
          value={selectedProvider}
          onChange={handleProviderChange}
          className={styles.select}
        >
          {providers?.providers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.model}) {!p.configured ? '(Not configured)' : ''}
            </option>
          ))}
        </select>
        <button
          onClick={handleTestConnection}
          disabled={testing || !selectedProvider}
          className={styles.testButton}
          title="Test connection to the selected LLM provider"
        >
          {testing ? '⏳ Testing...' : '🔗 Test Connection'}
        </button>
      </div>
      {error && <span className={styles.error}>{error}</span>}
      {testResult && (
        <div className={testResult.success ? styles.success : styles.error}>
          {testResult.success ? '✅ ' : '❌ '}
          {testResult.message}
        </div>
      )}
    </div>
  );
};
