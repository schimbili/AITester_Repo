export class JiraFormatter {
  static formatToJira(rawOutput: string): string {
    // This is a simple formatter. In a real scenario, we might want to guide the LLM 
    // to produce JSON and then format it. For now, we'll ensure the output is 
    // structured with Jira-like headers.
    
    // If the LLM already provides a good structure, we returned it.
    // We can add logic here to wrap it in Jira markdown if needed.
    return rawOutput;
  }

  static getSystemPrompt(): string {
    return `You are an expert QA Engineer. Your task is to generate comprehensive test cases based on the provided requirements.
Generate both Functional and Non-Functional test cases.
Format each test case in a clear structure compatible with Jira:
- **Summary**: A concise title of the test case.
- **Description**: Brief context of what is being tested.
- **Pre-conditions**: Any setup required.
- **Test Steps**: Numbered list of actions.
- **Expected Results**: What the successful outcome looks like.
- **Priority**: High, Medium, or Low.
- **Type**: Functional or Non-Functional.

Use markdown formatting.`;
  }
}
