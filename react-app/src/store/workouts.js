// Action Types
const GET_WORKOUTS = "workouts/GET_WORKOUTS";
const GET_WORKOUT = "workouts/GET_WORKOUT";
const ADD_WORKOUT = "workouts/ADD_WORKOUT";
const UPDATE_WORKOUT = "workouts/UPDATE_WORKOUT";
const DELETE_WORKOUT = "workouts/DELETE_WORKOUT";
const GET_FAVES = "song/GET_FAVES";
const GET_WORKOUT_FAVES = "song/GET_WORKOUT_FAVES";
const FAVE_WORKOUT = "song/FAVE_WORKOUT";
const UNFAVE_WORKOUT = "song/UNFAVE_WORKOUT";


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
  const getFaves = (faves) => ({
    type: GET_FAVES,
    payload: faves,
  });
  const getWorkoutFaves = (workoutId) => ({
    type: GET_WORKOUT_FAVES,
    payload: workoutId
  });
  const faveWorkout = (data) => ({
    type: FAVE_WORKOUT,
    payload: data,
  });
  const unfaveWorkout = (data) => ({
    type: UNFAVE_WORKOUT,
    payload: data,
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
      body: payload,
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

  export const getFavesThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/workouts/favorites/${userId}`);

    if (response.ok) {
      const faves = await response.json();
      if (faves.errors) {
        return faves.errors;
      }

      dispatch(getFaves(faves));
    }
  };

  export const getWorkoutFavesThunk = () => async (dispatch) => {
    const response = await fetch(`/api/workouts/favorites`);

    if (response.ok) {
      const faves = await response.json();
      if (faves.errors) {
        return faves.errors;
      }

      dispatch(getWorkoutFaves(faves));
    }
  };

  export const faveWorkoutThunk = (workoutId, userId) => async (dispatch) => {
    const response = await fetch(`/api/songs/${workoutId}/like/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(payload),
    });

    if (response.ok) {
      const faves = await response.json();
      if (faves.errors) {
        return faves.errors;
      }
      dispatch(faveWorkout(faves)); // Pass faves.data or the relevant data as the payload
    }
  };

  export const unfaveWorkoutThunk = (workoutId, userId) => async (dispatch) => {
    const response = await fetch(`/api/songs/${workoutId}/like/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(payload),
    });

    if (response.ok) {
      const faves = await response.json();
      if (faves.errors) {
        return faves.errors;
      }
      dispatch(unfaveWorkout(faves)); // Pass faves.data or the relevant data as the payload
    }
  };



// Reducer Function
const initialState = {faves: [], workoutFaves: []};

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
    case GET_FAVES:
      return { ...state, faves: action.payload };
    case GET_WORKOUT_FAVES:
      return { ...state, workoutFaves: action.payload };
    case FAVE_WORKOUT:
      return { ...state, faves: action.payload };
    case UNFAVE_WORKOUT:
      return { ...state, faves: action.payload };

    default:
      return state;
  }
}
