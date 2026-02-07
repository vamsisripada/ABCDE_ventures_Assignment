# Shopping Cart Application

A full-stack e-commerce application with single-device session management, built with Node.js, Express, MongoDB, React, and Tailwind CSS.

## 🌟 Features

- **User Authentication** with JWT
- **Single-Device Login** enforcement
- **Product Browsing** with grid layout
- **Shopping Cart** management
- **Order Placement** and history
- **Responsive Design** with Tailwind CSS
- **Real-time Cart Updates**
- **Toast Notifications**

## 🚀 Live Demo

- **Frontend**: [Deploy on Vercel](https://vercel.com)
- **Backend**: [Deploy on Render](https://render.com)
- **Database**: MongoDB Atlas

## 📸 Screenshots

### Login & Authentication
Single-device login with beautiful gradient UI

### Product Grid
Browse items with add-to-cart functionality

### Shopping Cart
Manage cart items and proceed to checkout

### Order History
View all completed orders

## 🛠 Tech Stack

### Backend
- **Node.js** & **Express.js** - Web framework
- **MongoDB** & **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Git

## 🚀 Quick Start

### Automated Setup

```bash
git clone https://github.com/vamsisripada/ABCDE_ventures_Assignment.git
cd ABCDE_ventures_Assignment
./setup.sh
```

### Manual Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

4. Seed the database with sample items:
```bash
node seed.js
```

5. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🌐 Production Deployment

### Quick Deploy to Production

1. **MongoDB Atlas Setup**
   - Create free account at [MongoDB Atlas](https://mongodb.com/cloud/atlas)
   - Create cluster and get connection string
   - Whitelist all IPs (0.0.0.0/0)

2. **Deploy Backend** (Render)
   - Sign up at [Render.com](https://render.com)
   - New Web Service → Connect GitHub repo
   - Root directory: `backend`
   - Add environment variables:
     ```
     MONGODB_URI=your_atlas_connection_string
     JWT_SECRET=your_secure_secret_key
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend.vercel.app
     ```

3. **Deploy Frontend** (Vercel)
   - Sign up at [Vercel.com](https://vercel.com)
   - Import GitHub repo
   - Root directory: `frontend`
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend.onrender.com/api
     ```

4. **Seed Production Database**
   - Go to Render dashboard → Shell
   - Run: `npm run seed`

📖 **Detailed deployment guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5002
MONGODB_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5002/api
```

## 📁 Project Structure

1. Open your browser and navigate to `http://localhost:3000`
2. Create a new account by clicking "Sign Up"
3. Login with your credentials
4. Browse items and add them to your cart
5. View your cart and place orders
6. Check your order history

## Single-Device Login

The application enforces single-device login:
- Only one active session per user is allowed
- Attempting to login from another device will show an error
- Logging out releases the session, allowing login from any device

## API Endpoints

### User Routes
- `POST /api/users` - Create new user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user
- `GET /api/users/me` - Get current user

### Item Routes
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item (protected)
- `GET /api/items/:id` - Get item by ID

### Cart Routes
- `GET /api/carts` - Get user's cart (protected)
- `POST /api/carts` - Add item to cart (protected)
- `DELETE /api/carts/:itemId` - Remove item from cart (protected)
- `DELETE /api/carts` - Clear cart (protected)

### Order Routes
- `GET /api/orders` - Get user's orders (protected)
- `POST /api/orders` - Place order (protected)
- `GET /api/orders/:id` - Get order by ID (protected)

## Technology Stack

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- Lucide React (icons)

## Project Structure

```
/shopping-cart-app
├── /backend
│   ├── /models
│   │   ├── User.js
│   │   ├── Item.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── /middleware
│   │   └── auth.js
│   ├── /routes
│   │   ├── userRoutes.js
│   │   ├── itemRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── server.js
│   ├── seed.js
│   ├── .env
│   └── package.json
├── /frontend
│   ├── /src
│   │   ├── /components
│   │   │   ├── Login.jsx
│   │   │   ├── ItemList.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Cart.jsx
│   │   │   └── Orders.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── api.js
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
└── README.md
```
