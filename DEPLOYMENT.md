# Deployment Guide

Deploy the Agentic QA Generator to production for free using Vercel and Render.

## Option 1: Deploy Frontend to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications with zero configuration.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/Agentic-QA-Generator.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Choose "agentic-qa-generator" as the root directory
   - Click "Deploy"

3. **Set Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com`
   - Redeploy

## Option 2: Deploy Backend to Render (Free Tier)

Render offers free hosting for Python applications.

### Steps:

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   - **Name**: agentic-qa-generator-api
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Root Directory**: Leave empty (or set to backend if needed)

4. **Add Environment Variables**
   - Go to Environment
   - Add: `OPENAI_API_KEY=your_key_here`

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy the service URL (e.g., https://agentic-qa-generator-api.onrender.com)

## Option 3: Deploy Both to Railway

Railway offers a generous free tier and simple deployment.

### Frontend on Railway:

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-url`
5. Deploy

### Backend on Railway:

1. Create new service in same project
2. Select your repository
3. Set root directory to `backend`
4. Add environment variable: `OPENAI_API_KEY=your_key`
5. Railway will auto-detect Python and deploy

## Option 4: Deploy to Heroku (Paid, but simple)

Heroku has deprecated free tier, but offers paid options starting at $5/month.

## Updating After Deployment

### Update Frontend (Vercel)
- Push changes to GitHub
- Vercel automatically redeploys on push

### Update Backend (Render/Railway)
- Push changes to GitHub
- Service automatically redeploys on push
- If you change environment variables, manually trigger redeploy

## Monitoring

### Check Backend Health
```bash
curl https://your-backend-url.onrender.com/health
```

Should return:
```json
{"status": "ok"}
```

### View Logs
- **Vercel**: Dashboard → Deployments → Logs
- **Render**: Dashboard → Service → Logs
- **Railway**: Dashboard → Service → Logs

## Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| Vercel Frontend | Free | Unlimited deployments |
| Render Backend | Free | 750 free compute hours/month (enough for ~1 instance) |
| OpenAI API | Pay-as-you-go | ~$0.002 per request (very cheap) |
| **Total** | **Free-$5/month** | Depending on usage |

## Troubleshooting Deployment

### Frontend shows "Cannot connect to backend"
- Check backend URL in Vercel environment variables
- Verify backend is running: `curl https://your-backend-url/health`
- Check CORS settings in backend/main.py

### Backend returns 500 error
- Check logs in Render/Railway dashboard
- Verify OPENAI_API_KEY is set in environment variables
- Ensure API key has available credits

### Slow response times
- First request after deployment may be slow (cold start)
- Subsequent requests are faster
- Consider upgrading to paid tier for better performance

## Custom Domain

### Add Custom Domain to Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

### Add Custom Domain to Render
1. Go to Service Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

## Security Checklist

- [ ] OPENAI_API_KEY is set as environment variable (not in code)
- [ ] CORS is configured correctly in backend
- [ ] Frontend uses HTTPS in production
- [ ] Backend uses HTTPS in production
- [ ] No sensitive data in git repository
- [ ] .env files are in .gitignore

## Performance Tips

1. **Cache API responses** in frontend for repeated stories
2. **Add rate limiting** to backend to prevent abuse
3. **Use CDN** for static assets (Vercel does this automatically)
4. **Monitor API usage** to stay within OpenAI free tier limits

## Scaling for Production

If your application gets popular:

1. **Upgrade Render plan** to paid tier for better performance
2. **Add caching layer** (Redis) for frequently generated tests
3. **Implement job queue** (Celery) for long-running generations
4. **Add database** (PostgreSQL) to store generated tests
5. **Implement user authentication** for personalized test history

## Support

For deployment issues:
- Vercel: https://vercel.com/support
- Render: https://render.com/docs
- Railway: https://railway.app/docs
- OpenAI: https://platform.openai.com/docs
