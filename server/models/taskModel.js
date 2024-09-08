import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  taskName: { type: String, required: true },
  description: { type: String, required: true },
  timeToComplete: { type: String, required: true },
  taskStatus: {
    type: String,
    required: true,
    enum: ["todo", "ongoing", "completed"],
  },
});

export const Task = mongoose.model("Task", taskSchema);
