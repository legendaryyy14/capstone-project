import React, { useEffect, useState } from "react";
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
    const [searchQuery, setSearchQuery] = useState("");
    const filteredWorkouts = myWorkouts.filter((workout) =>
      workout.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateClick = () => {
      history.push(`/workouts/create`);
    };

    const handleUpdateClick = (workoutId) => {
      history.push(`/workouts/${workoutId}/update`);
    };

    return (
        <div className="my-workouts-page">
        <div className="space-under-title">
        <h1>My Workouts</h1>

        <div className="search">
        <form id="workoutSearchForm" onSubmit={(e) => e.preventDefault()}>
          {/* <i className="fa fa-search"></i> */}
          <input
            type="text"
            placeholder="Search My Workouts"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        </div>
        {filteredWorkouts.length === 0 && <p>No Results</p>}
        <button
            className="create-workout-button"
            onClick={() => handleCreateClick()}
            >
                Create a Workout
            </button>

        </div>
        <div className="workout-wrapper">
          {filteredWorkouts.map((workout) => (
            <div className="workout">
              <h2>{`${workout?.title}`}</h2>
              <p className="by">{`by ${user?.username}`}</p>
              <p>Public: {workout?.public ? (<span>yes</span>) : (<span>no</span>)}</p>
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
            </NavLink>
              <p>{`${workout.description}`}</p>

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
