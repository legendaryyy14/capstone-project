import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllExercisesThunk } from "../../store/exercises";
import { getAllWorkoutsThunk } from "../../store/workouts";
import "./MyExercisesPage.css"
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteExerciseModal from "../DeleteExerciseModal";


function MyExercisesPage() {
    const dispatch = useDispatch();
    const history = useHistory()
    const userId = useSelector((state) => state.session.user.id);
    const myWorkouts = useSelector((state) => Object.values(state.workouts).filter(workout => workout?.user_id === userId));
    const myExercises = useSelector((state) => Object.values(state.exercises).filter(exercise => exercise?.user_id === userId))
    const [searchQuery, setSearchQuery] = useState("");
    const filteredExercises = myExercises.filter((exercise) =>
      exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
    );


    useEffect(() => {
        dispatch(getAllExercisesThunk());
        dispatch(getAllWorkoutsThunk());
    }, [dispatch]);
    // const exercises = Object.values(state.exercises)
    // const myExercises = exercises.filter(exercise => exercise.user_id === userId)
    const handleCreateClick = () => {
        history.push(`/exercises/create`);
    };

    const handleUpdateClick = (exerciseId) => {
        history.push(`/exercises/${exerciseId}/update`);
    };

    const getWorkoutTitle = (exerciseWorkoutId) => {
        const workout = myWorkouts?.find(workout => workout?.id === exerciseWorkoutId);

        if (workout) {
          return (
            <NavLink className='workout-nav-link' to={`/workouts/${workout?.id}`}>
              {workout?.title}
            </NavLink>
          );
        }

    };



    return (
        <div className="exercise-page">

            <div className="space-under-title">
            <h1>My Exercises</h1>

            <div className="search">
                <form id="workoutSearchForm" onSubmit={(e) => e.preventDefault()}>
                {/* <i className="fa fa-search"></i> */}
                <input
                    type="text"
                    placeholder="Search My Exercises"
                    name="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                </form>
            </div>
            {filteredExercises.length === 0 && <p>No Results</p>}

            <button
            className="create-exercise-button"
            onClick={() => handleCreateClick()}
            >
                Create an exercise
            </button>

            </div>

            <div className="exercise-wrapper">
            {filteredExercises.map((exercise) => (
                <div
                    key={exercise.id}
                    className="exercise-tile"
                    // to={`/exercises/${exercise.id}`}
                >
                    <h2>{`${exercise.title}`}</h2>
                    <img
                        className="exercise-img"
                        src={`${exercise.image_url}`}
                        alt="exercise-cover"
                        title={`${exercise.title}`}
                     />

                     <div>
                     <p className="sets-reps">{`${exercise?.sets}`} sets x {`${exercise?.reps}`} reps</p>
                     <p className="exercise-description">{`${exercise?.description}`}</p>
                     {
                        exercise.workout_id ? (
                            <p className="exercise-description">Included in: {getWorkoutTitle(exercise?.workout_id)}</p>
                        ) : (
                            <p className="exercise-description">Included in: None</p>
                        )
                    }

                     </div>

                     <button className="update-btn" onClick={() => handleUpdateClick(exercise?.id)}>
                        Update
                    </button>

                    <OpenModalButton
                        className="delete-button"
                        buttonText="Delete"
                        modalComponent={<DeleteExerciseModal exerciseId={exercise?.id}/>}
                    />

                </div>
          ))}
        </div>

        </div>
    )

}

export default MyExercisesPage
