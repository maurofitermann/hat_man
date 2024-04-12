const mongoose = require('mongoose')
module.exports = async (client) =>{
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
      });  
    mongoose.connection.on('error', (err) => {
        console.error(`MongoDB connection error: ${err}`);
      });
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
      }); 
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log(`Connected to MongoDB`);
    } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    }
}