# 🚀 Quick Start Guide - Testing LocalLLMTestGenBuddy

## ✅ Current Status
- Backend running on **http://localhost:5000** ✓
- Frontend running on **http://localhost:3000** ✓
- Both servers tested and responding ✓

---

## Option 1: Test with Ollama (Local LLM - No Cost)

### Step 1: Install Ollama
1. Download from **https://ollama.ai**
2. Install and follow setup wizard
3. Restart your computer (recommended)

### Step 2: Pull a Model
Open a new terminal and run:
```bash
ollama pull gemma3:1b
```

Wait for download to complete (~4GB).

### Step 3: Start Ollama Server
```bash
ollama serve
```

You should see:
```
Listening on 127.0.0.1:11434 (http)
```

### Step 4: Test with Frontend
1. Open **http://localhost:3000** in browser
2. You should see "Ollama" selected in the provider dropdown
3. Enter a requirement:
   ```
   Users should be able to login with email and password.
   The email should be validated for correct format.
   ```
4. Click **"Generate Test Cases"**
5. Wait 10-30 seconds for results
6. See generated test cases in the table!

---

## Option 2: Test with OpenAI API (Cloud-Based)

### Step 1: Get OpenAI API Key
1. Go to **https://platform.openai.com/api-keys**
2. Sign up or log in
3. Create a new API key
4. Copy the key (save safely!)

### Step 2: Configure Backend
1. Open `backend/.env`
2. Change:
   ```env
   LLM_PROVIDER=openai
   OPENAI_API_KEY=sk-your-actual-key-here
   OPENAI_MODEL=gpt-3.5-turbo
   ```
3. **Restart backend server** (Ctrl+C, then `npm run dev`)

### Step 3: Test with Frontend
1. Open **http://localhost:3000** in browser
2. Provider dropdown should now show "OpenAI"
3. Enter a requirement (same as above)
4. Click **"Generate Test Cases"**
5. Wait 5-10 seconds
6. See generated test cases!

---

## Sample Requirements to Test

### Test Case 1: Login Feature
```
Users should be able to login with email and password. 
The system should validate email format and password strength.
Account lockout after 5 failed attempts.
```

### Test Case 2: Search Functionality
```
Users should search for products by name or category.
Search should support filters for price and rating.
Results should be paginated (10 items per page).
```

### Test Case 3: Payment Processing
```
Users should complete payment checkout using credit card.
Payment should validate card number, expiration, and CVV.
Order confirmation should be sent via email.
```

---

## What to Expect

### Successful Generation
- Table shows test cases with:
  - Test ID (TC-001, TC-002, etc.)
  - Title (descriptive test name)
  - Precondition (setup needed)
  - Steps (numbered test steps)
  - Expected Result (what should happen)

### Export Options
Click one of these buttons:
- **📥 Export as CSV** - Open in Excel
- **📥 Export as JSON** - Use in other tools
- **📋 Copy to Clipboard** - Paste anywhere

---

## Troubleshooting

### "LLM not responding"
**With Ollama:**
- Verify `ollama serve` is running in a terminal
- Check firewall isn't blocking port 11434

**With OpenAI:**
- Check API key is valid
- Check account has credits
- Verify OPENAI_API_KEY in .env is correct

### "No test cases generated"
- Check LLM is configured (see providers dropdown)
- Try a longer, more detailed requirement
- Check browser console (F12) for errors

### "Cannot connect to server"
- Verify backend is running: `npm run dev` in backend folder
- Verify frontend is running: `npm run dev` in frontend folder
- Try http://localhost:5000/api/health in browser

---

## Monitor Server Logs

### Backend Logs
Look at the terminal where you ran `npm run dev` in backend folder:
```
[2026-03-14T16:48:35.612Z] [INFO] 🚀 Server running on http://localhost:5000
[2026-03-14T16:48:40.000Z] [INFO] Generating test cases...
```

### Frontend Logs
Open browser console: **F12 → Console tab**
- Look for network requests to `/api/generate-testcases`
- Check for any error messages

---

## Performance Tips

1. **Ollama Performance:**
   - First request is slower (cold start)
   - Subsequent requests are faster
   - CPU/GPU determines speed

2. **OpenAI Performance:**
   - Usually faster than Ollama
   - Depends on API load
   - Costs money per request

3. **Requirement Quality:**
   - More detailed requirements = better test cases
   - Include business rules and edge cases
   - Mention validation rules

---

## Next Steps

After testing successfully:

1. **Export Test Cases**
   - Download CSV for Excel
   - Export JSON for system integration
   - Copy to Jira or other tools

2. **Generate More**
   - Try different requirements
   - Test different scenarios
   - Batch process multiple requirements

3. **Integrate with Workflow**
   - Import CSV to Excel
   - Copy JSON to API endpoint
   - Share results with team

---

## Keep Servers Running

To keep using the app:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# Keep this running
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# Keep this running
```

**Terminal 3 (if using Ollama):**
```bash
ollama serve
# Keep this running
```

---

## Stop Servers

When done:
1. In each terminal: Press **Ctrl+C**
2. Servers will shut down gracefully
3. Data is not lost (can restart)

---

## Getting Help

If something doesn't work:

1. **Check logs** in terminal windows
2. **Check browser console** (F12)
3. **Review SETUP.md** for detailed instructions
4. **Check TEST_REPORT.md** for system status

---

**You're all set! 🎉 Open http://localhost:3000 and start generating test cases!**
