import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {  createExercise } from "../../store/exercises";
import { getAllWorkoutsThunk } from "../../store/workouts";


function CreateExerciseForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state.session.user.id);
    const workoutObj = useSelector((state) => state.workouts);
    const myWorkouts = Object.values(workoutObj).filter(workout => workout?.user_id === userId)

    const [addToExistingWorkout, setAddToExistingWorkout] = useState(false);
    const [selectedWorkoutId, setSelectedWorkoutId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [sets, setSets ] = useState(1);
    const [reps, setReps ] = useState(1);
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");


    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateSets = (e) => setSets(e.target.value)
    const updateReps = (e) => setReps(e.target.value)
    // const updateImageUrl = (e) => setImageUrl(e.target.value);

    useEffect(() => {
        dispatch(getAllWorkoutsThunk());
    }, [dispatch]);

    const handleCancelButton = () => {
      history.goBack();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setGeneralError("");

        const formData = new FormData();
        formData.append("image_url", image);
        formData.append("user_id", userId);
        formData.append("workout_id", addToExistingWorkout ? selectedWorkoutId : "");
        formData.append("title", title);
        formData.append("description", description);
        formData.append("sets", sets);
        formData.append("reps", reps);
        setImageLoading(true);

        try {
          const response = await dispatch(createExercise(formData));

          if (response && response.errors) {
              setErrors(response.errors);
          } else if (response?.workout_id) {
              history.push(`/workouts/${response?.workout_id}`);
          } else {
            history.push(`/my-exercises`)
          }
        } catch (error) {
            setGeneralError("An error occurred. Please try again later.");
        } finally {
            setImageLoading(false);
        }

        // const payload = {
        //   user_id: userId,
        //   workout_id: addToExistingWorkout ? selectedWorkoutId : "",
        //   title,
        //   description,
        //   sets,
        //   reps,
        //   image_url: imageUrl
        // };

        // const res = await dispatch(createExercise(payload));

        // if (res && res?.errors) {
        //     setErrors(res?.errors);
        // } else if (res?.workout_id) {
        //     history.push(`/workouts/${res?.workout_id}`);
        // } else {
        //     history.push(`/my-exercises`);
        // }

    };

    const handleCheckboxChange = (e) => {
        setAddToExistingWorkout(e.target.checked);
    };

    const handleDropdownChange = (e) => {
        setSelectedWorkoutId(parseInt(e.target.value));
    };


    return (
        <div className="center-form">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Create A New Exercise</h1>

          {generalError && (
              <p className="errors" style={{ color: "red", fontSize: 11 }}>
                  {generalError}
              </p>
          )}

          <label>
            <div className="form-row">
              Title
            </div>
            <input
              className="text-input"
              type="text"
              placeholder="Title"
              value={title}
              onChange={updateTitle}
            />
              {errors.title && (
                  <p className="errors" style={{ color: "red", fontSize: 11 }}>
                      {errors.title}
                  </p>
              )}
          </label>

          <label>
            <div className="form-row">
              Description
            </div>
            <textarea
              className="description-textarea"
              placeholder="Description"
              value={description}
              onChange={updateDescription}
              rows={4} // Adjust the number of rows as needed
            />
            {errors.description && (
              <p className="errors" style={{ color: "red", fontSize: 11 }}>
                {errors.description}
              </p>
            )}
          </label>


          <label>
            <div className="form-row">
              Sets
            </div>
            <select value={sets} onChange={updateSets}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          </label>

          <label>
            <div className="form-row">
              Reps
            </div>
            <select value={reps} onChange={updateReps}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          </label>

            <div className="form-row">
              Exercise Photo
            </div>
            <div className="file-input-container">
              <input
                className="choose-file"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            {errors.image_url && (
              <p className="errors" style={{ color: "red", fontSize: 11 }}>
                {errors.image_url}
              </p>
            )}

          <div className='no-pad' style={{ display: 'flex', alignItems: 'center' }}>
          <label className="checkbox">
          <div className="form-row">Add to existing workout?</div>
          <input
            type="checkbox"
            checked={addToExistingWorkout}
            onChange={handleCheckboxChange}
          />
        </label>
        </div>

        {addToExistingWorkout && (
          <label>
            <div className="form-row">Select Workout</div>
            <select value={selectedWorkoutId} onChange={handleDropdownChange}>
              <option value={null}>Select a workout</option>
              {myWorkouts.map((workout) => (
                <option key={workout?.id} value={workout?.id}>
                  {workout?.title}
                </option>
              ))}
            </select>
          </label>
        )}



          <button
            className="submit"
            type="submit"
          >
            Create Exercise
          </button>
          {(imageLoading)&& <p>Loading...</p>}
          <button
            onClick={() => handleCancelButton()}
          >
            Cancel
          </button>
        </form>
      </div>
    )

}

export default CreateExerciseForm;
