# 🚀 Production Deployment Guide

## Overview

This guide covers deploying your Shopping Cart application to production using popular platforms.

**Architecture:**
- **Frontend**: React (Vite) → Vercel/Netlify
- **Backend**: Node.js/Express → Render/Railway/Heroku
- **Database**: MongoDB → MongoDB Atlas

---

## 📋 Pre-Deployment Checklist

### 1. MongoDB Atlas Setup (Database)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to your backend server
   - Name your cluster (e.g., "shopping-cart")

3. **Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `admin` (or your choice)
   - Password: Generate secure password (save it!)
   - User Privileges: "Atlas admin"

4. **Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/shopping-cart?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password

---

## 🎯 Backend Deployment

### Option 1: Render (Recommended - Free Tier)

1. **Sign Up**
   - Go to [Render.com](https://render.com)
   - Sign up with GitHub

2. **New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select repository: `ABCDE_ventures_Assignment`

3. **Configure Service**
   ```
   Name: shopping-cart-backend
   Region: Choose closest
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   ```
   PORT=5002
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/shopping-cart?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

5. **Create Web Service**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy your backend URL: `https://shopping-cart-backend.onrender.com`

6. **Seed Database**
   - Go to "Shell" tab in Render dashboard
   - Run: `npm run seed`

### Option 2: Railway

1. **Sign Up**: [Railway.app](https://railway.app)
2. **New Project** → "Deploy from GitHub repo"
3. **Select repository** and backend folder
4. **Variables**: Add same environment variables as Render
5. **Deploy**: Railway auto-deploys

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   brew tap heroku/brew && brew install heroku
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   cd backend
   heroku create shopping-cart-backend
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_uri"
   heroku config:set JWT_SECRET="your_jwt_secret"
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended - Free Tier)

1. **Sign Up**
   - Go to [Vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select repository: `ABCDE_ventures_Assignment`

3. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables**
   ```
   VITE_API_URL=https://shopping-cart-backend.onrender.com/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Get your URL: `https://your-app.vercel.app`

6. **Update Backend CORS**
   - Go back to Render (backend)
   - Update `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
   - Redeploy backend

### Option 2: Netlify

1. **Sign Up**: [Netlify.com](https://netlify.com)
2. **New Site from Git**
3. **Build Settings**:
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```
4. **Environment Variables**: Add `VITE_API_URL`
5. **Deploy**

---

## 🔧 Post-Deployment Steps

### 1. Update Backend CORS

Edit [backend/server.js](backend/server.js):
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://your-app.vercel.app',
  credentials: true
};
```

### 2. Test the Application

1. **Visit Frontend URL**: `https://your-app.vercel.app`
2. **Create Account**: Sign up with test credentials
3. **Test Features**:
   - Login/Logout
   - Browse items
   - Add to cart
   - Place order
   - Check order history
   - Test single-device login (try logging in from another browser)

### 3. Custom Domain (Optional)

**Vercel:**
- Settings → Domains → Add your domain
- Update DNS records as instructed

**Render:**
- Settings → Custom Domain → Add your domain

---

## 🔐 Security Checklist

- [x] Strong JWT secret (min 32 characters)
- [x] MongoDB password is secure
- [x] Environment variables not in code
- [x] CORS configured for production
- [x] .env files in .gitignore
- [x] Passwords hashed with bcrypt
- [x] JWT tokens validated against database

---

## 📊 Monitoring & Maintenance

### Render Dashboard
- View logs: Dashboard → Logs
- Monitor usage: Dashboard → Metrics
- Manual Deploy: Dashboard → Manual Deploy

### Vercel Dashboard
- View deployments: Project → Deployments
- Check analytics: Project → Analytics
- View logs: Deployment → Function logs

### MongoDB Atlas
- Monitor usage: Cluster → Metrics
- View data: Cluster → Browse Collections
- Backup: Cluster → Backup

---

## 🐛 Troubleshooting

### Backend Issues

**Error: Cannot connect to MongoDB**
```bash
Solution: Check MongoDB Atlas IP whitelist and connection string
```

**Error: CORS policy**
```bash
Solution: Update FRONTEND_URL in backend environment variables
```

**Error: Port already in use**
```bash
Solution: Make sure PORT environment variable is set correctly
```

### Frontend Issues

**Error: API calls failing**
```bash
Solution: Check VITE_API_URL in Vercel environment variables
Ensure it includes /api at the end
```

**Error: Build failed**
```bash
Solution: Check Node version in Vercel settings (use Node 18)
```

---

## 💰 Cost Breakdown

### Free Tier Limits

**MongoDB Atlas** (Free):
- 512 MB storage
- Shared RAM
- ~1000 users capacity

**Render** (Free):
- Auto-sleep after 15 min inactivity
- 750 hours/month
- Spins up in 30-60 seconds

**Vercel** (Free):
- 100 GB bandwidth
- Unlimited domains
- Instant deployment

**Total Monthly Cost**: **$0** for hobby/portfolio projects

---

## 🔄 CI/CD (Automatic Deployments)

Both Vercel and Render support automatic deployments:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **Auto Deploy**
   - Vercel auto-deploys frontend
   - Render auto-deploys backend
   - Wait 2-3 minutes

3. **Verify**
   - Check deployment logs
   - Test on production URL

---

## 📱 Mobile Testing

Test on mobile devices:
1. Open frontend URL on phone
2. Test all features
3. Check responsive design
4. Test single-device login between desktop/mobile

---

## 🎓 Next Steps

1. Add Google Analytics
2. Set up error tracking (Sentry)
3. Add email notifications
4. Implement payment gateway
5. Add product images (upload to Cloudinary)
6. Set up automated testing
7. Add rate limiting
8. Implement caching (Redis)

---

## 📞 Support Resources

- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [GitHub Issues](https://github.com/vamsisripada/ABCDE_ventures_Assignment/issues)

---

## ✅ Quick Deploy Commands

```bash
git add .
git commit -m "Production deployment ready"
git push origin main
```

**Your app is now production-ready!** 🎉
