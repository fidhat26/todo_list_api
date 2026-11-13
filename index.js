
const express = require('express');
const cors = require('cors');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://sweet-cupcake-38324a.netlify.app'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'To-Do API is running',
  });
});

// Task routes
app.use('/tasks', require('./routes/taskRoutes'));

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid ID or value',
    });
  }

  res.status(500).json({
    message: 'Internal server error',
  });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is missing');
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB successfully');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Server startup failed:', error.message);
  process.exit(1);
});
