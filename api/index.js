import mongoose from "mongoose";
import app from './src/app.js';

const URL = `mongodb+srv://be:ob1tVZkhww6QNezB@cluster0.vkuvw61.mongodb.net/?retryWrites=true&w=majority`
const PORT = 3001; 

mongoose 
  .connect(URL)
  .then(() => {
    console.log('🟢 DB connection succesfull');
  })
  .catch((err) => {
    console.log(err);
  });

  app.listen( PORT, () => {
    console.log(`🟢 Server listening at ${PORT}`);
  })