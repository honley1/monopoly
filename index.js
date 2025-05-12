require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const router = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'http://localhost';

const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('./sockets/gameSocket')(io);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('Mongo error:', err)
    });

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressLayouts);
app.set('layout', './partials/layout');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use('/', router);

server.listen(PORT, () => {
  console.log(`Server running at ${URL}:${PORT}`);
});
