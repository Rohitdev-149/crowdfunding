import mongoose from "mongoose";



const connectDB = async () => {
  try {
   const connectionInstant =  await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
   console.log(`\n Connection Successfully !! DB Host:
    ${connectionInstant.connection.host}`);
  } catch (error) {
    console.log("Error while connecting mongoDB", error);
    process.exit(1);
  }
};


export default connectDB;