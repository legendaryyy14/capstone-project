import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFavesThunk, faveWorkoutThunk, unfaveWorkoutThunk } from "../../store/faves";

function FaveButton ({workoutId, onFave}) {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.session.user.id);
    const faves = Object.values(useSelector((state) => state.faves))
    const [isFaved, setIsFaved] = useState(false);
    console.log(faves)

    useEffect(() => {
        dispatch(getAllFavesThunk());
    }, [dispatch]);

    useEffect(() => {
        setIsFaved(faves?.some((fave) => fave.workout_id === workoutId && fave.user_id === userId))
    }, [faves, workoutId, userId]);

    const setFaveButtonState = async () => {
      try {
        // Check for valid userId and workoutId
        const payload = {
          workoutId: workoutId, // Replace with the correct workoutId
          userId: userId,    // Replace with the correct userId
        };
        if (!userId || !workoutId) {
          console.error("Invalid userId or workoutId");
          return;
        }
        if (isFaved && workoutId) {
          {console.log('unfaving:', payload)}
          await dispatch(unfaveWorkoutThunk(payload));
          setIsFaved(false);
        } else {
          {console.log('faving:', workoutId, userId)}
          await dispatch(faveWorkoutThunk(payload));
          setIsFaved(true);
        }

        // Callback after favoriting/unfavoriting is completed
        if (onFave) {
          await onFave();
        }
      } catch (error) {
        console.error("Error favoriting/unfavoriting workout:", error);
        // Handle the error, e.g., show a notification to the user
      }
    };


    return (
        <div className="fave-row">
        <button
          className="fave-button"
          onClick={setFaveButtonState}
          style={{
            color: isFaved ? "red" : "white",
          }}
        >
         <i class="fas fa-heart"></i>
        </button>

        <p className="faves-count">
  {
    faves ? (
      <>
        {console.log('faves:', faves)}
        {console.log('workoutId:', workoutId)}
        {faves?.filter((fave) => fave.workout_id === workoutId).length}
      </>
    ) : null
  }
</p>

        </div>
      );

}

export default FaveButton;
