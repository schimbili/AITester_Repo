## Template 4: Anti-Hallucination Context
**File:** `context_constraints.md` 

```
# Constraints & Rules

## MUST Follow
- Use ONLY information from provided documents
- Do NOT assume undocumented features
- Mark uncertainties as "[NEEDS CLARIFICATION]"
- If missing info, state "Not specified in requirements"

## MUST NOT Do
- Invent error codes or messages
- Assume validation rules not documented
- Create fictional API endpoints
- Guess system behavior

## Output Rules
- Use specified format exactly
- Include all required fields
- Mark assumptions with "[ASSUMPTION]"
```
