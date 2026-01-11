const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const Product = require('../models/Product');
const Toy = require('../models/Toy');
const User = require('../models/User');
const Post = require('../models/Post');
const authRoutes = require('../routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
// Since this file is in /server, ../public resolves to /public correctly
app.use(express.static(path.join(__dirname, '../public')));

// Serve the 'image' folder if it was created in the project root
app.use('/image', express.static(path.join(__dirname, '../image')));

// Auth Routes
app.use('/api/auth', authRoutes);

// API Routes
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.get('/api/toys', async (req, res) => {
    const toys = await Toy.find();
    res.json(toys);
});

// Test Route for Users/Posts
app.get('/api/stats', async (req, res) => {
    const userCount = await User.countDocuments();
    const postCount = await Post.countDocuments();
    res.json({ message: 'System Operational', userCount, postCount });
});

// Database Connection (Optional for now if using mock data)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/minihug';
mongoose.connect(MONGO_URI)
  .then(async () => {
      console.log(`MongoDB Connected. Connect Compass to: ${MONGO_URI}`);
      
      // Reset and Seed Database (Ensures you have all new items)
      await Product.deleteMany({});
      await Toy.deleteMany({});

      await Product.insertMany([
          { name: 'Baby Bottle', description: 'Anti-colic 250ml', price: 12.99, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Cotton Diapers', description: 'Pack of 12 reusable', price: 24.99, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Baby Wipes', description: 'Sensitive skin safe', price: 5.99, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Pacifier Set', description: 'Orthodontic, 2-pack', price: 8.50, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Baby Monitor', description: 'Video and Audio', price: 89.99, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Stroller', description: 'Lightweight foldable', price: 150.00, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Crib Sheets', description: '100% Organic Cotton', price: 18.00, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Baby Carrier', description: 'Ergonomic front/back', price: 45.00, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'High Chair', description: 'Adjustable height', price: 75.00, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Bibs Pack', description: 'Waterproof, 5-pack', price: 10.99, image: 'PASTE_YOUR_IMAGE_LINK_HERE' }
      ]);
      console.log('Seeded Products');

      await Toy.insertMany([
          { name: 'Soft Rattle', description: 'Plush animal rattle', price: 8.99, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Stacking Rings', description: 'Colorful development toy', price: 15.99, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Plush Bear', description: 'Soft cuddly friend', price: 19.99, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Building Blocks', description: 'Soft foam blocks', price: 22.50, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Musical Mobile', description: 'For crib attachment', price: 35.00, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Teether Key', description: 'Cooling gel filled', price: 6.99, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Bath Ducks', description: 'Rubber ducks 3-pack', price: 5.00, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Shape Sorter', description: 'Wooden educational box', price: 28.00, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Xylophone', description: 'Musical instrument', price: 14.99, image: 'PASTE_YOUR_IMAGE_LINK_HERE' },
          { name: 'Activity Mat', description: 'Gym with hanging toys', price: 49.99, image: 'PASTE_YOUR_IMAGE_LINK_HERE' }
      ]);
      console.log('Seeded Toys');
  })
  .catch(err => console.log('MongoDB Connection Error:', err));

// Fallback route to serve index.html for any unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});