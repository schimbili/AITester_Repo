import React, { useState } from 'react';
import styles from '../styles/InputPanel.module.css';

interface InputPanelProps {
  onGenerate: (requirement: string, context?: string) => void;
  isLoading?: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({ onGenerate, isLoading = false }) => {
  const [requirement, setRequirement] = useState('');
  const [context, setContext] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = () => {
    setError(null);

    if (!requirement.trim()) {
      setError('Requirement is required');
      return;
    }

    onGenerate(requirement, context || undefined);
  };

  return (
    <div className={styles.panel}>
      <h2>Test Case Generator</h2>

      <div className={styles.formGroup}>
        <label htmlFor="requirement">
          Requirement <span className={styles.required}>*</span>
        </label>
        <textarea
          id="requirement"
          className={styles.textarea}
          placeholder="Enter the requirement for which test cases should be generated..."
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          disabled={isLoading}
          rows={6}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="context">Additional Context (Optional)</label>
        <textarea
          id="context"
          className={styles.textarea}
          placeholder="Add any additional context or constraints..."
          value={context}
          onChange={(e) => setContext(e.target.value)}
          disabled={isLoading}
          rows={4}
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <button
        className={styles.button}
        onClick={handleGenerateClick}
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate Test Cases'}
      </button>
    </div>
  );
};
