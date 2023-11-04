import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllWorkoutsThunk } from "../../store/workouts";
import "./WorkoutsPage.css"

function WorkoutsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllWorkoutsThunk());
    }, [dispatch]);

    const workoutObj = useSelector((state) => state.workouts);
    const workouts = Object.values(workoutObj)

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
              <h2>{`${workout.title}`}</h2>
            </NavLink>
          ))}
        </div>
      </div>
    )

}

export default WorkoutsPage;
