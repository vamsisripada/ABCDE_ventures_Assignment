#!/bin/bash

echo "🚀 Shopping Cart Deployment Setup"
echo "=================================="
echo ""

echo "📦 Step 1: Installing Backend Dependencies..."
cd backend
npm install
echo "✅ Backend dependencies installed"
echo ""

echo "📦 Step 2: Installing Frontend Dependencies..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"
echo ""

echo "🗄️  Step 3: Database Setup Required"
echo "-----------------------------------"
echo "1. Create MongoDB Atlas account: https://www.mongodb.com/cloud/atlas"
echo "2. Create a cluster (FREE tier)"
echo "3. Get connection string"
echo "4. Update backend/.env file with:"
echo "   MONGODB_URI=your_connection_string"
echo ""

echo "🔐 Step 4: Security Configuration"
echo "-----------------------------------"
echo "1. Generate strong JWT secret (min 32 characters)"
echo "2. Update backend/.env file with:"
echo "   JWT_SECRET=your_secret_key"
echo ""

cd ../backend

if [ ! -f .env ]; then
  echo "⚠️  Creating .env file from example..."
  cp .env.example .env
  echo "✅ .env file created. Please update with your values!"
else
  echo "✅ .env file already exists"
fi

cd ../frontend

if [ ! -f .env ]; then
  echo "⚠️  Creating frontend .env file..."
  cp .env.example .env
  echo "✅ Frontend .env file created"
else
  echo "✅ Frontend .env file exists"
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Update backend/.env with MongoDB URI and JWT secret"
echo "2. Seed database: cd backend && npm run seed"
echo "3. Start backend: cd backend && npm start"
echo "4. Start frontend: cd frontend && npm run dev"
echo ""
echo "📖 For production deployment, see DEPLOYMENT.md"
echo ""
