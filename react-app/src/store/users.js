const GET_USERS = "workouts/GET_USERS";


const getAllUsers = (allUsers) => ({
    type: GET_USERS,
    payload: allUsers,
  });


export const getUsersThunk = () => async (dispatch) => {
      const response = await fetch(`/api/users/`);

      if (response.ok) {
        const users = await response.json();
        if (users.errors) {
          return users.errors;
        }

        dispatch(getAllUsers(users));
      }
};

// Reducer Function
const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_USERS:
      // Ensure action.payload is an object before storing user data
      if (typeof action.payload === 'object' && action.payload !== null) {
        const newState = {};
        Object.keys(action.payload).forEach((userId) => {
          newState[userId] = action.payload[userId];
        });
        return newState;
      } else {
        console.error("Invalid payload for GET_USERS action:", action.payload);
        // Handle the invalid payload scenario, return the current state or an appropriate value
        return state;
      }
    default:
      return state;
  }
}
