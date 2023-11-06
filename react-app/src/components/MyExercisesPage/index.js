import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllExercisesThunk } from "../../store/exercises";
import OpenModalButton from "../OpenModalButton";
import "./MyExercisesPage.css"
import { useHistory } from "react-router-dom";

function MyExercisesPage() {
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
            <h1>My Exercises</h1>

            <button
            className="create-exercise-button"
            onClick={() => handleCreateClick()}
            >
                Add an exercise
            </button>

            <div className="exercise-wrapper">
            {myExercises.map((exercise) => (
                <div
                    key={exercise.id}
                    className="exercise-tile"
                    // to={`/exercises/${exercise.id}`}
                >
                    <img
                        className="exercise-img"
                        src={`${exercise.image_url}`}
                        alt="exercise-cover"
                        title={`${exercise.title}`}
                     />

                     <div>
                     <h2>{`${exercise.title}`}</h2>
                     <p>{`${exercise?.description}`}</p>
                     <p>{`${exercise?.sets}`} sets x {`${exercise?.reps}`} reps</p>
                     </div>

                </div>
          ))}
        </div>

        </div>
    )

}

export default MyExercisesPage
