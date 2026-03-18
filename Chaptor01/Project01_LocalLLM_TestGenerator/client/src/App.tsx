import React, { useState, useEffect } from 'react';
import { Settings, Send, CheckCircle, XCircle, History as HistoryIcon, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'http://localhost:3001/api';

type Provider = 'ollama' | 'lmstudio' | 'groq' | 'openai' | 'claude' | 'gemini';

interface Config {
  apiKey: string;
  baseUrl: string;
  model: string;
}

interface GenerationHistory {
  id: string;
  requirement: string;
  result: string;
  provider: Provider;
}

const App: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [requirement, setRequirement] = useState('');
  const [history, setHistory] = useState<GenerationHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState('');
  const [activeProvider, setActiveProvider] = useState<Provider>('ollama');

  const [configs, setConfigs] = useState<Record<Provider, Config>>({
    ollama: { apiKey: '', baseUrl: 'http://localhost:11434', model: 'llama3' },
    lmstudio: { apiKey: '', baseUrl: 'http://localhost:1234/v1', model: '' },
    groq: { apiKey: '', baseUrl: '', model: 'llama-3.3-70b-versatile' },
    openai: { apiKey: '', baseUrl: '', model: 'gpt-4' },
    claude: { apiKey: '', baseUrl: '', model: 'claude-3-opus' },
    gemini: { apiKey: '', baseUrl: '', model: 'gemini-pro' }
  });

  const handleGenerate = async () => {
    if (!requirement.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/generate`, {
        requirement,
        provider: activeProvider,
        model: configs[activeProvider].model
      });
      const newEntry: GenerationHistory = {
        id: Date.now().toString(),
        requirement,
        result: response.data.result,
        provider: activeProvider
      };
      setHistory([newEntry, ...history]);
      setCurrentResult(response.data.result);
      setRequirement('');
    } catch (error: any) {
      alert(`Error generating test cases: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async (provider: Provider) => {
    try {
      const response = await axios.post(`${API_BASE}/test-connection`, {
        type: provider,
        config: configs[provider]
      });
      alert(response.data.success ? 'Connection Successful!' : 'Connection Failed.');
    } catch {
      alert('Network error testing connection.');
    }
  };

  const saveConfig = async (provider: Provider) => {
    try {
      await axios.post(`${API_BASE}/config`, {
        type: provider,
        config: configs[provider]
      });
      alert(`Config saved for ${provider}`);
    } catch {
      alert('Error saving config.');
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">AI TESTER BLUEPRINT</div>
        <div className="history-list">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            <HistoryIcon size={18} />
            <span>History</span>
          </div>
          {history.map(item => (
            <div key={item.id} className="history-item" onClick={() => setCurrentResult(item.result)}>
              <div style={{ fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.requirement}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.provider}</div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div style={{ marginRight: 'auto', color: 'var(--text-secondary)' }}>
            Selected Provider: <span style={{ color: 'var(--accent-secondary)' }}>{activeProvider.toUpperCase()}</span>
          </div>
          <button className="btn" onClick={() => setShowSettings(true)}>
            <Settings size={20} />
          </button>
        </header>

        <section className="chat-container">
          {!currentResult && !loading && (
            <div style={{ textAlign: 'center', marginTop: '20vh', color: 'var(--text-secondary)' }}>
              <h2>Welcome to AI Test Generator</h2>
              <p>Type your requirement below to get started.</p>
            </div>
          )}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <Loader2 className="animate-spin" size={32} />
            </div>
          )}
          {currentResult && (
            <div className="result-area" style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color)', whiteSpace: 'pre-wrap' }}>
              {currentResult}
            </div>
          )}
        </section>

        <footer className="input-area">
          <div className="input-wrapper">
            <textarea 
              placeholder="Describe your API or Web application requirement..." 
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleGenerate()}
            />
            <button className="btn btn-primary" onClick={handleGenerate} disabled={loading}>
              <Send size={20} />
            </button>
          </div>
        </footer>
      </main>

      {/* Settings Overlay */}
      {showSettings && (
        <div className="overlay">
          <div className="settings-card">
            <div className="settings-header">
              <h3>LLM Provider Settings</h3>
              <button className="btn" onClick={() => setShowSettings(false)}><XCircle /></button>
            </div>
            <div className="settings-body">
              {(Object.keys(configs) as Provider[]).map(provider => (
                <div key={provider} className="provider-section">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ color: 'var(--accent-secondary)' }}>{provider.toUpperCase()}</h4>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '12px' }} onClick={() => setActiveProvider(provider)}>Select</button>
                      <button className="btn" style={{ padding: '4px 12px', fontSize: '12px', background: '#333' }} onClick={() => testConnection(provider)}>Test</button>
                      <button className="btn" style={{ padding: '4px 12px', fontSize: '12px', background: '#333' }} onClick={() => saveConfig(provider)}>Save</button>
                    </div>
                  </div>
                  <div className="form-group">
                    <input 
                      placeholder="API Key (if required)" 
                      type="password"
                      value={configs[provider].apiKey}
                      onChange={(e) => setConfigs({ ...configs, [provider]: { ...configs[provider], apiKey: e.target.value } })}
                    />
                    <input 
                      placeholder="Base URL" 
                      value={configs[provider].baseUrl}
                      onChange={(e) => setConfigs({ ...configs, [provider]: { ...configs[provider], baseUrl: e.target.value } })}
                    />
                    <input 
                      placeholder="Model Name" 
                      value={configs[provider].model}
                      onChange={(e) => setConfigs({ ...configs, [provider]: { ...configs[provider], model: e.target.value } })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
