import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllWorkoutsThunk } from "../../store/workouts";
import OpenModalButton from "../OpenModalButton";
import DeleteWorkoutModal from "../DeleteWorkoutModal";
import { useHistory } from "react-router-dom";

function MyWorkoutsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllWorkoutsThunk());
    }, [dispatch]);

    const user = useSelector((state) => state.session.user);
    const workoutObj = useSelector((state) => state.workouts);
    const myWorkouts = Object.values(workoutObj).filter(workout => workout?.user_id === user.id)

    const handleCreateClick = () => {
      history.push(`/workouts/create`);
    };

    const handleUpdateClick = (workoutId) => {
      history.push(`/workouts/${workoutId}/update`);
    };

    return (
        <div className="my-workouts-page">
        <h1>My Workouts</h1>
        <button
            className="create-workout-button"
            onClick={() => handleCreateClick()}
            >
                Create a Workout
            </button>
        <div className="workout-wrapper">
          {myWorkouts.map((workout) => (
            <div>
            <NavLink
              key={workout.id}
              className="workout-tile"
              to={`/workouts/${workout.id}`}
            >
              <h2>{`${workout.title} by ${user.username}`}</h2>
              <p>Public: {`${workout?.public}`}</p>
              <img
                className="workout-img"
                src={`${workout.image_url}`}
                alt="workout-cover"
                title={`${workout.title}`}
              />
              <p>{`${workout.description}`}</p>
            </NavLink>

            <button className="update-btn" onClick={() => handleUpdateClick(workout.id)}>
              Update
            </button>

            <OpenModalButton
                className="delete-button"
                buttonText="Delete"
                modalComponent={<DeleteWorkoutModal workoutId={workout.id}/>}
            />


            </div>
          ))}
        </div>
      </div>
    )

}

export default MyWorkoutsPage;
