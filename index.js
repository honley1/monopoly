require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'http://localhost';

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('Mongo error:', err)
    });

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressLayouts);
app.set('layout', 'layout');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));


app.listen(PORT, () => {
  console.log(`Server running at ${URL}:${PORT}`);
});
