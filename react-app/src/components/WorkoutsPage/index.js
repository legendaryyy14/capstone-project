import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllWorkoutsThunk, getFavesThunk, faveWorkoutThunk, unfaveWorkoutThunk } from "../../store/workouts";
import { getUsersThunk } from "../../store/users";
import FaveButton from "../FaveButton";
import "./WorkoutsPage.css"

function WorkoutsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllWorkoutsThunk());
        dispatch(getUsersThunk());
        // dispatch(getFavesThunk())
    }, [dispatch]);

    const userId = useSelector((state) => state.session.user.id);
    const faves = useSelector((state) => state.workouts.faves)
    const workoutObj = useSelector((state) => state.workouts);
    const workouts = Object.values(workoutObj).filter(workout => workout.public === true)
    const [searchQuery, setSearchQuery] = useState("");
    const filteredWorkouts = workouts.filter((workout) =>
      workout.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const users = useSelector((state) => state?.users?.users)

    // const handleWorkoutFaved = () => {
    //   dispatch(getFavesThunk());
    // };

    return (
        <div className="workouts-page">
        <h1>All Workouts</h1>

        <div className="search">
        <form id="workoutSearchForm" onSubmit={(e) => e.preventDefault()}>
          {/* <i className="fa fa-search"></i> */}
          <input
            type="text"
            placeholder="Search Workouts"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        </div>
        {filteredWorkouts.length === 0 && <p>No Results</p>}
        <div className="workout-wrapper">
          {filteredWorkouts?.map((workout) => (
            <div className="workout" key={workout?.id}>
              <h2>{`${workout?.title}`}</h2>
              <p className='by'> {`by ${users?.filter(user => user?.id === workout?.user_id)[0].username}`}</p>
            <NavLink
              key={workout?.id}
              className="workout-tile"
              to={`/workouts/${workout?.id}`}
            >
              <img
                className="workout-img"
                src={`${workout?.image_url}`}
                alt="workout-cover"
                title={`${workout?.title}`}
              />
            </NavLink>
              <p>{`${workout?.description}`}</p>

            {/* <p className="faves">
              <FaveButton
                  workoutId={workout.id}
                  className="fave-button"
                  onFave={handleWorkoutFaved}
              />
            </p> */}

            </div>
          ))}
        </div>
      </div>
    )

}

export default WorkoutsPage;
