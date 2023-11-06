import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllExercisesThunk } from "../../store/exercises";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom";

function UpdateWorkoutForm() {
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        dispatch(getAllExercisesThunk());
    }, [dispatch]);

    const userId = useSelector((state) => state.session.user.id);
    const myExercises = useSelector((state) => Object.values(state.exercises).filter(exercise => exercise.user_id === userId))
    // const exercises = Object.values(state.exercises)
    // const myExercises = exercises.filter(exercise => exercise.user_id === userId)
    const handleCreateClick = (albumId) => {
        history.push(`/exercises/create`);
      };

    return (
        <div className="exercise-page">
            <h1>Update a Workout</h1>


        </div>
    )

}

export default UpdateWorkoutForm
