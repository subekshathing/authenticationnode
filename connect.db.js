import mongoose from "mongoose";
const userName = "subeksha";
const password = encodeURIComponent("123");
const databaseName = "authentication";

const dbURL = `mongodb+srv://${userName}:${password}@cluster0.3owaedv.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("db connection established");
  } catch (error) {
    console.log(error.message);
    console.log("db connection failed");
  }
};
export default connectDB;
