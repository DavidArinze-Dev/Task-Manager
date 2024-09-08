import express from "express";
import { Task } from "../models/taskModel.js";
// import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

//CREATE NEW TASK ROUTE
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.taskName ||
      !request.body.description ||
      !request.body.timeToComplete ||
      !request.body.taskStatus
    ) {
      return response.status(400).send({
        message: "Required fields are missing",
      });
    }

    const newTask = {
      taskName: request.body.taskName,
      description: request.body.description,
      timeToComplete: request.body.timeToComplete,
      taskStatus: request.body.taskStatus,
    };

    const task = await Task.create(newTask);

    return response.status(201).send(task);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//GET ALL PRODUCTS ROUTE
router.get("/", async (request, response) => {
  try {
    const task = await Task.find({});

    return response.status(200).json({
      data: task,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//GET PRODUCT ROUTE
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const task = await Task.findById(id);

    return response.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//DELETE PRODUCT ROUTE
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Task.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Task not found" });
    }

    response
      .status(200)
      .json({ message: "Task successfully deleted", deletedItem: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//UPDATE PRODUCT ROUTE
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.taskName ||
      !request.body.description ||
      !request.body.timeToComplete ||
      !request.body.taskStatus
    ) {
      return response.status(400).send({
        message: "Required fields are missing",
      });
    }

    const { id } = request.params;

    const result = await Task.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    if (!result) {
      return response.status(404).json({ message: "Task not found" });
    }

    return response.status(200).send({ message: "Task updated" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
