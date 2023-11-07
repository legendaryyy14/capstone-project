import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getWorkoutByIdThunk } from "../../store/workouts";
import { getAllExercisesThunk } from "../../store/exercises";
import { getUsersThunk } from "../../store/users";
import "./OneWorkoutPage.css"

function OneWorkoutPage() {
    const dispatch = useDispatch();
    const { workoutId } = useParams();
    const userId = useSelector((state) => state.session.user.id);
    const workout = useSelector((state) => state.workouts[workoutId])
    const exercises = useSelector((state) => Object.values(state.exercises).filter(exercise => exercise.workout_id === workout.id))
    const owner = useSelector((state) => state?.users?.users?.filter(user => user.id === workout.user_id)[0])


    useEffect(() => {
        dispatch(getWorkoutByIdThunk(workoutId))
        dispatch(getAllExercisesThunk())
        dispatch(getUsersThunk())
    }, [dispatch, workoutId])

    return (
        <div>
            <div className="one-workout-title">
            <h1>{`${workout?.title}`} by {`${owner?.username}`}</h1>
            {/* <img
                className="workout-img"
                src={`${workout?.image_url}`}
                alt="workout-cover"
                title={`${workout?.title}`}
              /> */}
            <p>{`${workout?.description}`}</p>
            </div>

            <h2>Exercises</h2>
            {exercises.length === 0 ? (
        <p>No exercises available for this workout.</p>
      ) : (
        <div>
          {exercises.map((exercise) => (
            <div key={exercise?.id} className="exercise-tile">
              <h3>{`${exercise?.title}`}</h3>
              <img
                className="small-exercise-img"
                src={`${exercise?.image_url}`}
                alt="exercise-cover"
                title={`${exercise?.title}`}
              />
              <div>
                <p>{`${exercise?.sets}`} sets x {`${exercise?.reps}`} reps</p>
                <p>{`${exercise?.description}`}</p>
              </div>
            </div>
          ))}
        </div>
      )}
        </div>
    )
}

export default OneWorkoutPage;
