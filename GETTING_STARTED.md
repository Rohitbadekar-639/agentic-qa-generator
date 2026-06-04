# Getting Started with Agentic QA Generator

Welcome! This guide will get you up and running in minutes.

## What You'll Need

1. **OpenAI API Key** (free at https://platform.openai.com)
2. **Node.js 18+** (from https://nodejs.org)
3. **Python 3.9+** (from https://python.org)
4. **Git** (optional, for version control)

## Step 1: Get Your OpenAI API Key (2 minutes)

1. Visit https://platform.openai.com/account/api-keys
2. Sign up or log in to your OpenAI account
3. Click "Create new secret key"
4. Copy the key (you'll need it in Step 3)

## Step 2: Automated Setup (1 minute)

### Windows Users:
```bash
cd Agentic-QA-Generator
setup.bat
```

### macOS/Linux Users:
```bash
cd Agentic-QA-Generator
chmod +x setup.sh
./setup.sh
```

This will:
- ✅ Create Python virtual environment
- ✅ Install backend dependencies
- ✅ Install frontend dependencies
- ✅ Create `.env` file template

## Step 3: Add Your API Key (30 seconds)

1. Open `backend/.env`
2. Replace `your_openai_api_key_here` with your actual API key
3. Save the file

```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
```

## Step 4: Start the Application (1 minute)

### Windows Users:
```bash
start.bat
```

### macOS/Linux Users:
```bash
chmod +x start.sh
./start.sh
```

This will:
- ✅ Start backend server on http://localhost:8000
- ✅ Start frontend server on http://localhost:3000
- ✅ Automatically open the dashboard in your browser

## Step 5: Generate Your First Test Suite (2 minutes)

1. **Paste a User Story**
   ```
   As a user, I want to login with email and password 
   so that I can access my account.
   
   Acceptance Criteria:
   - User can enter email and password
   - System validates email format
   - System validates password (min 8 characters)
   - User sees error for invalid credentials
   - User is redirected to dashboard on success
   ```

2. **Select a Framework**
   - Playwright (for E2E testing)
   - Jest (for unit testing)
   - Manual (for manual test scenarios)

3. **Click "Generate Test Suite"**

4. **Review the Results**
   - See generated test code
   - View extracted requirements
   - Copy or download the code

## What Happens Behind the Scenes

```
Your Story
    ↓
LangGraph Analyzer Node
  - Extracts requirements
  - Identifies edge cases
  - Finds business logic
    ↓
LangGraph Code Generator Node
  - Generates framework-specific tests
  - Uses Pydantic for validation
  - Returns syntactically correct code
    ↓
Your Test Suite
```

## Troubleshooting

### "Cannot connect to backend"
```bash
# Make sure backend is running
# Check that you see: "Uvicorn running on http://0.0.0.0:8000"
# If not, try starting manually:
cd backend
venv\Scripts\activate  # Windows
# or
source venv/bin/activate  # macOS/Linux
python main.py
```

### "Invalid API key"
- Check your OpenAI API key is correct
- Ensure no extra spaces in `.env` file
- Verify your account has API credits

### "Port already in use"
```bash
# Change port in backend/main.py (line with port=8000)
# Or kill the process using the port
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :8000
kill -9 <PID>
```

### "Module not found" errors
```bash
# Reinstall dependencies
cd backend
pip install -r requirements.txt

cd ../agentic-qa-generator
npm install
```

## Next Steps

- **Deploy to Production**: See `DEPLOYMENT.md`
- **Understand the Architecture**: See `ARCHITECTURE.md`
- **View Full Documentation**: See `README.md`
- **Production Checklist**: See `PRODUCTION_CHECKLIST.md`

## Example Stories to Try

### Example 1: E-Commerce Feature
```
As a customer, I want to add items to my shopping cart 
so that I can purchase multiple items at once.

Acceptance Criteria:
- User can click "Add to Cart" button
- Item is added to cart with correct quantity
- Cart count is updated in header
- User can view cart contents
- User can remove items from cart
- Cart persists across page refreshes
```

### Example 2: User Authentication
```
As a new user, I want to create an account 
so that I can access the application.

Acceptance Criteria:
- User can fill registration form
- Email validation is performed
- Password requirements are enforced (min 8 chars, 1 uppercase, 1 number)
- Duplicate email check is performed
- User receives confirmation email
- User can login after registration
- User sees appropriate error messages
```

### Example 3: Search Feature
```
As a user, I want to search for products 
so that I can find what I'm looking for quickly.

Acceptance Criteria:
- Search box is visible on all pages
- User can enter search terms
- Results load within 2 seconds
- Results are sorted by relevance
- User can filter by category
- User can sort by price/rating
- Empty results show helpful message
- Search history is saved (optional)
```

## Tips for Best Results

1. **Be Specific**: More detailed stories generate better tests
2. **Include Acceptance Criteria**: Helps identify test cases
3. **Mention Edge Cases**: Improves test coverage
4. **Use Clear Language**: Better for AI to understand
5. **Include Business Logic**: Ensures important tests are created

## Performance Expectations

- **First Request**: 15-30 seconds (API initialization)
- **Subsequent Requests**: 10-20 seconds
- **Code Generation**: ~5-10 seconds
- **Analysis**: ~3-5 seconds

## Support

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Review `README.md` for detailed documentation
3. Check `ARCHITECTURE.md` for technical details
4. See `DEPLOYMENT.md` for production deployment help

## What's Included

✅ Full-stack application (frontend + backend)
✅ LangGraph workflow orchestration
✅ Multiple testing framework support
✅ Beautiful, responsive UI
✅ Production-ready code
✅ Comprehensive documentation
✅ Deployment guides
✅ Setup automation scripts

## Ready to Deploy?

Once you're comfortable with the local version:

1. See `DEPLOYMENT.md` for production deployment
2. Follow `PRODUCTION_CHECKLIST.md` before going live
3. Use `start.bat` or `start.sh` for quick local testing

---

**You're all set!** 🚀 Start generating test suites now!
