// 1. Load environment variables (make sure this is first)
require('dotenv').config();

const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
// … any other requires (your routes, etc.) …

const app = express();
app.use(cors());
app.use(express.json());
// … your route registrations here …

// 2. DEBUG: print out what URI is actually being used
console.log('>> MONGO_URI =', process.env.MONGO_URI);

// 3. Connect using the environment variable, not a hard-coded string
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// 4. Start your server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
