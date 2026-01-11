const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import Models
const Product = require('./models/Product');
const Toy = require('./models/Toy');
const User = require('./models/User');
const Post = require('./models/Post');

// Import Routes
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/image', express.static(path.join(__dirname, 'image')));

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

app.get('/api/stats', async (req, res) => {
    const userCount = await User.countDocuments();
    const postCount = await Post.countDocuments();
    res.json({ message: 'System Operational', userCount, postCount });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/minihug')
  .then(async () => {
      console.log('MongoDB Connected');
      
      // Seed Data
      await Product.deleteMany({});
      await Toy.deleteMany({});

      await Product.insertMany([
          { name: 'Baby Bottle', description: 'Our premium Anti-colic Baby Bottle is designed to reduce colic, gas, and reflux. It features a soft, breast-like nipple for easy latch-on. The ergonomic shape makes it comfortable for parents to hold. Made from BPA-free materials for your baby\'s safety. Easy to clean and assemble for daily use.', price: 12.99, image: 'https://tse2.mm.bing.net/th?q=baby+bottle&w=300&h=300&c=7' },
          { name: 'Cotton Diapers', description: 'Soft and breathable 100% cotton reusable diapers, perfect for your baby\'s delicate skin. This pack of 12 ensures you always have a fresh one handy. Eco-friendly and machine washable for long-lasting use. Highly absorbent fabric keeps your baby dry and comfortable. A sustainable choice for modern parenting.', price: 24.99, image: 'https://tse2.mm.bing.net/th?q=baby+diapers&w=300&h=300&c=7' },
          { name: 'Baby Wipes', description: 'Gentle and hypoallergenic baby wipes designed specifically for sensitive skin. Enriched with aloe vera and vitamin E to soothe and protect. Free from alcohol, parabens, and fragrances to prevent irritation. Strong yet soft texture for effective cleaning during diaper changes. Dermatologist tested and safe for daily use.', price: 5.99, image: 'https://tse2.mm.bing.net/th?q=baby+wipes&w=300&h=300&c=7' },
          { name: 'Pacifier Set', description: 'Orthodontic pacifier set designed to support natural oral development. The symmetrical nipple respects the natural development of baby\'s palate, teeth, and gums. Includes two pacifiers with a sterilizing travel case. Made from medical-grade silicone that is taste and odor-free. Features a glow-in-the-dark handle for easy finding at night.', price: 8.50, image: 'https://tse2.mm.bing.net/th?q=baby+pacifier&w=300&h=300&c=7' },
          { name: 'Baby Monitor', description: 'High-definition video baby monitor with crystal clear audio and night vision. Features two-way talk back to soothe your baby from another room. Monitors room temperature to ensure a comfortable environment. Long-range transmission keeps you connected throughout your home. Includes lullabies to help your little one drift off to sleep.', price: 89.99, image: 'https://tse2.mm.bing.net/th?q=baby+monitor&w=300&h=300&c=7' },
          { name: 'Stroller', description: 'Ultra-lightweight stroller designed for families on the go. One-hand fold mechanism makes it easy to store and transport. Features a reclining seat and adjustable canopy for baby\'s comfort. Durable wheels provide a smooth ride on various terrains. Includes a spacious storage basket for all your essentials.', price: 150.00, image: 'https://tse2.mm.bing.net/th?q=baby+stroller&w=300&h=300&c=7' },
          { name: 'Crib Sheets', description: 'Luxuriously soft crib sheets made from 100% organic cotton. Breathable fabric ensures a comfortable sleep temperature year-round. Fitted design with elastic all around for a safe and snug fit. Machine washable and gets softer with every wash. Available in neutral colors to match any nursery decor.', price: 18.00, image: 'https://tse2.mm.bing.net/th?q=crib+sheets&w=300&h=300&c=7' },
          { name: 'Baby Carrier', description: 'Ergonomic baby carrier offering multiple carrying positions: front, back, and hip. Designed to distribute weight evenly for parent\'s comfort. Supports baby in a natural M-shape position for healthy hip development. Breathable mesh fabric keeps both parent and baby cool. Adjustable straps fit a wide range of body types.', price: 45.00, image: 'https://tse2.mm.bing.net/th?q=baby+carrier&w=300&h=300&c=7' },
          { name: 'High Chair', description: 'Modern high chair with adjustable height settings to grow with your child. Features a removable, dishwasher-safe tray for easy cleanup. The 5-point harness ensures your baby stays safe and secure during meals. Comfortable padded seat with wipe-clean fabric. Compact fold for easy storage when not in use.', price: 75.00, image: 'https://tse2.mm.bing.net/th?q=baby+high+chair&w=300&h=300&c=7' },
          { name: 'Bibs Pack', description: 'Pack of 5 colorful and waterproof bibs to keep mealtime messes at bay. Features a convenient crumb catcher pocket to catch spills. Adjustable neck closure ensures a comfortable fit as your baby grows. Made from lightweight, easy-to-wipe material. Perfect for feeding time or messy play activities.', price: 10.99, image: 'https://tse2.mm.bing.net/th?q=baby+bibs&w=300&h=300&c=7' }
      ]);

      await Toy.insertMany([
          { name: 'Soft Rattle', description: 'Adorable plush animal rattle that is soft to the touch and easy to grip. Gentle rattling sound stimulates baby\'s auditory senses without being too loud. Made with baby-safe embroidered details and no small parts. Perfect for developing hand-eye coordination and motor skills. Machine washable for easy hygiene.', price: 8.99, image: 'https://tse2.mm.bing.net/th?q=baby+rattle+toy&w=300&h=300&c=7' },
          { name: 'Stacking Rings', description: 'Classic stacking rings toy featuring five colorful rings of different sizes. Helps develop fine motor skills and problem-solving abilities. The rocking base adds an extra element of fun and challenge. Bright colors and different textures engage baby\'s visual and tactile senses. Made from durable, BPA-free plastic.', price: 15.99, image: 'https://tse2.mm.bing.net/th?q=stacking+rings+toy&w=300&h=300&c=7' },
          { name: 'Plush Bear', description: 'Ultra-soft plush bear destined to become your child\'s favorite companion. Crafted with premium materials for maximum huggability. Features a friendly face and comforting texture for bedtime snuggles. Durable construction stands up to years of love and play. The perfect gift for baby showers or birthdays.', price: 19.99, image: 'https://tse2.mm.bing.net/th?q=teddy+bear&w=300&h=300&c=7' },
          { name: 'Building Blocks', description: 'Set of soft foam building blocks safe for toddlers to stack and knock down. Promotes creativity, spatial awareness, and motor skill development. Quiet play alternative to wooden blocks, perfect for indoor use. Includes various shapes and colors for endless building possibilities. Easy to clean and comes with a storage bag.', price: 22.50, image: 'https://tse2.mm.bing.net/th?q=baby+building+blocks&w=300&h=300&c=7' },
          { name: 'Musical Mobile', description: 'Enchanting musical mobile that attaches easily to most cribs. Rotates slowly while playing soothing lullabies to help baby sleep. Features cute hanging characters that encourage visual tracking. Adjustable volume control and auto-shutoff timer included. Creates a calming atmosphere for your little one\'s nursery.', price: 35.00, image: 'https://tse2.mm.bing.net/th?q=baby+crib+mobile&w=300&h=300&c=7' },
          { name: 'Teether Key', description: 'Soothing teether keys filled with cooling gel to relieve sore gums. Can be refrigerated for extra relief during teething. Textured surfaces massage gums and assist in the eruption of new teeth. Easy-to-hold ring shape designed for small hands. Made from non-toxic, BPA-free materials.', price: 6.99, image: 'https://tse2.mm.bing.net/th?q=baby+teether+keys&w=300&h=300&c=7' },
          { name: 'Bath Ducks', description: 'Pack of 3 classic rubber ducks to make bath time fun and engaging. Sealed design prevents mold and bacteria growth inside. Bright colors and cute designs capture baby\'s attention. Floats upright in water for endless splashing fun. Safe, non-toxic material suitable for babies and toddlers.', price: 5.00, image: 'https://tse2.mm.bing.net/th?q=rubber+duck+toy&w=300&h=300&c=7' },
          { name: 'Shape Sorter', description: 'Wooden shape sorter box designed to teach shapes and colors. Includes various wooden blocks that fit into corresponding holes. Enhances problem-solving skills and hand-eye coordination. Smooth edges and non-toxic paint ensure safety during play. Sturdy construction for long-lasting educational fun.', price: 28.00, image: 'https://tse2.mm.bing.net/th?q=shape+sorter+toy&w=300&h=300&c=7' },
          { name: 'Xylophone', description: 'Colorful xylophone toy that introduces children to the joy of music. Features eight metal keys that produce clear and pleasant tones. Includes a child-safe mallet attached with a cord so it never gets lost. Helps develop rhythm, color recognition, and fine motor skills. Sturdy base designed to withstand enthusiastic playing.', price: 14.99, image: 'https://tse2.mm.bing.net/th?q=baby+xylophone&w=300&h=300&c=7' },
          { name: 'Activity Mat', description: 'Interactive activity mat featuring a soft play area and overhead arches. Includes detachable hanging toys that rattle, squeak, and crinkle. Promotes tummy time and overhead reaching for muscle development. Bright patterns and textures stimulate visual and tactile senses. Folds up easily for storage or travel.', price: 49.99, image: 'https://tse2.mm.bing.net/th?q=baby+activity+mat&w=300&h=300&c=7' }
      ]);
      console.log('Database Seeded');
  })
  .catch(err => console.log('MongoDB Connection Error:', err));

// Fallback route to serve index.html for any unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});