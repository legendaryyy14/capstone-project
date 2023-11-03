import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllWorkoutsThunk } from "../../store/workouts";

function WorkoutsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllWorkoutsThunk());
    }, [dispatch]);

    const workoutObj = useSelector((state) => state.workouts);
    console.log(workoutObj)
    const workouts = Object.values(workoutObj)
    console.log(workouts)

    return (
        <div className="workouts-page">
        <h1>All Workouts</h1>
        <div className="workout-wrapper">
          {workouts.map((workout) => (
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
              <a>{`${workout.title}`}</a>
            </NavLink>
          ))}
        </div>
      </div>
    )

}

export default WorkoutsPage;
