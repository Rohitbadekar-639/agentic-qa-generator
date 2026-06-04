# Production Checklist

Complete this checklist before deploying to production.

## Pre-Deployment Setup

- [ ] **OpenAI API Key**
  - [ ] Create account at https://platform.openai.com
  - [ ] Generate API key
  - [ ] Add to `backend/.env`
  - [ ] Verify key has available credits

- [ ] **Local Testing**
  - [ ] Run `setup.bat` or `setup.sh`
  - [ ] Start backend: `python main.py`
  - [ ] Start frontend: `npm run dev`
  - [ ] Test at http://localhost:3000
  - [ ] Generate test with sample story
  - [ ] Verify code display and download works

- [ ] **Code Review**
  - [ ] Review `main.py` for security issues
  - [ ] Check `langgraph_orchestrator.py` for edge cases
  - [ ] Verify `Dashboard.tsx` error handling
  - [ ] Check CORS configuration

## Frontend Deployment (Vercel)

- [ ] **GitHub Setup**
  - [ ] Initialize git: `git init`
  - [ ] Add all files: `git add .`
  - [ ] Create initial commit: `git commit -m "Initial commit"`
  - [ ] Create GitHub repository
  - [ ] Add remote: `git remote add origin <url>`
  - [ ] Push to GitHub: `git push -u origin main`

- [ ] **Vercel Deployment**
  - [ ] Go to https://vercel.com/new
  - [ ] Import GitHub repository
  - [ ] Select `agentic-qa-generator` as root directory
  - [ ] Add environment variable:
    - Key: `NEXT_PUBLIC_API_URL`
    - Value: `https://your-backend-url.onrender.com`
  - [ ] Click "Deploy"
  - [ ] Wait for deployment to complete
  - [ ] Test frontend at provided URL

- [ ] **Post-Deployment**
  - [ ] Verify frontend loads
  - [ ] Check console for errors
  - [ ] Test API connectivity

## Backend Deployment (Render)

- [ ] **Render Setup**
  - [ ] Go to https://render.com
  - [ ] Sign up with GitHub
  - [ ] Create new Web Service
  - [ ] Connect your GitHub repository
  - [ ] Configure service:
    - Name: `agentic-qa-generator-api`
    - Environment: `Python 3`
    - Build Command: `pip install -r requirements.txt`
    - Start Command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`

- [ ] **Environment Variables**
  - [ ] Add `OPENAI_API_KEY` with your API key
  - [ ] Verify no other secrets are needed

- [ ] **Deployment**
  - [ ] Click "Create Web Service"
  - [ ] Wait for build and deployment (2-3 minutes)
  - [ ] Copy service URL

- [ ] **Post-Deployment**
  - [ ] Test health endpoint: `curl https://your-backend-url/health`
  - [ ] Verify CORS headers are correct
  - [ ] Check logs for errors

## Integration Testing

- [ ] **Frontend-Backend Connection**
  - [ ] Update `NEXT_PUBLIC_API_URL` in Vercel if needed
  - [ ] Redeploy frontend
  - [ ] Test API call from frontend
  - [ ] Verify response is received

- [ ] **Full Workflow Test**
  - [ ] Paste sample story in frontend
  - [ ] Select framework (Playwright)
  - [ ] Click "Generate Test Suite"
  - [ ] Verify code is generated
  - [ ] Verify analysis is displayed
  - [ ] Test copy button
  - [ ] Test download button

- [ ] **Error Handling**
  - [ ] Test with empty story
  - [ ] Test with invalid framework
  - [ ] Disconnect backend and test error message
  - [ ] Verify error messages are user-friendly

## Performance Testing

- [ ] **Load Testing**
  - [ ] Test with long story (>1000 characters)
  - [ ] Test with short story (<100 characters)
  - [ ] Measure response time
  - [ ] Verify no timeouts

- [ ] **Browser Testing**
  - [ ] Test on Chrome
  - [ ] Test on Firefox
  - [ ] Test on Safari
  - [ ] Test on mobile (iOS/Android)
  - [ ] Verify responsive design

## Security Checklist

- [ ] **API Key Security**
  - [ ] OPENAI_API_KEY is in environment variables only
  - [ ] No API key in code or git history
  - [ ] No API key in frontend code
  - [ ] .env file is in .gitignore

- [ ] **CORS Configuration**
  - [ ] CORS is restricted to specific origins
  - [ ] No wildcard CORS in production
  - [ ] Frontend URL is whitelisted

- [ ] **Input Validation**
  - [ ] Story text is validated
  - [ ] Framework selection is validated
  - [ ] No SQL injection possible
  - [ ] No XSS vulnerabilities

- [ ] **HTTPS**
  - [ ] Frontend uses HTTPS
  - [ ] Backend uses HTTPS
  - [ ] All API calls use HTTPS

## Monitoring & Logging

- [ ] **Vercel Monitoring**
  - [ ] Set up error tracking
  - [ ] Monitor deployment logs
  - [ ] Set up alerts for failures

- [ ] **Render Monitoring**
  - [ ] Check logs regularly
  - [ ] Monitor API response times
  - [ ] Set up alerts for errors

- [ ] **OpenAI API Monitoring**
  - [ ] Monitor API usage
  - [ ] Check remaining credits
  - [ ] Set up usage alerts

## Documentation

- [ ] **README.md**
  - [ ] Updated with production URLs
  - [ ] All links are correct
  - [ ] Troubleshooting section is complete

- [ ] **DEPLOYMENT.md**
  - [ ] Instructions are accurate
  - [ ] All URLs are correct
  - [ ] Deployment steps are clear

- [ ] **QUICKSTART.md**
  - [ ] Setup instructions work
  - [ ] All commands are tested
  - [ ] Example story is helpful

## Post-Launch

- [ ] **Monitor First 24 Hours**
  - [ ] Check for errors in logs
  - [ ] Monitor API usage
  - [ ] Verify uptime
  - [ ] Test user workflows

- [ ] **Gather Feedback**
  - [ ] Test with real users
  - [ ] Collect feedback
  - [ ] Note any issues

- [ ] **Maintenance Plan**
  - [ ] Set up regular backups
  - [ ] Plan for updates
  - [ ] Monitor costs
  - [ ] Schedule maintenance windows

## Rollback Plan

If deployment fails:

1. **Frontend Rollback**
   - [ ] Go to Vercel dashboard
   - [ ] Select previous deployment
   - [ ] Click "Redeploy"

2. **Backend Rollback**
   - [ ] Go to Render dashboard
   - [ ] Select previous deployment
   - [ ] Click "Redeploy"

3. **Database Rollback** (if applicable)
   - [ ] Restore from backup
   - [ ] Verify data integrity

## Success Criteria

- [ ] Frontend loads without errors
- [ ] Backend responds to health check
- [ ] API calls complete successfully
- [ ] Generated code is syntactically correct
- [ ] All frameworks (Playwright, Jest, Manual) work
- [ ] Copy and download buttons work
- [ ] Error messages are helpful
- [ ] Performance is acceptable (<30 seconds)
- [ ] Mobile design is responsive
- [ ] HTTPS is enabled
- [ ] No sensitive data is exposed

## Sign-Off

- [ ] Project Lead: _________________ Date: _______
- [ ] QA Tester: _________________ Date: _______
- [ ] DevOps: _________________ Date: _______

---

**Notes:**
- Keep this checklist updated as you deploy
- Document any issues encountered
- Update procedures based on lessons learned
- Share feedback with the team
