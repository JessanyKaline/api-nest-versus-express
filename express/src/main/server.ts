import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import orderRoutes from '../infrastructure/http/express/routes/orderRoutes';
import productRoutes from '../infrastructure/http/express/routes/productRoutes';
import { OrderController } from '../application/interfaces/controllers/OrderController';
import { MongoOrderRepository } from '../infrastructure/database/mongodb/repositories/MongoOrderRepository';
import { MongoProductRepository } from '../infrastructure/database/mongodb/repositories/MongoProductRepository';
import { ProductController } from '../application/interfaces/controllers/ProductController';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://admin:password123@localhost:27017/orders?authSource=admin');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Repositories
const orderRepository = new MongoOrderRepository();
const productRepository = new MongoProductRepository();

// Controllers
const orderController = new OrderController(orderRepository, productRepository);
const productController = new ProductController(productRepository);

// Routes
app.use('/api', orderRoutes(orderController));
app.use('/api', productRoutes(productController));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});