require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const missionsRouter = require('./routes/missions');
const visionRouter = require('./routes/vision');
const productsRouter = require('./routes/products');
const valuesRouter = require('./routes/values');
const articlesRouter = require('./routes/articles');
const galleryRouter = require('./routes/gallery');
const historyRouter = require('./routes/history');
const serviceRouter = require('./routes/services');
const contactRouter = require('./routes/contact');
const usersRouter = require('./routes/users');
const uploadRouter = require('./routes/upload');
const messagesRouter = require('./routes/messages');

app.use('/api/missions', missionsRouter);
app.use('/api/vision', visionRouter);
app.use('/api/products', productsRouter);
app.use('/api/values', valuesRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/history', historyRouter);
app.use('/api/services', serviceRouter);
app.use('/api/contact', contactRouter);
app.use('/api/users', usersRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/messages', messagesRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));