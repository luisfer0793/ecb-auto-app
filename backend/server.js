const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');
const Car = require('./models/carModel.js');

dotenv.config();

connectDB()

const app = express();

app.use(bodyParser.json());

const __dir = path.resolve();

if (1 + 1) {
  app.use(express.static(path.join(__dir, '/frontend/build')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dir, 'frontend', 'build', 'index.html')));
} else {
  app.get('/', (req, res, next) => {
    res.send('Server Running');
  });
}

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS, PUT'
  );
  next();
});

app.get('/', async (req, res, next) => {
  try {
    const cars = await Car.find({});
    res.status(200).json({ cars });
  } catch (error) {
    return res.status(422).json({
      message: 'Unable to fetch data'
    });
  }
});

app.put('/:id', async (req, res, next) => {
  try {
    const {underMaintenance} = req.body;
    const car = await Car.findById(req.params.id);

    if (car) {
      car.underMaintenance = underMaintenance;
      const updatedCar = await car.save();
      res.json({ message: 'Car successfully updated', updatedCar });
    } else {
      res.status(404);
      throw new Error('Car ID not found');
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong'
    });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT);
