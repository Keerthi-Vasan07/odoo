const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const tripRoutes = require('./routes/trip.routes');
const activityRoutes = require('./routes/activity.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Static uploads folder
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/activities', activityRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Traveloop API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
