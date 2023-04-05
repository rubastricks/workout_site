import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/exercises/";

const ExerciseService = {
  getExerciseHistory() {
    return axios.get(API_URL);
  },
  createExercise(exercise) {
    return axios.post(API_URL, exercise);
  },
  updateExercise(exerciseId, exercise) {
    return axios.put(`${API_URL}${exerciseId}`, exercise);
  },
  deleteExercise(exerciseId) {
    return axios.delete(`${API_URL}${exerciseId}`);
  },
};

export default ExerciseService;
