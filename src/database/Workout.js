const e = require('express');
const DB = require('./db.json');
const { saveToDatabase } = require('./utils');

const getAllWorkouts = () => {
    try {
        return DB.workouts;
    } catch (error) {
        throw {
            status: 500,
            message: error?.message || error,
        }
    }
}

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = DB.workouts.findIndex(
        (workout) => workout.name === newWorkout.name
    ) > -1;
    if (isAlreadyAdded) {
        throw {
            status: 400,
            message: "Workout already exists",
        };
    }
    try {
        DB.workouts.push(newWorkout);
        saveToDatabase(DB);
        return newWorkout;
    } catch (error) {
        throw {
            status: 500,
            message: error?.message || error,
        }
    }
}

const getOneWorkout = (workoutId) => {
    try {
        const workout = DB.workouts.find((workout) => workout.id === workoutId);
        if (!workout) {
            throw {
                status: 404,
                message: "Workout not found",
            };
        }
        return workout;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error,
        }
    }
}

const updateOneWorkout = (workoutId, changes) => {
    try {
        const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === workoutId);
        if (indexForUpdate === -1) {
            throw {
                status: 404,
                message: "Workout not found",
            };
        }
        const updatedWorkout = {
            ...DB.workouts[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        };
        DB.workouts[indexForUpdate] = updatedWorkout;
        saveToDatabase(DB);
        return updatedWorkout;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error,
        }
    }
}


const deleteOneWorkout = (workoutId) => {
    try {
        const indexForDeletion = DB.workouts.findIndex((workout) => workout.id === workoutId);
        if (indexForDeletion === -1) {
            throw {
                status: 404,
                message: "Workout not found",
            };
        }
        DB.workouts.splice(indexForDeletion, 1);
        saveToDatabase(DB);
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || error,
        }
    }
}


module.exports = {
    getAllWorkouts,
    createNewWorkout,
    getOneWorkout,
    updateOneWorkout,
    deleteOneWorkout
}