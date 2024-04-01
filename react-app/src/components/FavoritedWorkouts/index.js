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
  const workouts = Object.values(workoutObj).filter(
    (workout) => workout.public === true
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

//     const dispatch = useDispatch();
//     const userId = useSelector((state) => state.session.user.id);
//     const workoutObj = useSelector((state) => state.workouts);
//     const faves = Object.values(useSelector((state) => state.faves))
//     const myFaves = faves?.filter((fave) => fave?.user_id === userId)
//     const myFaveWorkoutIds = faves?.map(fave => fave?.workout_id);
//     const workouts = Object.values(workoutObj)
//     const myWorkouts = workouts?.filter(workout => myFaveWorkoutIds.includes(workout.id));


//     const [searchQuery, setSearchQuery] = useState("");
//     const filteredWorkouts = myWorkouts.filter((workout) =>
//     workout.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//     const handleWorkoutFaved = async () => {
//         try {
//             // Refresh the list of faves after favoriting/unfavoriting a workout
//             await dispatch(getAllFavesThunk());
//         } catch (error) {
//             console.error("Error updating faves:", error);
//             // Handle the error, e.g., show a notification to the user
//         }
//     };

//     {console.log("allWorkouts:",workouts)}
//     {console.log("faves:", faves)}
//     {console.log("myFaves:", myFaves)}
//     {console.log("myWorkouts", myFaveWorkoutIds)}

//     useEffect(() => {
//         dispatch(getAllWorkoutsThunk());
//         dispatch(getUsersThunk());
//         dispatch(getFavesThunk(userId));

//     }, [dispatch, userId]);

//     return(
//         <div className="workouts-page">
//             <h1>Favorite Workouts</h1>
//             {/* {faves.length === 0 && <p>No Favorites... yet :)</p>} */}

//             <div className="search">
//                 <form id="workoutSearchForm" onSubmit={(e) => e.preventDefault()}>
//                 {/* <i className="fa fa-search"></i> */}
//                 <input
//                     type="text"
//                     placeholder="Search Favorited Workouts"
//                     name="search"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 </form>
//             </div>
//             <div className="workout-wrapper">
//                 {filteredWorkouts?.map((workout) => (
//                     <div className="workout" key={workout?.id}>
//                         <h2>{`${workout?.title}`}</h2>
//                         <NavLink
//                             key={workout?.id}
//                             className="workout-tile"
//                             to={`/workouts/${workout?.id}`}
//                             >
//                             <img
//                                 className="workout-img"
//                                 src={`${workout?.image_url}`}
//                                 alt="workout-cover"
//                                 title={`${workout?.title}`}
//                             />
//                         </NavLink>
//                         <p>{`${workout?.description}`}</p>

//                         <div className="row">
//                         <FaveButton
//                         workoutId={workout?.id}
//                         className="fave-button"
//                         onFave={handleWorkoutFaved}
//                         />

//                          <p>{`${Object.values(faves).filter(fave => workout?.id === fave?.workout_id).length}`}</p>

//                         </div>

//                     </div>
//                 ))}
//             </div>
//         </div>

//     )
}

export default FaveWorkoutsPage;
