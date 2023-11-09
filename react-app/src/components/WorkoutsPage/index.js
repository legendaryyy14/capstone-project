import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllWorkoutsThunk } from "../../store/workouts";
import { getUsersThunk } from "../../store/users";
import "./WorkoutsPage.css"

function WorkoutsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllWorkoutsThunk());
        dispatch(getUsersThunk())
    }, [dispatch]);

    const workoutObj = useSelector((state) => state.workouts);
    const workouts = Object.values(workoutObj).filter(workout => workout.public === true)
    const users = useSelector((state) => state?.users?.users)
    console.log(users)

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
              <h2>{`${workout.title} by ${users?.filter(user => user?.id === workout?.user_id)[0].username}`}</h2>
              <img
                className="workout-img"
                src={`${workout.image_url}`}
                alt="workout-cover"
                title={`${workout.title}`}
              />
              <p>{`${workout.description}`}</p>
            </NavLink>
          ))}
        </div>
      </div>
    )

}

export default WorkoutsPage;
