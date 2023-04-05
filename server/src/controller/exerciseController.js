const Exercise = require("../models/Exercise");

module.exports = {
  createExercise: async (req, res) => {
    try {
      const { type, duration, date } = req.body;
      const newExercise = new Exercise({
        username: req.params.username,
        type,
        duration,
        date,
      });
      const savedExercise = await newExercise.save();
      res.status(201).json(savedExercise);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getExerciseHistory: async (req, res) => {
    try {
      const exerciseHistory = await Exercise.find({
        username: req.params.username,
      });
      res.json(exerciseHistory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  updateExercise: async (req, res) => {
    try {
      const updatedExercise = await Exercise.findOneAndUpdate(
        { _id: req.params.exerciseId, username: req.params.username },
        req.body,
        { new: true }
      );
      if (!updatedExercise) {
        throw new Error("Exercise not found");
      }
      res.json(updatedExercise);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  deleteExercise: async (req, res) => {
    try {
      const deletedExercise = await Exercise.findOneAndDelete({
        _id: req.params.exerciseId,
        username: req.params.username,
      });
      if (!deletedExercise) {
        throw new Error("Exercise not found");
      }
      res.json({ message: "Exercise deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
