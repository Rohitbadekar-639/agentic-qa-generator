# Agentic QA Generator - Documentation Index

## Quick Navigation

### 🚀 Getting Started
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Start here! 5-minute setup guide
- **[QUICKSTART.md](QUICKSTART.md)** - Alternative quick setup with troubleshooting

### 📚 Documentation
- **[README.md](README.md)** - Complete project documentation
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project overview and resume talking points
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture and design decisions

### 🚢 Deployment
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment guide (Vercel + Render)
- **[PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)** - Pre-launch verification checklist

## Project Structure

```
Agentic-QA-Generator/
├── 📖 Documentation
│   ├── INDEX.md (this file)
│   ├── GETTING_STARTED.md
│   ├── QUICKSTART.md
│   ├── README.md
│   ├── PROJECT_SUMMARY.md
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   └── PRODUCTION_CHECKLIST.md
│
├── 🔧 Setup & Start Scripts
│   ├── setup.sh (macOS/Linux)
│   ├── setup.bat (Windows)
│   ├── start.sh (macOS/Linux)
│   └── start.bat (Windows)
│
├── 🎨 Frontend (Next.js)
│   └── agentic-qa-generator/
│       ├── app/
│       │   ├── page.tsx
│       │   ├── layout.tsx
│       │   ├── globals.css
│       │   └── components/
│       │       ├── Dashboard.tsx (main UI)
│       │       └── CodeDisplay.tsx (syntax highlighting)
│       ├── package.json
│       ├── tsconfig.json
│       ├── tailwind.config.ts
│       ├── next.config.ts
│       └── vercel.json (deployment config)
│
├── 🔌 Backend (FastAPI)
│   └── backend/
│       ├── main.py (FastAPI app)
│       ├── langgraph_orchestrator.py (LangGraph workflow)
│       ├── requirements.txt (dependencies)
│       ├── .env.example (config template)
│       └── render.yaml (deployment config)
│
└── 📋 Configuration
    └── .gitignore
```

## What This Project Does

The **Agentic QA Generator** transforms Jira user stories into comprehensive automated test suites using:
- **LangGraph** for workflow orchestration
- **OpenAI API** for AI-powered analysis
- **Pydantic** for structured outputs
- **Next.js** for beautiful frontend
- **FastAPI** for robust backend

## Key Features

✅ **AI-Powered Analysis**
- Extracts functional requirements
- Identifies edge cases
- Finds business logic

✅ **Multiple Framework Support**
- Playwright (E2E testing)
- Jest (unit testing)
- Manual test scenarios (Markdown)

✅ **Production-Ready**
- Type-safe with TypeScript and Pydantic
- Comprehensive error handling
- CORS configuration
- Environment variable management

✅ **Beautiful UI**
- Modern gradient dashboard
- Real-time loading states
- Syntax-highlighted code display
- One-click copy and download

## Getting Started (Choose One)

### Option 1: Automated Setup (Recommended)
```bash
cd Agentic-QA-Generator

# Windows:
setup.bat
start.bat

# macOS/Linux:
./setup.sh
./start.sh
```

### Option 2: Manual Setup
See [GETTING_STARTED.md](GETTING_STARTED.md) for step-by-step instructions.

### Option 3: Quick Reference
See [QUICKSTART.md](QUICKSTART.md) for condensed setup.

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python 3.9+ |
| AI/Orchestration | LangGraph, LangChain, OpenAI API |
| Data Validation | Pydantic |
| Code Display | React Syntax Highlighter |
| Deployment | Vercel (frontend), Render (backend) |

## API Endpoints

### POST /api/generate-tests
Generate a test suite from a user story.

**Request:**
```json
{
  "story": "User story text",
  "framework": "playwright|jest|manual"
}
```

**Response:**
```json
{
  "code": "Generated test code",
  "framework": "playwright",
  "analysis": {
    "functional_requirements": [...],
    "edge_cases": [...],
    "business_logic": [...]
  }
}
```

### GET /health
Health check endpoint.

## Deployment Options

### Free Tier (Recommended)
- **Frontend**: Vercel (free, unlimited)
- **Backend**: Render (free tier, 750 hours/month)
- **Total Cost**: Free

### Paid Options
- **Railway**: $5-20/month
- **Heroku**: $7+/month
- **AWS**: Pay-as-you-go

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## Resume Talking Points

This project demonstrates:
- **AI/GenAI Skills**: LangGraph orchestration, structured outputs, AI integration
- **Backend Development**: FastAPI, async Python, REST API design
- **Frontend Development**: Next.js, TypeScript, React hooks, Tailwind CSS
- **Software Architecture**: State management, workflow design, clean code
- **DevOps**: Environment management, CORS, deployment automation
- **Production Readiness**: Error handling, validation, monitoring

## Performance

- **First Request**: 15-30 seconds (API initialization)
- **Subsequent Requests**: 10-20 seconds
- **Frontend Load**: <1 second
- **Code Generation**: ~5-10 seconds
- **Analysis**: ~3-5 seconds

## Security

✅ API keys in environment variables only
✅ CORS restricted to configured origins
✅ Input validation on all endpoints
✅ No sensitive data in frontend
✅ HTTPS ready for production

## Support & Troubleshooting

### Common Issues

**"Cannot connect to backend"**
- Ensure backend is running on port 8000
- Check CORS configuration in main.py

**"Invalid API key"**
- Verify OpenAI API key in backend/.env
- Ensure key has available credits

**"Port already in use"**
- Change port in main.py or package.json
- Or kill existing process on that port

See [GETTING_STARTED.md](GETTING_STARTED.md) for more troubleshooting.

## Documentation Map

| Document | Purpose | Read Time |
|----------|---------|-----------|
| [GETTING_STARTED.md](GETTING_STARTED.md) | Quick setup and first test | 5 min |
| [QUICKSTART.md](QUICKSTART.md) | Condensed setup guide | 3 min |
| [README.md](README.md) | Complete documentation | 15 min |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Project overview | 10 min |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical deep dive | 20 min |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment | 15 min |
| [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) | Pre-launch checklist | 10 min |

## Next Steps

1. **Get Started**: Follow [GETTING_STARTED.md](GETTING_STARTED.md)
2. **Generate Tests**: Paste a user story and generate your first test suite
3. **Explore Features**: Try different frameworks and stories
4. **Deploy**: Follow [DEPLOYMENT.md](DEPLOYMENT.md) for production
5. **Share**: Add to your resume and portfolio!

## File Sizes

- Frontend: ~500KB (optimized by Next.js)
- Backend: ~50KB (minimal dependencies)
- Total: <1MB (very lightweight)

## Browser Support

✅ Chrome/Edge
✅ Firefox
✅ Safari
✅ Mobile browsers (responsive design)

## License

MIT - Free to use and modify

## Quick Commands

```bash
# Setup
setup.bat              # Windows
./setup.sh            # macOS/Linux

# Start
start.bat             # Windows
./start.sh            # macOS/Linux

# Manual start
cd backend && python main.py
cd agentic-qa-generator && npm run dev

# Access
Frontend: http://localhost:3000
Backend: http://localhost:8000
```

## Project Statistics

- **Lines of Code**: ~1,500 (frontend + backend)
- **Dependencies**: ~50 (optimized)
- **Documentation**: ~15,000 words
- **Setup Time**: 5 minutes
- **First Test**: 2 minutes
- **Time to Production**: 30 minutes

## What Makes This Resume-Worthy

✅ **Demonstrates AI/GenAI Skills**
- LangGraph workflow orchestration
- Structured outputs with Pydantic
- OpenAI API integration
- Agentic design patterns

✅ **Production-Ready Code**
- Type-safe with TypeScript and Pydantic
- Comprehensive error handling
- Clean architecture
- Well-documented

✅ **Full-Stack Development**
- Modern frontend (Next.js, Tailwind)
- Robust backend (FastAPI)
- Beautiful UI/UX
- Responsive design

✅ **Deployment Ready**
- Vercel configuration
- Render configuration
- Environment management
- CORS setup

## Questions?

1. Check the relevant documentation file above
2. Review [GETTING_STARTED.md](GETTING_STARTED.md) for setup help
3. See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
4. Check [ARCHITECTURE.md](ARCHITECTURE.md) for technical details

---

**Ready to get started?** → [GETTING_STARTED.md](GETTING_STARTED.md)

**Ready to deploy?** → [DEPLOYMENT.md](DEPLOYMENT.md)

**Want technical details?** → [ARCHITECTURE.md](ARCHITECTURE.md)
