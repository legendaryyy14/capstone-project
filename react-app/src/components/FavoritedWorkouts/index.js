import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getFavesThunk, getAllFavesThunk, faveWorkoutThunk, unfaveWorkoutThunk } from "../../store/faves";
import { getAllWorkoutsThunk } from "../../store/workouts";
import { getUsersThunk } from "../../store/users";
// import FaveButton from "../FaveButton";

function FaveWorkoutsPage() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.session.user.id);
    const faves = useSelector((state) => state.faves)
console.log(faves)
    useEffect(() => {
        dispatch(getAllWorkoutsThunk());
        dispatch(getUsersThunk());
        dispatch(getFavesThunk(userId));

    }, [dispatch, userId]);

    return(
        <h1>hi</h1>
    )
}

export default FaveWorkoutsPage;
