import { Schema } from "mongoose";

const UserModelSchema = new Schema({
  name: {
    type: String,
    default: null,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  __v: {type: Number, select: false},
}, {timestamps: true});

export default UserModelSchema;