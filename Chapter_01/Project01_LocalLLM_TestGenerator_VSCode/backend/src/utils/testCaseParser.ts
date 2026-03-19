/**
 * Test Case Parser - Converts LLM responses into structured test cases
 */

export interface TestCase {
  testId: string;
  title: string;
  precondition: string;
  steps: string[];
  expectedResult: string;
  priority?: string;
  status?: string;
}

/**
 * Parse LLM response and extract test cases
 * Flexible parsing to handle different LLM response formats
 */
export function parseTestCases(llmResponse: string): TestCase[] {
  const testCases: TestCase[] = [];

  try {
    // Try parsing as JSON first (structured response)
    try {
      const jsonData = JSON.parse(llmResponse);
      if (Array.isArray(jsonData)) {
        return jsonData.map((tc, index) => ({
          testId: tc.testId || `TC-${index + 1}`,
          title: tc.title || tc.name || 'Untitled',
          precondition: tc.precondition || tc.preconditions || '',
          steps: Array.isArray(tc.steps) ? tc.steps : [tc.steps || ''],
          expectedResult: tc.expectedResult || tc.expected_result || tc.expected || '',
          priority: tc.priority || 'Medium',
          status: tc.status || 'Not Started',
        }));
      }
    } catch (e) {
      // Not JSON, continue with text parsing
    }

    // Split by separator "---" if present (new format)
    const separator = '---';
    const blocks = llmResponse.includes(separator)
      ? llmResponse.split(separator).filter((b) => b.trim())
      : llmResponse.split(/\n\n+/).filter((b) => b.trim());

    for (const block of blocks) {
      const testCase = parseTestCaseBlock(block, testCases.length);
      if (testCase && (testCase.title || testCase.testId)) {
        testCases.push(testCase);
      }
    }

    return testCases.length > 0 ? testCases : extractBasicTestCases(llmResponse);
  } catch (error) {
    console.error('Error parsing test cases:', error);
    return extractBasicTestCases(llmResponse);
  }
}

/**
 * Parse a single test case block
 */
function parseTestCaseBlock(block: string, index: number): TestCase | null {
  const testCase: TestCase = {
    testId: '',
    title: '',
    precondition: '',
    steps: [],
    expectedResult: '',
  };

  const lines = block.split('\n').map((l) => l.trim());
  let currentSection: 'steps' | 'none' = 'none';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const lowerLine = line.toLowerCase();

    // Test ID - handles "Test ID: TC-001" or just "TC-001"
    if (lowerLine.startsWith('test id') || lowerLine.startsWith('tc-')) {
      const value = line.split(':').slice(1).join(':').trim() || line.replace(/^tc-/i, '').trim();
      testCase.testId = value || `TC-${index + 1}`;
      currentSection = 'none';
    }
    // Title - handles "Title: ..." but not "Title: Steps"
    else if ((lowerLine.startsWith('title') || lowerLine.startsWith('test name')) && !lowerLine.includes('step')) {
      testCase.title = line.split(':').slice(1).join(':').trim();
      currentSection = 'none';
    }
    // Precondition
    else if (lowerLine.startsWith('precondition') || lowerLine.startsWith('prerequisite') || lowerLine.startsWith('setup')) {
      testCase.precondition = line.split(':').slice(1).join(':').trim();
      currentSection = 'none';
    }
    // Steps section header
    else if (lowerLine.startsWith('steps')) {
      currentSection = 'steps';
      const stepsContent = line.split(':').slice(1).join(':').trim();
      if (stepsContent) {
        testCase.steps.push(stepsContent);
      }
    }
    // Step items (numbered like "1." or "2." or bulleted like "- " or "* ")
    else if (currentSection === 'steps' && (line.match(/^\d+\./) || line.match(/^[-*•]/))) {
      const step = line.replace(/^\d+\.\s*/, '').replace(/^[-*•]\s*/, '').trim();
      if (step) {
        testCase.steps.push(step);
      }
    }
    // Expected Result
    else if (lowerLine.startsWith('expected result') || lowerLine.startsWith('expected output') || lowerLine.startsWith('expected')) {
      testCase.expectedResult = line.split(':').slice(1).join(':').trim();
      currentSection = 'none';
    }
    // Priority
    else if (lowerLine.startsWith('priority')) {
      testCase.priority = line.split(':').slice(1).join(':').trim() || 'Medium';
      currentSection = 'none';
    }
    // Status
    else if (lowerLine.startsWith('status')) {
      testCase.status = line.split(':').slice(1).join(':').trim() || 'Not Started';
      currentSection = 'none';
    }
    // If we're in steps section and line doesn't match other patterns, treat as step
    else if (currentSection === 'steps' && line.length > 0 && !line.match(/^(expected|priority|status|test\s|tc-)/i)) {
      testCase.steps.push(line);
    }
  }

  // Validate and return
  if (testCase.title || testCase.testId) {
    if (!testCase.testId) testCase.testId = `TC-${index + 1}`;
    if (!testCase.title) testCase.title = 'Untitled';
    if (testCase.steps.length === 0) testCase.steps = ['Execute test'];
    if (!testCase.expectedResult) testCase.expectedResult = 'Test should pass';
    return testCase;
  }

  return null;
}

/**
 * Fallback: Extract test cases from raw text if other methods fail
 */
function extractBasicTestCases(text: string): TestCase[] {
  const testCases: TestCase[] = [];
  
  // Fallback: Create test cases from the provided requirement
  // This ensures user gets SOME output even if LLM response format doesn't match
  if (!text || text.trim().length === 0) {
    return [];
  }

  // Try to find numbered lists or bullet points that look like test cases
  const lines = text.split('\n').filter((l) => l.trim());
  let currentTestCase: Partial<TestCase> = {};
  let testCaseCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip empty lines
    if (!trimmed) continue;
    
    // Look for patterns that indicate a new test case
    if (trimmed.match(/^(test case|tc|test|scenario|\d+\.|\*\s|-)/i) && currentTestCase.title) {
      // Save previous test case
      if (currentTestCase.title || currentTestCase.precondition) {
        testCases.push({
          testId: currentTestCase.testId || `TC-${testCases.length + 1}`,
          title: currentTestCase.title || 'Untitled',
          precondition: currentTestCase.precondition || '',
          steps: currentTestCase.steps && currentTestCase.steps.length > 0 
            ? currentTestCase.steps 
            : (currentTestCase.title ? [currentTestCase.title] : []),
          expectedResult: currentTestCase.expectedResult || 'Test should pass',
        });
      }
      currentTestCase = {
        testId: `TC-${testCases.length + 1}`,
        title: trimmed.replace(/^(test case|tc|test|scenario|\d+\.|\*\s|-)\s*/i, '').trim(),
      };
      testCaseCount++;
    } else if (
      trimmed.toLowerCase().startsWith('precondition') ||
      trimmed.toLowerCase().startsWith('setup') ||
      trimmed.toLowerCase().startsWith('prerequisite')
    ) {
      currentTestCase.precondition = trimmed.replace(/^(precondition|setup|prerequisite):\s*/i, '').trim();
    } else if (
      trimmed.toLowerCase().startsWith('step') ||
      trimmed.toLowerCase().startsWith('action')
    ) {
      if (!currentTestCase.steps) currentTestCase.steps = [];
      currentTestCase.steps.push(trimmed.replace(/^(step|action).*:\s*/i, '').trim());
    } else if (
      trimmed.toLowerCase().startsWith('expected') ||
      trimmed.toLowerCase().startsWith('result') ||
      trimmed.toLowerCase().startsWith('verify')
    ) {
      currentTestCase.expectedResult = trimmed.replace(/^(expected|result|verify|expected result).*:\s*/i, '').trim();
    } else if (currentTestCase.title && !currentTestCase.expectedResult && testCaseCount > 0) {
      // If we have a title but nothing else, treat subsequent lines as expected result
      if (trimmed.length > 20) {
        currentTestCase.expectedResult = trimmed;
      }
    }
  }

  // Add the last test case
  if (currentTestCase.title || currentTestCase.precondition) {
    testCases.push({
      testId: currentTestCase.testId || `TC-${testCases.length + 1}`,
      title: currentTestCase.title || 'Untitled',
      precondition: currentTestCase.precondition || '',
      steps: currentTestCase.steps && currentTestCase.steps.length > 0 
        ? currentTestCase.steps 
        : ['Execute test'],
      expectedResult: currentTestCase.expectedResult || 'Test should pass',
    });
  }

  // If we still have nothing, create at least one basic test case
  if (testCases.length === 0 && text.trim().length > 0) {
    // Extract first few lines as parts of a basic test case
    const lines2 = text.split('\n').filter(l => l.trim());
    const title = lines2.find(l => l.trim().length > 5)?.trim() || 'Test Case 1';
    
    testCases.push({
      testId: 'TC-1',
      title: title.substring(0, 100),
      precondition: 'System is ready',
      steps: ['Execute the test steps as described'],
      expectedResult: 'Test should complete successfully',
    });
  }

  return testCases;
}
