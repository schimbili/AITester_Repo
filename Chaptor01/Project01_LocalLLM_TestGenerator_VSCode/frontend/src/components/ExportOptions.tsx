import React from 'react';
import { TestCase } from '../services/apiService';
import styles from '../styles/ExportOptions.module.css';

interface ExportOptionsProps {
  testCases: TestCase[];
  disabled?: boolean;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ testCases, disabled = false }) => {
  if (testCases.length === 0) {
    return null;
  }

  const exportToCSV = () => {
    const headers = ['Test ID', 'Title', 'Precondition', 'Steps', 'Expected Result'];
    const rows = testCases.map((tc) => [
      tc.testId,
      tc.title,
      tc.precondition,
      Array.isArray(tc.steps) ? tc.steps.join('; ') : tc.steps,
      tc.expectedResult,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-cases-${Date.now()}.csv`;
    a.click();
  };

  const exportToJSON = () => {
    const json = JSON.stringify(testCases, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-cases-${Date.now()}.json`;
    a.click();
  };

  const copyToClipboard = () => {
    const text = testCases
      .map(
        (tc) =>
          `Test ID: ${tc.testId}\nTitle: ${tc.title}\nPrecondition: ${tc.precondition}\nSteps: ${Array.isArray(tc.steps) ? tc.steps.join('\n  ') : tc.steps}\nExpected Result: ${tc.expectedResult}`
      )
      .join('\n\n---\n\n');

    navigator.clipboard.writeText(text);
    alert('Test cases copied to clipboard!');
  };

  return (
    <div className={styles.container}>
      <h3>Export Options</h3>
      <div className={styles.buttons}>
        <button onClick={exportToCSV} disabled={disabled} className={styles.button}>
          📥 Export as CSV
        </button>
        <button onClick={exportToJSON} disabled={disabled} className={styles.button}>
          📥 Export as JSON
        </button>
        <button onClick={copyToClipboard} disabled={disabled} className={styles.button}>
          📋 Copy to Clipboard
        </button>
      </div>
    </div>
  );
};
