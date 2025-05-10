const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/lostandfound'; // Change if needed
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Mongoose schema and model
const itemSchema = new mongoose.Schema({
  referenceId: String,
  type: String,
  category: String,
  description: String,
  location: String,
  reportedBy: String,
  status: String,
});

const Item = mongoose.model('Item', itemSchema);

// Helper to generate unique referenceId
const generateReferenceId = () => {
  return Math.random().toString(36).substr(2, 9).toUpperCase();
};

// Routes

// Report lost item
app.post('/api/items/lost', async (req, res) => {
  try {
    const itemData = req.body;
    itemData.type = 'lost';
    itemData.status = 'reported';
    itemData.referenceId = generateReferenceId();
    const item = new Item(itemData);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error reporting lost item' });
  }
});

// Report found item
app.post('/api/items/found', async (req, res) => {
  try {
    const itemData = req.body;
    itemData.type = 'found';
    itemData.status = 'reported';
    itemData.referenceId = generateReferenceId();
    const item = new Item(itemData);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error reporting found item' });
  }
});

// Search items by type and optional category
app.get('/api/items/search', async (req, res) => {
  try {
    const { type, category } = req.query;
    const query = { type };
    if (category) {
      query.category = category;
    }
    const items = await Item.find(query);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error searching items' });
  }
});

// Update item status
app.put('/api/items/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const item = await Item.findByIdAndUpdate(id, { status }, { new: true });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error updating item status' });
  }
});

// Admin: get all items
app.get('/api/admin/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching all items' });
  }
});

// Admin: update item status
app.put('/api/admin/items/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    const item = await Item.findByIdAndUpdate(id, { status }, { new: true });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Error updating item status' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
