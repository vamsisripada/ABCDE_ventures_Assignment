# Terminal Commands for Shopping Cart Application

## 1. Start Backend Server

```bash
cd /Users/vamsi/Documents/Assignment/backend
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

Backend runs on: `http://localhost:5002`


## 2. Start Frontend Server

```bash
cd /Users/vamsi/Documents/Assignment/frontend
npm run dev
```

Frontend runs on: `http://localhost:3000`


## 3. Seed Database (First Time Setup)

```bash
cd /Users/vamsi/Documents/Assignment/backend
npm run seed
```


## 4. Test User Creation

```bash
cd /Users/vamsi/Documents/Assignment/backend
./test-user-creation.sh
```


## 5. Check if Ports are in Use

```bash
# Check port 5002 (backend)
lsof -i :5002

# Check port 3000 (frontend)
lsof -i :3000
```


## 6. Kill Process on Port

```bash
# Kill process on port 5002
lsof -ti:5002 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```


## 7. Install Dependencies

```bash
# Backend dependencies
cd /Users/vamsi/Documents/Assignment/backend
npm install

# Frontend dependencies
cd /Users/vamsi/Documents/Assignment/frontend
npm install
```


## 8. Test API Endpoints

### Create User
```bash
curl -X POST http://localhost:5002/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5002/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Get All Items
```bash
curl http://localhost:5002/api/items
```

### Get Cart (Requires Token)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5002/api/items
```


## 9. Connect to MongoDB

```bash
mongosh
use shopping-cart
db.users.find()
db.items.find()
db.orders.find()
```


## 10. View Logs

### Backend logs
```bash
cd /Users/vamsi/Documents/Assignment/backend
npm start
```

### Frontend build output
```bash
cd /Users/vamsi/Documents/Assignment/frontend
npm run dev
```


## Quick Start (All in One)

Open 2 terminals and run:

**Terminal 1 - Backend:**
```bash
cd /Users/vamsi/Documents/Assignment/backend && npm start
```

**Terminal 2 - Frontend:**
```bash
cd /Users/vamsi/Documents/Assignment/frontend && npm run dev
```

Then open: `http://localhost:3000`


## Common Issues & Fixes

### Port Already in Use
```bash
# Find and kill process
lsof -ti:5002 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Error
Ensure MongoDB is running:
```bash
mongod
```

### Dependencies Missing
```bash
cd /Users/vamsi/Documents/Assignment/backend && npm install
cd /Users/vamsi/Documents/Assignment/frontend && npm install
```

### Clear Node Modules
```bash
rm -rf node_modules
npm install
```
