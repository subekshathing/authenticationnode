import mongoose from "mongoose";
//set rule
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 65,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
});

//create table
const User = mongoose.model("User", userSchema);
export default User;
