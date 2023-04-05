import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import "./App.css";
import ExerciseDetail from "./pages/ExerciseDetail";
import Home from "./pages/Home";
import MainHome from "./pages/MainHome";
import Signup from "./userForms/Signup";
import Login from "./userForms/Login";
import { MainContextProvider } from "./context/MainContext";
import AuthComponent from "./services/AuthComponent";
import WorkoutTracker from "../src/components/WorkoutTracker";

const App = () => {
  return (
    <Box width="400px" sx={{ width: { xl: "1488px " } }} m="auto">
      <MainContextProvider>
        <Routes>
          <Route path="/" element={<MainHomeWrapper />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/workoutTracker" element={<WorkoutTracker />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/" element={<AuthComponent></AuthComponent>} />
        </Routes>
      </MainContextProvider>
    </Box>
  );
};
const MainHomeWrapper = () => {
  return (
    <React.Fragment>
      <MainHome />
    </React.Fragment>
  );
};

export default App;
