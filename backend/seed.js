import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Item from './models/Item.js';

dotenv.config();

const sampleItems = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 129.99,
    stock: 50
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with fitness tracking',
    price: 249.99,
    stock: 30
  },
  {
    name: 'Laptop Stand',
    description: 'Ergonomic aluminum laptop stand',
    price: 49.99,
    stock: 100
  },
  {
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with multiple ports',
    price: 39.99,
    stock: 75
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches',
    price: 89.99,
    stock: 40
  },
  {
    name: 'Webcam HD',
    description: '1080p HD webcam with auto-focus',
    price: 69.99,
    stock: 60
  },
  {
    name: 'Portable SSD',
    description: '1TB portable SSD with fast transfer speeds',
    price: 149.99,
    stock: 45
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 29.99,
    stock: 120
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Item.deleteMany({});
    console.log('Cleared existing items');

    await Item.insertMany(sampleItems);
    console.log('Sample items added successfully');

    mongoose.connection.close();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
