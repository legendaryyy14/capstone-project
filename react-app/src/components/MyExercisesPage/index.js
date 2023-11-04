import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllExercisesThunk } from "../../store/exercises";
import "./MyExercisesPage.css"

function MyExercisesPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllExercisesThunk());
    }, [dispatch]);

    const userId = useSelector((state) => state.session.user.id);
    const myExercises = useSelector((state) => Object.values(state.exercises).filter(exercise => exercise.user_id === userId))
    // const exercises = Object.values(state.exercises)
    // const myExercises = exercises.filter(exercise => exercise.user_id === userId)


    return (
        <div className="exercise-page">
            <h1>My Exercises</h1>
            <div className="exercise-wrapper">
            {myExercises.map((exercise) => (
                <NavLink
                    key={exercise.id}
                    className="exercise-tile"
                    to={`/exercises/${exercise.id}`}
                >
                    <img
                        className="exercise-img"
                        src={`${exercise.image_url}`}
                        alt="exercise-cover"
                        title={`${exercise.title}`}
                     />
                     <h2>{`${exercise.title}`}</h2>
                </NavLink>
          ))}
        </div>

        </div>
    )

}

export default MyExercisesPage
