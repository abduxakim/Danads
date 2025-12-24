import express from 'express';
import noteRoutes from './routes/noteRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/notes', noteRoutes);


app.get('/status', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
