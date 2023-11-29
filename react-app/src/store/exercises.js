// Action Types
const GET_EXERCISES = "exercises/GET_EXERCISES";
const GET_EXERCISE = "exercises/GET_EXERCISE";
const ADD_EXERCISE = "exercises/ADD_EXERCISE";
const UPDATE_EXERCISE = "exercises/UPDATE_EXERCISE";
const DELETE_EXERCISE = "exercises/DELETE_EXERCISE";

// Action Creators
const getExercises = (allExercises) => ({
    type: GET_EXERCISES,
    payload: allExercises,
  });
  const getExercise = (exercise) => ({
    type: GET_EXERCISE,
    payload: exercise,
  });
  const addExercise = (exercise) => ({
    type: ADD_EXERCISE,
    payload: exercise,
  });
  const updateExercise = (exerciseId) => ({
    type: UPDATE_EXERCISE,
    payload: exerciseId,
  });
  const deleteExercise = (exerciseId) => ({
    type: DELETE_EXERCISE,
    payload: exerciseId,
  });


  // Thunk Middleware
export const getAllExercisesThunk = () => async (dispatch) => {
    const response = await fetch("/api/exercises/");

    if (response.ok) {
      const exercises = await response.json();
      if (exercises.errors) {
        return exercises.errors;
      }

      dispatch(getExercises(exercises));
    }
  };

  export const getExerciseByIdThunk = (exerciseId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/exercises/${exerciseId}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const exercise = await response.json();
      if (exercise.errors) {
        return exercise.errors;
      } else {
        dispatch(getExercise(exercise));
      }
    } catch (error) {
      console.error("Error fetching workout by ID:", error);
      // Handle the error, e.g., dispatch an action to store the error state
    }
  };
  // export const getWorkoutByIdThunk = (exerciseId) => async (dispatch) => {
  //   const response = await fetch(`/api/workouts/${exerciseId}`);

  //   if (response.ok) {
  //     const workout = await response.json();
  //     if (workout.errors) {
  //       return workout.errors;
  //     } else {

  //       dispatch(getWorkout(workout));
  //     }

  //   }
  // };

  export const createExercise = (payload) => async (dispatch) => {
    const response = await fetch("/api/exercises/create", {
      method: "POST",
      body: payload,
    });

    try {
      const createdExercise = await response.json();
      dispatch(addExercise(createdExercise));
      return createdExercise
    } catch(error) {
      return error
    }

  };

  export const createExerciseForWorkout = (payload) => async (dispatch) => {
    const response = await fetch(`/api/exercises/${payload.get(`workoutId`)}/add-exercise`, {
      method: "POST",
      body: payload,
    });

    try {
      const createdExercise = await response.json();
      dispatch(addExercise(createdExercise));
      return createdExercise
    } catch(error) {
      return error
    }

  };



  export const editExercise = (payload) => async (dispatch) => {
    const response = await fetch(`/api/exercises/${payload.get(`id`)}`, {
      method: "PUT",
      body: payload,
    });

    try {
      const updatedExercise = await response.json();
      dispatch(updateExercise(updatedExercise));
      return updatedExercise
    } catch(error) {
      return error
    }

  };

  export const removeExercise = (exerciseId) => async (dispatch) => {
    const response = await fetch(`/api/exercises/${exerciseId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(deleteExercise(exerciseId));
    }
  };


// Reducer Function
const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_EXERCISES:
      newState = {};
      action.payload.forEach((exercise) => {
        newState[exercise.id] = exercise;
      });
      return newState;

    case GET_EXERCISE:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;

    case ADD_EXERCISE:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;

    case UPDATE_EXERCISE:
      if (!action.payload.id) return state;
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;

    case DELETE_EXERCISE:
      newState = { ...state };
      delete newState[action.payload];
      return newState;

    default:
      return state;
  }
}
