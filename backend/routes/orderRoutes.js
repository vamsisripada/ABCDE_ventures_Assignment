import express from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Item from '../models/Item.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/orders', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id, status: 'active' })
      .populate('items.itemId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).send({ error: 'Cart is empty' });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const cartItem of cart.items) {
      const item = cartItem.itemId;
      const itemTotal = item.price * cartItem.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        itemId: item._id,
        name: item.name,
        price: item.price,
        quantity: cartItem.quantity
      });
    }

    const order = new Order({
      userId: req.user._id,
      items: orderItems,
      totalAmount,
      status: 'completed'
    });

    await order.save();

    cart.status = 'ordered';
    await cart.save();

    res.status(201).send(order);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get('/orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('items.itemId');
    res.send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get('/orders/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.id, 
      userId: req.user._id 
    }).populate('items.itemId');

    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }

    res.send(order);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
