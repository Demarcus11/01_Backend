import mongoose from "mongoose";

// Schema for each document in the Task collection
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a name"],
    trim: true, // if the user enters something such as " name ", it will trim the white space to just 'name'
    maxlength: [20, "Name cannot be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Initialize a document: Name of document and Schema for the document
export const model = mongoose.model("Task", TaskSchema);
