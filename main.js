const express = require("express");
const bodyParser = require("body-parser");

const workoutRouter = require("./src/routes/workoutRouter");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api/workouts", workoutRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
})
