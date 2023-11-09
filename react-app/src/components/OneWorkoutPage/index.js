import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getWorkoutByIdThunk } from "../../store/workouts";
import { getAllExercisesThunk } from "../../store/exercises";
import { getUsersThunk } from "../../store/users";
import OpenModalButton from "../OpenModalButton";
import DeleteWorkoutModal from "../DeleteWorkoutModal";
import { useHistory } from "react-router-dom";
import DeleteExerciseModal from "../DeleteExerciseModal";

import "./OneWorkoutPage.css"

function OneWorkoutPage() {
    const dispatch = useDispatch();
    const history = useHistory();
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

    const handleCreateExerciseClick = () => {
      history.push(`/exercises/create`);
  };
    const handleWorkoutUpdateClick = (workoutId) => {
      history.push(`/workouts/${workoutId}/update`);
    };

    const handleExerciseUpdateClick = (exerciseId) => {
      history.push(`/exercises/${exerciseId}/update`);
    };

    return (
        <div>
            <div className="one-workout-title">
            <h1>{`${workout?.title}`} by {`${owner?.username}`}</h1>

            <p>{`${workout?.description}`}</p>
            </div>

            {workout?.user_id === userId && (
              <div className="one-workout-buttons">
              <button className="update-btn" onClick={() => handleWorkoutUpdateClick(workout.id)}>
              Update
              </button>

              <OpenModalButton
                className="delete-button"
                buttonText="Delete"
                modalComponent={<DeleteWorkoutModal workoutId={workout?.id} />}
              />
              </div>
            )}

            <h2>Exercises</h2>
            {exercises.length === 0 ? (
              <div>
        <p>No exercises available for this workout.</p>

        {workout?.user_id === userId && (
          <div className="one-workout-buttons">
            <button
            className="create-exercise-button"
            onClick={() => handleCreateExerciseClick()}
            >
                Create an exercise
            </button>
          </div>
        )}
        </div>
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

              <div className="exercise-buttons">
              {exercise.user_id === userId && (
              <div className="one-exercise-buttons">
                     <button className="update-btn" onClick={() => handleExerciseUpdateClick(exercise?.id)}>
                        Update
                    </button>

                    <OpenModalButton
                        className="delete-button"
                        buttonText="Delete"
                        modalComponent={<DeleteExerciseModal exerciseId={exercise?.id}/>}
                    />
              </div>
            )}

              </div>

            </div>
          ))}
        </div>
      )}
        </div>
    )
}

export default OneWorkoutPage;
