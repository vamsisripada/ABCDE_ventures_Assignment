import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  imageUrl: { 
    type: String, 
    default: '' 
  },
  stock: { 
    type: Number, 
    default: 100 
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Item', itemSchema);
