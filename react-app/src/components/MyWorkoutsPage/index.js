import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllWorkoutsThunk } from "../../store/workouts";
import OpenModalButton from "../OpenModalButton";
import DeleteWorkoutModal from "../DeleteWorkoutModal";

function MyWorkoutsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllWorkoutsThunk());
    }, [dispatch]);

    const user = useSelector((state) => state.session.user);
    const workoutObj = useSelector((state) => state.workouts);
    const myWorkouts = Object.values(workoutObj).filter(workout => workout?.user_id === user.id)

    return (
        <div className="my-workouts-page">
        <h1>My Workouts</h1>
        <div className="workout-wrapper">
          {myWorkouts.map((workout) => (
            <div>
            <NavLink
              key={workout.id}
              className="workout-tile"
              to={`/workouts/${workout.id}`}
            >
              <img
                className="workout-img"
                src={`${workout.image_url}`}
                alt="workout-cover"
                title={`${workout.title}`}
              />
              <h2>{`${workout.title} by ${user.username}`}</h2>
              <p>{`${workout.description}`}</p>
            </NavLink>

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
