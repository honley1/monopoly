const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const Property = require('../models/Property');
const Player = require('../models/Player');

router.get('/room/:code', async (req, res) => {
  const code = req.params.code;

  const room = await Room.findOne({ code });
  if (!room) return res.redirect('/');

  res.render('room', { code });
});

router.get('/game/:code', async (req, res) => {
  const code = req.params.code;

  const room = await Room.findOne({ code });
  if (!room || !room.started) return res.redirect('/');

  const players = await Player.find({ roomCode: code });
  const board = await Property.find().sort({ index: 1 });

  res.render('game', {
    code,
    players,
    board
  });
});

module.exports = router;
