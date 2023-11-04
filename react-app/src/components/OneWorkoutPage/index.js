import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getWorkoutByIdThunk } from "../../store/workouts";


function OneWorkoutPage() {
    const dispatch = useDispatch();
    const { workoutId } = useParams();
    const userId = useSelector((state) => state.session.user.id);

    useEffect(() => {
        dispatch(getWorkoutByIdThunk(workoutId))
    })

    return (
        <div>
            <h1>HELLOOOOO</h1>
        </div>
    )
}

export default OneWorkoutPage;
