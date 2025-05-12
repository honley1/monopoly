require('dotenv').config();
const mongoose = require('mongoose');
const Property = require('../models/Property');

const MONGO_URI = process.env.MONGO_URI;

const properties = [
  { index: 0, name: 'GO', type: 'go' },
  { index: 1, name: 'Mediterranean Avenue', cost: 60, rent: 2, type: 'property', color: 'brown' },
  { index: 2, name: 'Community Chest', type: 'chance' },
  { index: 3, name: 'Baltic Avenue', cost: 60, rent: 4, type: 'property', color: 'brown' },
  { index: 4, name: 'Income Tax', type: 'tax', cost: 200 },
  { index: 5, name: 'Reading Railroad', cost: 200, rent: 25, type: 'property', color: 'railroad' },
  { index: 6, name: 'Oriental Avenue', cost: 100, rent: 6, type: 'property', color: 'lightblue' },
  { index: 7, name: 'Chance', type: 'chance' },
  { index: 8, name: 'Vermont Avenue', cost: 100, rent: 6, type: 'property', color: 'lightblue' },
  { index: 9, name: 'Connecticut Avenue', cost: 120, rent: 8, type: 'property', color: 'lightblue' },
  { index: 10, name: 'Jail / Just Visiting', type: 'jail' },
  { index: 11, name: 'St. Charles Place', cost: 140, rent: 10, type: 'property', color: 'pink' },
  { index: 12, name: 'Electric Company', cost: 150, rent: 10, type: 'property', color: 'utility' },
  { index: 13, name: 'States Avenue', cost: 140, rent: 10, type: 'property', color: 'pink' },
  { index: 14, name: 'Virginia Avenue', cost: 160, rent: 12, type: 'property', color: 'pink' },
  { index: 15, name: 'Pennsylvania Railroad', cost: 200, rent: 25, type: 'property', color: 'railroad' },
  { index: 16, name: 'St. James Place', cost: 180, rent: 14, type: 'property', color: 'orange' },
  { index: 17, name: 'Community Chest', type: 'chance' },
  { index: 18, name: 'Tennessee Avenue', cost: 180, rent: 14, type: 'property', color: 'orange' },
  { index: 19, name: 'New York Avenue', cost: 200, rent: 16, type: 'property', color: 'orange' },
  { index: 20, name: 'Free Parking', type: 'free' },
  { index: 21, name: 'Kentucky Avenue', cost: 220, rent: 18, type: 'property', color: 'red' },
  { index: 22, name: 'Chance', type: 'chance' },
  { index: 23, name: 'Indiana Avenue', cost: 220, rent: 18, type: 'property', color: 'red' },
  { index: 24, name: 'Illinois Avenue', cost: 240, rent: 20, type: 'property', color: 'red' },
  { index: 25, name: 'B&O Railroad', cost: 200, rent: 25, type: 'property', color: 'railroad' },
  { index: 26, name: 'Atlantic Avenue', cost: 260, rent: 22, type: 'property', color: 'yellow' },
  { index: 27, name: 'Ventnor Avenue', cost: 260, rent: 22, type: 'property', color: 'yellow' },
  { index: 28, name: 'Water Works', cost: 150, rent: 10, type: 'property', color: 'utility' },
  { index: 29, name: 'Marvin Gardens', cost: 280, rent: 24, type: 'property', color: 'yellow' },
  { index: 30, name: 'Go to Jail', type: 'go-to-jail' },
  { index: 31, name: 'Pacific Avenue', cost: 300, rent: 26, type: 'property', color: 'green' },
  { index: 32, name: 'North Carolina Avenue', cost: 300, rent: 26, type: 'property', color: 'green' },
  { index: 33, name: 'Community Chest', type: 'chance' },
  { index: 34, name: 'Pennsylvania Avenue', cost: 320, rent: 28, type: 'property', color: 'green' },
  { index: 35, name: 'Short Line', cost: 200, rent: 25, type: 'property', color: 'railroad' },
  { index: 36, name: 'Chance', type: 'chance' },
  { index: 37, name: 'Park Place', cost: 350, rent: 35, type: 'property', color: 'darkblue' },
  { index: 38, name: 'Luxury Tax', cost: 100, type: 'tax' },
  { index: 39, name: 'Boardwalk', cost: 400, rent: 50, type: 'property', color: 'darkblue' }
];

async function init() {
  try {
    await mongoose.connect(MONGO_URI);
    await Property.deleteMany();
    await Property.insertMany(properties);
    console.log('✅ Игровое поле успешно создано!');
    process.exit();
  } catch (err) {
    console.error('Ошибка при инициализации поля:', err);
    process.exit(1);
  }
}

init();
