import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavesThunk, faveWorkoutThunk, unfaveWorkoutThunk } from "../../store/faves";

function FaveButton ({workoutId, onFave}) {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.session.user.id);
    const faves = useSelector((state) => state.workouts.faves)
    const [isFaved, setIsFaved] = useState(false);
    console.log(faves)

    useEffect(() => {
        dispatch(getFavesThunk(userId));
    }, [dispatch]);

    useEffect(() => {
        setIsFaved(faves?.some((fave) => fave.workout_id === workoutId && fave.user_id === userId))
    }, [faves, workoutId]);

    const setFaveButtonState = async () => {
        try {
          if (isFaved) {
            await dispatch(unfaveWorkoutThunk(workoutId, userId));
            setIsFaved(false);
          } else {
            await dispatch(faveWorkoutThunk(workoutId, userId));
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
        <div>
        <button
          className="fave-button"
          onClick={setFaveButtonState}
          style={{
            color: isFaved ? "gold" : "white",
          }}
        >
         <i class="fas fa-heart"></i>
        </button>

        <p className="faves-count">
            {
            faves?.filter((fave) => fave.workout_id === workoutId).length
            }
        </p>

        </div>
      );

}

export default FaveButton;
