
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
import redisClient from './config/redis.js';

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Connect to Redis 
redisClient
  .connect()
  .then(() => console.log('Connected to Redis'))
  .catch((err) => console.log('Redis connection error:', err));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});