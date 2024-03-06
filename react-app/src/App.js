import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import WorkoutsPage from "./components/WorkoutsPage"
import HomeRedirectPage from "./components/HomeRedirectPage";
import OneWorkoutPage from "./components/OneWorkoutPage";
import MyExercisesPage from "./components/MyExercisesPage";
import MyWorkoutsPage from "./components/MyWorkoutsPage";
import CreateExerciseForm from "./components/CreateExerciseForm";
import CreateWorkoutForm from "./components/CreateWorkoutForm";
import UpdateExerciseForm from "./components/UpdateExerciseForm";
import UpdateWorkoutForm from "./components/UpdateWorkoutForm";
import CreateExerciseFormForWorkout from "./components/CreateExerciseForWorkoutForm";
import FaveWorkoutsPage from "./components/FavoritedWorkouts";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);


  if (isLoaded) {
    if (!user) {
      return <HomeRedirectPage />;
    }
  }

  return (
    <>
      {isLoaded && (
      <Navigation isLoaded={isLoaded} />
      )}
      {isLoaded && (
        <Switch>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route path="/workouts/create">
            <CreateWorkoutForm />
          </Route>
          <Route path="/faves/">
            <FaveWorkoutsPage />
          </Route>
          <Route path="/workouts/:workoutId/update">
            <UpdateWorkoutForm />
          </Route>
          <Route path="/workouts/:workoutId">
            <OneWorkoutPage />
          </Route>
          <Route path="/workouts">
            <WorkoutsPage />
          </Route>
          <Route path="/my-workouts">
            <MyWorkoutsPage />
          </Route>
          <Route path="/exercises/create">
            <CreateExerciseForm />
          </Route>
          <Route path="/exercises/:workoutId/add-exercise">
            <CreateExerciseFormForWorkout />
          </Route>
          <Route path="/exercises/:exerciseId">
            <UpdateExerciseForm />
          </Route>
          <Route path="/my-exercises">
            <MyExercisesPage />
          </Route>
          <Route exact path="/">
            <WorkoutsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
