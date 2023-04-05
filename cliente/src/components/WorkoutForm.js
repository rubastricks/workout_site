import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExerciseService from "../services/ExerciseService";
function WorkoutForm({
  onSaveWorkout,
  fetchWorkoutHistory,
  saveWorkout,
  isPastDateSelected,
  selectedDate,
}) {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [exercises, setExercises] = useState(() => {
    const savedExercises = localStorage.getItem("exercises");
    return savedExercises ? JSON.parse(savedExercises) : [];
  });

  const [editIndex, setEditIndex] = useState(null);

  const MAX_EXERCISES = 5;

  const isMaxExercisesReached = () => {
    return (
      exercises.filter((exercise) => exercise.date === selectedDate).length >=
      MAX_EXERCISES
    );
  };

  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exercises]);

  const handleChange = (event) => {
    setCategory(event.target.value);
    setValue("");
    setError("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleValueChange = (event) => {
    const newValue = event.target.value;
    if (newValue === "" || !isNaN(newValue)) {
      setValue(newValue);
      setError("");
    } else {
      setError("Please enter a valid number");
    }
  };

  const handleBlur = () => {
    if (value === "") {
      setError("Please enter a number");
    } else if (category === "Cardio" && (value < 0 || value > 100)) {
      setError("Please enter a distance between 0 and 100 km");
    } else if (category === "Strength" && (value < 0 || value > 500)) {
      setError("Please enter a weight between 0 and 500 lb");
    } else {
      setError("");
    }
  };
  console.log("Selected date:", selectedDate);

  const addExercise = async () => {
    if (category && exerciseName && value && !error) {
      const newExercise = {
        date: selectedDate, // Use the selectedDate prop
        category,
        exerciseName,
        value: parseInt(value),
      };

      if (editIndex !== null) {
        // Update the exercise if editIndex is not null
        const updatedExercises = [...exercises];
        updatedExercises[editIndex] = newExercise;
        setExercises(updatedExercises);
      } else {
        setExercises([...exercises, newExercise]);
      }
      setCategory("");
      setExerciseName("");
      setValue("");
      setError("");
      setOpen(false);
      setEditIndex(null);

      // Save the workout to the server
      await saveWorkoutToServer(newExercise);
      await fetchWorkoutHistory();
    }
  };

  // Delete and Update
  const deleteExercise = (index) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
    localStorage.setItem("exercises", JSON.stringify(newExercises));
  };

  const editExercise = (index) => {
    setEditIndex(index);
    setCategory(exercises[index].category);
    setExerciseName(exercises[index].exerciseName);
    setValue(exercises[index].value);
    setOpen(true);
  };

  const handleExerciseNameChange = (event) => {
    setExerciseName(event.target.value);
  };

  const saveWorkoutToServer = async (workoutData) => {
    try {
      const response = await ExerciseService.post("/workouts", workoutData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Is past date selected:", isPastDateSelected);

  return (
    <Stack sx={{ display: "flex", alignItems: "center" }}>
      <div>
        <Button
          onClick={handleClickOpen}
          sx={{ position: "relative", top: 20 }}
          disabled={isMaxExercisesReached() || isPastDateSelected}
        >
          <Typography> Enter Your Workout</Typography>
          <IconButton
            aria-label="add"
            onClick={() => console.log("Add clicked")}
          >
            <AddIcon />
          </IconButton>
        </Button>

        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>
            {" "}
            {editIndex !== null
              ? "Edit your workout"
              : "What are you working out today?"}
          </DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ m: 8 }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="demo-dialog-native">Categories</InputLabel>
                <Select
                  native
                  value={category}
                  onChange={handleChange}
                  input={
                    <OutlinedInput label="Categories" id="demo-dialog-native" />
                  }
                >
                  <option aria-label="None" value="" />
                  <option value="Cardio">Cardio</option>
                  <option value="Strength">Strength</option>
                  <option value="Stretch">Stretch</option>
                </Select>

                {category === "Cardio" && (
                  <TextField
                    label="Distance (km)"
                    sx={{ m: 1, width: "25ch" }}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleBlur}
                    inputProps={{ type: "number" }}
                    error={error !== ""}
                    helperText={error}
                  />
                )}

                {category === "Strength" && (
                  <TextField
                    label="Weight (lb)"
                    sx={{ m: 1, width: "25ch" }}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleBlur}
                    inputProps={{ type: "number" }}
                    error={error !== ""}
                    helperText={error}
                  />
                )}
                {category === "Stretch" && (
                  <TextField
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleBlur}
                    inputProps={{ type: "number" }}
                    error={error !== ""}
                    helperText={error}
                    label="Time"
                    sx={{ m: 1, width: "25ch" }}
                  />
                )}
                <TextField
                  label="Exercise Name"
                  value={exerciseName}
                  onChange={handleExerciseNameChange}
                  sx={{
                    m: 1,
                    width: 400,
                  }}
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addExercise}>
              {editIndex !== null ? "Update" : "Ok"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            mt: -4,
            ml: 3,
            width: 368,
            height: 328,
          },
        }}
      >
        <Paper sx={{ mr: 4 }}>
          <Box sx={{ position: "relative", top: 80, left: 30, color: "black" }}>
            <ul>
              {exercises
                .filter((exercise) => exercise.date === selectedDate) // Filter exercises by selected date
                .map((exercise, index) => (
                  <li key={index}>
                    {exercise.category} - {exercise.exerciseName} -{" "}
                    {exercise.value}
                    <IconButton
                      aria-label="edit"
                      onClick={() => editExercise(index)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteExercise(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </li>
                ))}
            </ul>
          </Box>
        </Paper>
      </Box>
    </Stack>
  );
}

export default WorkoutForm;
