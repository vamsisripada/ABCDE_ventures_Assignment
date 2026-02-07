# Shopping Cart Application

A full-stack e-commerce application with single-device session management, built with Node.js, Express, MongoDB, React, and Tailwind CSS.

## Features

- User authentication with JWT
- Single-device login enforcement
- Browse products
- Add items to cart
- Place orders
- View order history

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## Installation

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

## Usage

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
