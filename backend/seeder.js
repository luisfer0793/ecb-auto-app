const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cars = require('./data/cars.js');
const Car = require('./models/carModel.js');
const connectDB = require('./config/db.js');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Car.deleteMany();

    await Car.insertMany(cars);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();