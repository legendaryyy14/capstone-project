// Action Types
const GET_WORKOUTS = "workouts/GET_WORKOUTS";
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
    type: DELETE_WORKOUT,
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
    try {
      const response = await fetch(`/api/workouts/${workoutId}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const workout = await response.json();
      if (workout.errors) {
        return workout.errors;
      } else {
        dispatch(getWorkout(workout));
      }
    } catch (error) {
      console.error("Error fetching workout by ID:", error);
      // Handle the error, e.g., dispatch an action to store the error state
    }
  };
  // export const getWorkoutByIdThunk = (workoutId) => async (dispatch) => {
  //   const response = await fetch(`/api/workouts/${workoutId}`);

  //   if (response.ok) {
  //     const workout = await response.json();
  //     if (workout.errors) {
  //       return workout.errors;
  //     } else {

  //       dispatch(getWorkout(workout));
  //     }

  //   }
  // };

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

  };

  export const editWorkout = (payload) => async (dispatch) => {
    const response = await fetch(`/api/workouts/${payload.id}`, {
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

  };

  export const removeWorkout = (workoutId) => async (dispatch) => {
    const response = await fetch(`/api/workouts/${workoutId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(deleteWorkout(workoutId));
    }
  };



// Reducer Function
const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_WORKOUTS:
      newState = {};
      action.payload.forEach((workout) => {
        newState[workout.id] = workout;
      });
      return newState;

    case GET_WORKOUT:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;

    case ADD_WORKOUT:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;

    case UPDATE_WORKOUT:
      if (!action.payload.id) return state;
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;

    case DELETE_WORKOUT:
      newState = { ...state };
      delete newState[action.payload];
      return newState;

    default:
      return state;
  }
}
