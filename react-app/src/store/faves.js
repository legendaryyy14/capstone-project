const GET_FAVES = "song/GET_FAVES";
const GET_ALL_FAVES = "song/GET_ALL_FAVES";
const FAVE_WORKOUT = "song/FAVE_WORKOUT";
const UNFAVE_WORKOUT = "song/UNFAVE_WORKOUT";

const getFaves = (faves) => ({
    type: GET_FAVES,
    payload: faves,
  });
  const getAllFaves = (allFaves) => ({
    type: GET_ALL_FAVES,
    payload: allFaves
  });
  const faveWorkout = (data) => ({
    type: FAVE_WORKOUT,
    payload: data,
  });
  const unfaveWorkout = (data) => ({
    type: UNFAVE_WORKOUT,
    payload: data,
  });

  export const getAllFavesThunk = () => async (dispatch) => {
    const response = await fetch(`/api/faves/`);

    if (response.ok) {
      const faves = await response.json();
      if (faves.errors) {
        return faves.errors;
      }

      dispatch(getAllFaves(faves));
    }
  };

  export const getFavesThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/faves/${userId}`);

    if (response.ok) {
      const faves = await response.json();
      if (faves.errors) {
        return faves.errors;
      }

      dispatch(getFaves(faves));
    }
  };

export const faveWorkoutThunk = (payload) => async (dispatch) => {
  if (!payload || !payload.workoutId || !payload.userId) {
    // Check if payload or required properties are missing
    console.log("hello", payload)
    return; // Exit the function if any required property is missing
  }

  const response = await fetch(`/api/faves/${payload.workoutId}/${payload.userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const faves = await response.json();
    if (faves.errors) {
      return faves.errors;
    }
    dispatch(faveWorkout(faves)); // Pass faves.data or the relevant data as the payload
  }
};

  export const unfaveWorkoutThunk = (payload) => async (dispatch) => {
    const response = await fetch(`/api/faves/${payload.workoutId}/${payload.userId}`, {
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

//REDUCER FUNCTION
  const initialState = {};

  export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
    case GET_ALL_FAVES:
        newState = {};
        action.payload.forEach((fave) => {
        newState[fave.id] = fave;
        });
        return newState;

      case GET_FAVES:
        newState = {};
        action.payload.forEach((fave) => {
          newState[fave.id] = fave;
        });
        return newState;


      case FAVE_WORKOUT:
        newState = { ...state };
        newState[action.payload.id] = action.payload;
        return newState;

      case UNFAVE_WORKOUT:
        newState = { ...state };
        delete newState[action.payload];
        return newState;

      default:
        return state;
    }
  }
