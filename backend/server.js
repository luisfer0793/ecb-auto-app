const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');
const Car = require('./models/carModel.js');

dotenv.config();

connectDB()

const app = express();

app.use(bodyParser.json());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
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

app.patch('/:id', async (req, res, next) => {
  try {
    if (!("_id" in car)) {
      return res.status(422).json({
        message: 'Invalid input, please enter valid data.'
      });
    }
    const {_id} = req.body;

    const car = await Car.findById(req.params.id, (error, car) => {
      car.underMaintenance = true;
      car.save();
    });
  

    // try {
    // } catch (error) {
    //   return res.status(500).json({
    //     message: 'Something went grong.'
    //   });
    // }
  
    res.status(200).json({ message: 'Created new product.', cars });
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to patch data'
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
