# Faster Test Case Generation Setup

## Issue
The **gemma3:1b** Ollama model can be slow on local hardware (30+ seconds per request), causing timeout issues during test case generation.

## Solution 1: Use OpenAI (Recommended for Speed ✅)

### Setup OpenAI Provider

1. **Get an OpenAI API Key:**
   - Visit https://platform.openai.com/api/keys
   - Create a new API key
   - Copy the key

2. **Update `.env` file in backend folder:**
   ```bash
   OPENAI_API_KEY=sk-your-api-key-here
   OPENAI_MODEL=gpt-3.5-turbo
   LLM_PROVIDER=openai
   ```

3. **Restart backend server**

4. **In the UI:**
   - Select "OpenAI (gpt-3.5-turbo)" from the LLM Provider dropdown
   - Click "Test Connection" to verify
   - Generate test cases - should complete in 5-10 seconds

### Benefits
- Fast response times (5-10 seconds per request)
- High quality test cases
- Reliable and consistent

### Cost
- ~$0.001 per request (~1,000 requests = $1)
- Free trial available

---

## Solution 2: Use Faster Ollama Model

If you want to stay local, switch to a **faster model**:

### Recommended Models:
- **phi3:mini** (2.7B params) - Very fast, decent quality
- **orca-mini** (3B params) - Good balance of speed and quality
- **tinyllama** (1.1B params) - Ultra-fast, lightweight

### Steps:
1. Pull the faster model:
   ```bash
   ollama pull phi3:mini
   ```

2. Update backend `.env`:
   ```bash
   OLLAMA_MODEL=phi3:mini
   ```

3. Restart backend and test

---

## Solution 3: Increase Server/Axios Timeouts (Current Fix)

Backend has been updated with:
- **5-minute timeout** for LLM inference
- Increased Node.js request timeout
- Increased Axios client timeout for Ollama

This allows **gemma3:1b** to complete requests, but responses may take 1-3 minutes.

**To use this:**
- Just wait longer for responses
- UI will show "Generating test cases..." during processing
- Results will appear once complete

---

## Recommended Action
**Switch to OpenAI** for best results - it's fast, reliable, and cost-effective.

If you want to stay local, try **phi3:mini** or **orca-mini** models.

---

## Testing Your Setup

After configuring your provider:

1. **Test Connection Button:**
```
LLM Provider: [dropdown] 🔗 Test Connection
```
- Click to verify provider is working

2. **Generate Test Cases:**
- Enter requirement: "Login with valid email"
- Click "Generate Test Cases"
- Should see "Generating test cases..." message
- Results appear when ready

---

## Troubleshooting

### Connection Test Shows Error
- Ollama: Ensure `ollama serve` is running
- OpenAI: Check API key is valid, not expired

### Generation Times Out (>5 min)
- Model might be unavailable
- Check logs in terminal
- Try switching to OpenAI

### No Models Available
- Ollama: Run `ollama pull gemma3:1b` to download
- OpenAI: Verify API key in `.env`
