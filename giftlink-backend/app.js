/*jshint esversion: 8 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pinoLogger = require('./logger');

const connectToDatabase = require('./models/db');
const {loadData} = require("./util/import-mongo/index");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3060;

// Connect to MongoDB
connectToDatabase()
    .then(() => {
        pinoLogger.info('Connected to DB');
    })
    .catch((e) => console.error('Failed to connect to DB', e));

// Route files
const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

const pinoHttp = require('pino-http');
const logger = require('./logger');

// Apply pino-http logging middleware
app.use(pinoHttp({ logger }));

// Use Routes
app.use('/api/gifts', giftRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    pinoLogger.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.get("/", (req, res) => {
    res.send("Inside the server");
});

app.listen(port, () => {
    pinoLogger.info(`Server running on port ${port}`);
});
