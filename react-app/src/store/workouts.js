// Action Types
const GET_WORKOUTS = "workouts/GET_WORKOUT";
const GET_WORKOUT = "workouts/GET_WORKOUT";
const ADD_WORKOUT = "workouts/ADD_WORKOUT";
const UPDATE_WORKOUT = "workouts/UPDATE_WORKOUT";
const DELETE_WORKOUT = "workouts/DELETE_WORKOUT";

// Action Creators
const getWorkouts = (allWorkouts) => ({
    type: GET_WORKOUTS,
    payload: allWorkouts,
  });
  const getWorkout = (workout) => ({
    type: GET_WORKOUT,
    payload: workout,
  });
  const addWorkout = (workout) => ({
    type: ADD_WORKOUT,
    payload: workout,
  });
  const updateWorkout = (workoutId) => ({
    type: UPDATE_WORKOUT,
    payload: workoutId,
  });
  const deleteWorkout = (workoutId) => ({
    type: DELETE_ALBUM,
    payload: workoutId,
  });


// Thunk Middleware

export const getAllWorkoutsThunk = () => async (dispatch) => {
    const response = await fetch("/api/workouts/");

    if (response.ok) {
      const workouts = await response.json();
      if (workouts.errors) {
        return workouts.errors;
      }

      dispatch(getWorkouts(workouts));
    }
  };

  export const getWorkoutByIdThunk = (workoutId) => async (dispatch) => {
    const response = await fetch(`/api/workouts/${workoutId}`);

    if (response.ok) {
      const workout = await response.json();
      if (workout.errors) {
        return workout.errors;
      }

      dispatch(getWorkout(workout));
    }
  };

  export const createWorkout = (payload) => async (dispatch) => {
    const response = await fetch("/api/workouts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    try {
      const createdWorkout = await response.json();
      dispatch(addWorkout(createdWorkout));
      return createdWorkout
    } catch(error) {
      return error
    }

  //   if (response.ok) {
  //     const createdAlbum = await response.json();
  //     dispatch(addAlbum(createdAlbum));
  //   }
  };

  export const editWorkout = (payload) => async (dispatch) => {
    const response = await fetch(`/api/workoutss/${payload.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    try {
      const updatedWorkout = await response.json();
      dispatch(updateWorkout(updatedWorkout));
      return updatedWorkout
    } catch(error) {
      return error
    }

    // if (response.ok) {
    //   const updatedAlbum = await response.json();
    //   dispatch(updateAlbum(updatedAlbum));
    //   return updatedAlbum;
    // }
  };

  export const removeWorkout = (workoutId) => async (dispatch) => {
    const response = await fetch(`/api/workouts/${workoutId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(deleteWorkout(workoutId));
    }
  };
