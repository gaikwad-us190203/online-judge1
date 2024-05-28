const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const problemSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  inputformat: {
    type : String,
    required:true,
    trim: true,
  },
  outputformat: {
    type : String,
    required:true,
    trim: true,
  },
  sampleinput1: {
    type : String,
    required:true,
    trim: true,
  },
  sampleoutput1: {
    type : String,
    required:true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
// Middleware to update the updatedAt field before saving
problemSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;
