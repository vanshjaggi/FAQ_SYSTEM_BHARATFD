
import redisClient from '../config/redis.js';

const getCache = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Error fetching from cache:', err);
    return null;
  }
};

const setCache = async (key, value, expiry = 3600) => {
  try {
    await redisClient.setEx(key, expiry, JSON.stringify(value));
  } catch (err) {
    console.error('Error setting cache:', err);
  }
};

export { getCache, setCache };