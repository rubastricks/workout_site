const router = require("express").Router();
const userController = require("../controller/userController");
const exerciseController = require("../controller/exerciseController");
const { isAuthenticated } = require("../middleware");

// User-related endpoints
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/home", isAuthenticated, userController.findByID);

// Exercise-related endpoints
router.get(
  "/exercises",
  isAuthenticated,
  exerciseController.getExerciseHistory
);
router.post("/exercises", isAuthenticated, exerciseController.createExercise);
router.put(
  "/exercises/:exerciseId",
  isAuthenticated,
  exerciseController.updateExercise
);
router.delete(
  "/exercises/:exerciseId",
  isAuthenticated,
  exerciseController.deleteExercise
);

module.exports = router;
