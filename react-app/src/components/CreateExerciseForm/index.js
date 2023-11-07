import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {  createExercise } from "../../store/exercises";
import { getAllWorkoutsThunk } from "../../store/workouts";


function CreateWorkoutForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state.session.user.id);
    const workoutObj = useSelector((state) => state.workouts);
    const myWorkouts = Object.values(workoutObj).filter(workout => workout?.user_id === userId)

    const [addToExistingWorkout, setAddToExistingWorkout] = useState(false);
    const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [sets, setSets ] = useState("");
    const [reps, setReps ] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errors, setErrors] = useState({});

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateSets = (e) => setSets(e.target.value)
    const updateReps = (e) => setReps(e.target.value)
    const updateImageUrl = (e) => setImageUrl(e.target.value);

    useEffect(() => {
        dispatch(getAllWorkoutsThunk());
    }, [dispatch]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const payload = {
          user_id: userId,
          workout_id: addToExistingWorkout ? selectedWorkoutId : null,
          title,
          description,
          sets,
          reps,
          image_url: imageUrl
        };


        const res = await dispatch(createExercise(payload));

        if (res && res.errors) {
            setErrors(res.errors);
        } else if (res?.workout_id) {
            history.push(`/workouts/${res.workout_id}`);
        } else {
            history.push(`/my-exercises`);
        }

    };

    const handleCheckboxChange = (e) => {
        setAddToExistingWorkout(e.target.checked);
    };

    const handleDropdownChange = (e) => {
        setSelectedWorkoutId(parseInt(e.target.value));
    };


    return (
        <div>
        <form className="form" onSubmit={handleSubmit}>
          <h1>Create A New Exercise</h1>

          <label>
            <div className="form-row">
              Title
            </div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={updateTitle}
            />
              <p className="errors" style={{color:"red", fontSize:11}}>{errors.title}</p>
          </label>

          <label>
            <div className="form-row">
              Description
            </div>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={updateDescription}
            />
              <p className="errors" style={{color:"red", fontSize:11}}>{errors.description}</p>
          </label>

          <label>
            <div className="form-row">
              Sets
            </div>
            <input
              type="text"
              placeholder="Sets"
              value={sets}
              onChange={updateSets}
            />
            <p className="errors" style={{color:"red", fontSize:11}}>{errors.sets}</p>
          </label>

          <label>
            <div className="form-row">
              Reps
            </div>
            <input
              type="text"
              placeholder="Reps"
              value={reps}
              onChange={updateReps}
            />
            <p className="errors" style={{color:"red", fontSize:11}}>{errors.reps}</p>
          </label>

          <label>
            <div className="form-row">
              Exercise Photo
            </div>
            <input
              type="text"
              placeholder="Exercise Photo URL"
              value={imageUrl}
              onChange={updateImageUrl}
            />
              <p className="errors" style={{color:"red", fontSize:11}}>{errors.image_url}</p>
          </label>

          <label>
          <div className="form-row">Add to existing workout?</div>
          <input
            type="checkbox"
            checked={addToExistingWorkout}
            onChange={handleCheckboxChange}
          />
        </label>

        {addToExistingWorkout && (
          <label>
            <div className="form-row">Select Workout</div>
            <select value={selectedWorkoutId} onChange={handleDropdownChange}>
              <option value={null}>Select a workout</option>
              {myWorkouts.map((workout) => (
                <option key={workout.id} value={workout.id}>
                  {workout.title}
                </option>
              ))}
            </select>
          </label>
        )}



          <button
            type="submit"
            disabled={ !description || !imageUrl}
          >
            Create Workout
          </button>
        </form>
      </div>
    )

}

export default CreateWorkoutForm;
