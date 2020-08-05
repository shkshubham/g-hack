import { Schema } from "mongoose";

const SubmissionModelSchema = new Schema({
  time: {
    type: Date,
    required: true,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  codeLink: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
  },
  __v: {type: Number, select: false},
}, {timestamps: true});

export default SubmissionModelSchema;