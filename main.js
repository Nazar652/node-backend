const express = require("express");

const workoutRouter = require("./src/routes/workoutRouter");

const app = express();
const PORT = 3000;

app.use("/api/workouts", workoutRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
})
