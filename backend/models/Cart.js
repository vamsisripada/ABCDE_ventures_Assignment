import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [{
    itemId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Item', 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true, 
      default: 1 
    }
  }],
  status: { 
    type: String, 
    enum: ['active', 'ordered'], 
    default: 'active' 
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Cart', cartSchema);
