const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`mongodb+srv://luisfer0793:starcraft69@ferjimenez.ti2qx.mongodb.net/ecb-auto-app?retryWrites=true&w=majority`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log(`Mongo Connected: ${connection.connection.host}`);
  } catch (error) {
      console.log(`Error ${error.message}`);
      process.exit(1);
  }
};

module.exports = connectDB;