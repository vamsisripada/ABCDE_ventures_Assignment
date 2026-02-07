import express from 'express';
import Cart from '../models/Cart.js';
import Item from '../models/Item.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/carts', auth, async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }

    let cart = await Cart.findOne({ userId: req.user._id, status: 'active' });

    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        items: [{ itemId, quantity }]
      });
    } else {
      const existingItem = cart.items.find(i => i.itemId.toString() === itemId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ itemId, quantity });
      }
    }

    await cart.save();
    await cart.populate('items.itemId');
    res.status(201).send(cart);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get('/carts', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id, status: 'active' })
      .populate('items.itemId');
    
    if (!cart) {
      return res.send({ items: [] });
    }

    res.send(cart);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete('/carts/:itemId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id, status: 'active' });
    
    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(i => i.itemId.toString() !== req.params.itemId);
    await cart.save();
    await cart.populate('items.itemId');
    
    res.send(cart);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete('/carts', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id, status: 'active' });
    
    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();
    
    res.send({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
