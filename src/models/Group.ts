import { Schema } from "mongoose";

const GroupModelSchema = new Schema({
  name: {
    type: String,
  },
  members: [{ type : Schema.Types.ObjectId, ref: "User"}],
  __v: {type: Number, select: false},
}, {timestamps: true});

export default GroupModelSchema;