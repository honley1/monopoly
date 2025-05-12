const express = require('express');
const router = express.Router();

const mainRouter = require('./mainRouter');
const gameRouter = require('./gameRouter');

router.use('/', mainRouter);
router.use('/', gameRouter);

module.exports = router;