import express from 'express';
import Item from '../models/Item.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/items', async (req, res) => {
  try {
    const items = await Item.find({ stock: { $gt: 0 } });
    res.send(items);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post('/items', auth, async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    res.send(item);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
