const Player = require('../models/Player');
const Room = require('../models/Room');
const { nanoid } = require('nanoid');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    socket.on('getSocketId', () => {
        socket.emit('socketId', socket.id);
    });

    socket.on('rollDice', async ({ code }) => {
        const dice = [roll(), roll()];
        const steps = dice[0] + dice[1];

        const player = await Player.findOne({ socketId: socket.id });
        if (!player) return;

        let newPos = player.position + steps;
        if (newPos >= 40) {
            newPos -= 40;
            player.balance += 200;
        }

        player.position = newPos;
        await player.save();

        io.to(code).emit('movePlayer', {
            playerId: player._id,
            position: newPos,
            dice
        });
    });

    function roll() {
        return Math.floor(Math.random() * 6) + 1;
    }

    socket.on('createRoom', async ({ name, userId }) => {
    const code = nanoid(6).toUpperCase();

    const player = await Player.create({
        socketId: socket.id,
        userId,
        name,
        roomCode: code,
        isOnline: true
    });

    const room = await Room.create({
        code,
        players: [player._id]
    });

    socket.join(code);
    socket.emit('roomJoined', { code });

    const players = await Player.find({ roomCode: code });
    io.to(code).emit('playerList', players);
    });

    // Старт игры
    socket.on('startGame', async ({ code }) => {
    const room = await Room.findOne({ code });
    if (!room) return socket.emit('errorMessage', 'Room not found');

    room.started = true;
    await room.save();

    io.to(code).emit('gameStarted'); // все игроки переходят на /game/:code
    });

    // Подключение к существующей комнате
    socket.on('joinRoom', async ({ name, code, userId }) => {
    const room = await Room.findOne({ code });
    if (!room || room.started) {
        return socket.emit('errorMessage', 'Room not found or already started');
    }

    const player = await Player.create({
        socketId: socket.id,
        userId,
        name,
        roomCode: code,
        isOnline: true
    });

    room.players.push(player._id);
    await room.save();

    socket.join(code);
    socket.emit('roomJoined', { code });

    const players = await Player.find({ roomCode: code });
    io.to(code).emit('playerList', players);
    });

    socket.on('rejoinRoom', async ({ code }) => {
        console.log(`[rejoinRoom] Socket ${socket.id} rejoined room ${code}`);
        const players = await Player.find({ roomCode: code });
        socket.join(code); // на всякий случай
        io.to(code).emit('playerList', players);
    });

    socket.on('disconnect', async () => {
    const player = await Player.findOne({ socketId: socket.id });
    if (!player) return;

    await Player.updateOne(
        { socketId: socket.id },
        { $set: { isOnline: false } }
    );

    const players = await Player.find({ roomCode: player.roomCode });
    io.to(player.roomCode).emit('playerList', players);
    });

    socket.on('rejoinRoom', async ({ code, userId }) => {
    await Player.updateOne(
        { userId, roomCode: code },
        { $set: { socketId: socket.id, isOnline: true } }
    );

    const players = await Player.find({ roomCode: code });
    socket.join(code);
    io.to(code).emit('playerList', players);
    });
  });
};
