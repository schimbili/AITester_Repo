import React, { useState } from 'react';
import { TestCase } from '../services/apiService';
import styles from '../styles/TestCaseTable.module.css';

interface TestCaseTableProps {
  testCases: TestCase[];
  isLoading?: boolean;
}

export const TestCaseTable: React.FC<TestCaseTableProps> = ({ testCases, isLoading = false }) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRowExpand = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Generating test cases...</p>
          <p className={styles.subtitle}>This may take a minute depending on LLM speed</p>
        </div>
      </div>
    );
  }

  if (testCases.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>📋 No test cases generated yet</div>
      </div>
    );
  }

  const getPriorityColor = (priority?: string) => {
    const p = priority?.toLowerCase() || 'medium';
    if (p.includes('high')) return styles.priorityHigh;
    if (p.includes('low')) return styles.priorityLow;
    return styles.priorityMedium;
  };

  const getStatusColor = (status?: string) => {
    const s = status?.toLowerCase() || 'not started';
    if (s.includes('pass')) return styles.statusPass;
    if (s.includes('fail')) return styles.statusFail;
    if (s.includes('block')) return styles.statusBlocked;
    return styles.statusNotStarted;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>🧪 Generated Test Cases</h2>
          <p className={styles.summary}>
            Total: <strong>{testCases.length}</strong> test cases
          </p>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.colExpand}></th>
              <th className={styles.colTestId}>Test ID</th>
              <th className={styles.colTitle}>Title</th>
              <th className={styles.colPriority}>Priority</th>
              <th className={styles.colStatus}>Status</th>
              <th className={styles.colPrecon}>Precondition</th>
            </tr>
          </thead>
          <tbody>
            {testCases.map((tc, index) => (
              <React.Fragment key={index}>
                <tr
                  className={`${styles.row} ${index % 2 === 0 ? styles.rowEven : styles.rowOdd}`}
                  onClick={() => toggleRowExpand(index)}
                >
                  <td className={styles.colExpand}>
                    <button className={styles.expandButton}>
                      {expandedRows.has(index) ? '▼' : '▶'}
                    </button>
                  </td>
                  <td className={`${styles.colTestId} ${styles.testId}`}>{tc.testId}</td>
                  <td className={`${styles.colTitle} ${styles.title}`}>{tc.title}</td>
                  <td className={`${styles.colPriority} ${getPriorityColor(tc.priority)}`}>
                    {tc.priority || 'Medium'}
                  </td>
                  <td className={`${styles.colStatus} ${getStatusColor(tc.status)}`}>
                    {tc.status || 'Not Started'}
                  </td>
                  <td className={`${styles.colPrecon} ${styles.precondition}`}>
                    {tc.precondition || '—'}
                  </td>
                </tr>

                {expandedRows.has(index) && (
                  <tr className={styles.expandedRow}>
                    <td colSpan={6}>
                      <div className={styles.expandedContent}>
                        <div className={styles.section}>
                          <h4>📋 Precondition</h4>
                          <p>{tc.precondition || 'No preconditions specified'}</p>
                        </div>

                        <div className={styles.section}>
                          <h4>🎯 Test Steps</h4>
                          {Array.isArray(tc.steps) && tc.steps.length > 0 ? (
                            <ol className={styles.stepsList}>
                              {tc.steps.map((step, i) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ol>
                          ) : (
                            <p>{tc.steps || 'No steps specified'}</p>
                          )}
                        </div>

                        <div className={styles.section}>
                          <h4>✅ Expected Result</h4>
                          <p>{tc.expectedResult || 'No expected result specified'}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <p>📌 Click on any row to expand and view full details</p>
      </div>
    </div>
  );
};
