// 1. Load environment variables (make sure this is first)
require('dotenv').config();

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
// … any other requires (e.g. your routers) …

// 2. Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// … your route registrations here …
app.get('/', (req, res) => {
  res.send('API is working');
});

// 3. DEBUG: Print out what URI is actually being used
console.log('>> MONGO_URI =', process.env.MONGO_URI);

// 4. Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// 5. Start your server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
