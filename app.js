
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan'; // Import Morgan for logging
import faqRoutes from './routes/faqRoutes.js';
import errorHandler from './utils/errorHandlers.js';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Morgan logging middleware (Logs all HTTP requests)
app.use(morgan('dev')); // 'dev' is a standard log format that includes status, method, URL, etc.

// Routes
app.use('/api/faqs', faqRoutes);

// Error handling
app.use(errorHandler);

export default app;