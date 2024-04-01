import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getFavesThunk, getAllFavesThunk, faveWorkoutThunk, unfaveWorkoutThunk } from "../../store/faves";
import { getAllWorkoutsThunk } from "../../store/workouts";
import { getUsersThunk } from "../../store/users";
import FaveButton from "../FaveButton";

function FaveWorkoutsPage() {


  const dispatch = useDispatch();

  const userId = useSelector((state) => state.session.user.id);
  const favesObj = useSelector((state) => state.faves);
  const faves = Object.values(favesObj).filter((fave) => fave?.user_id === userId )
  const workoutObj = useSelector((state) => state.workouts);
  const workouts = Object.values(workoutObj).filter(workout =>
  workout.public === true && faves.some(fave => fave?.workout_id === workout.id)
);
  console.log(faves)
  const users = useSelector((state) => state?.users?.users);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredWorkouts = workouts.filter((workout) =>
    workout.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(getAllWorkoutsThunk());
    dispatch(getUsersThunk());
    dispatch(getAllFavesThunk());
  }, [dispatch]);

  const handleWorkoutFaved = () => {
    dispatch(getAllFavesThunk());
  };

  return (
    <div className="workouts-page">
      <h1>Favorite Workouts</h1>

      <div className="search">
        <form id="workoutSearchForm" onSubmit={(e) => e.preventDefault()}>
          {/* <i className="fa fa-search"></i> */}
          <input
            type="text"
            placeholder="Search Favorite Workouts"
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
            <p className="by">
              {" "}
              {`by ${
                users?.filter((user) => user?.id === workout?.user_id)[0]
                  .username
              }`}
            </p>
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

            <div className="fave-row">

              <FaveButton
                workoutId={workout?.id}
                className="fave-button"
                onFave={handleWorkoutFaved}

              />
              {/* {`${
                Object.values(faves).filter(
                  (fave) => workout?.id === fave?.workout_id
                ).length
              }`} */}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaveWorkoutsPage;
