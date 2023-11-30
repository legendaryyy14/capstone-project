import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { getExerciseByIdThunk, editExercise } from "../../store/exercises"
import { getWorkoutByIdThunk } from "../../store/workouts";
import { getAllWorkoutsThunk } from "../../store/workouts";

function UpdateExerciseForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state.session.user.id);
    const { exerciseId } = useParams();
    const exercise = useSelector((state) => state.exercises[exerciseId])
    const workout = useSelector((state) => state.workouts[exercise?.workout_id])
    const workoutObj = useSelector((state) => state.workouts);
    const myWorkouts = Object.values(workoutObj).filter(workout => workout?.user_id === userId)

    const [addToExistingWorkout, setAddToExistingWorkout] = useState(false);
    const [selectedWorkoutId, setSelectedWorkoutId] = useState(exercise?.workout_id);
    const [title, setTitle] = useState(exercise?.title);
    const [description, setDescription] = useState(exercise?.description);
    const [sets, setSets ] = useState(exercise?.sets);
    const [reps, setReps ] = useState(exercise?.reps);
    const [image, setImage] = useState(exercise?.image_url);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateSets = (e) => setSets(e.target.value)
    const updateReps = (e) => setReps(e.target.value)

    useEffect(() => {
        dispatch(getWorkoutByIdThunk(exercise?.workout_id));
        dispatch(getExerciseByIdThunk(exerciseId));
        dispatch(getAllWorkoutsThunk())
    }, [dispatch, exerciseId, exercise?.workout_id]);
    useEffect(() => {
      setImage(exercise?.image_url || "");
    }, [setImage, exercise]);

    const handleCancelButton = () => {
        history.goBack();
      };

    const getWorkoutTitle = () => {

        if (workout) {
          return (
            <NavLink className='workout-nav-link' to={`/workouts/${workout?.id}`}>
              {workout?.title}
            </NavLink>
          );
        }

    };

    const handleCheckboxChange = (e) => {
        setAddToExistingWorkout(e.target.checked);
    };

    const handleDropdownChange = (e) => {
        setSelectedWorkoutId(parseInt(e.target.value));
    };

    const handleRemoveButton = async (e) => {
      try {
        const formData = new FormData();
        formData.append("id", exerciseId);
        formData.append("workout_id", "");
        formData.append("user_id", userId);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("sets", sets);
        formData.append("reps", reps);
        formData.append("image_url", image);

        const response = await dispatch(editExercise(formData));

        if (response && response?.errors) {
          const parsedErrors = {};
          response?.errors.forEach((error) => {
            const [field, message] = error.split(' : ');
            parsedErrors[field.trim()] = message.trim();
          });

          setErrors(parsedErrors);
        } else if (response?.workout_id) {
          history.push(`/workouts/${response?.workout_id}`);
        } else {
          history.push(`/my-exercises`);
        }
      } catch (error) {
        setGeneralError("An error occurred. Please try again later.");
      } finally {
        setImageLoading(false);
      }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setGeneralError("")
        const normalizedWorkoutId = selectedWorkoutId !== null ? selectedWorkoutId : "";
        const formData = new FormData();
        formData.append("id", exerciseId);
        formData.append("workout_id", normalizedWorkoutId);
        formData.append("user_id", userId);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("sets", sets);
        formData.append("reps", reps);
        formData.append("image_url", image);
        setImageLoading(true);
        // console.log("Form Data Content:", Array.from(formData.entries()));


        try {
          const response = await dispatch(editExercise(formData));
          if (response && response?.errors) {
            const parsedErrors = {};
            response?.errors.forEach((error) => {
              const [field, message] = error.split(' : ');
              parsedErrors[field.trim()] = message.trim();
            });

            setErrors(parsedErrors);
            // console.log("Setting Errors:", errors);

          } else if (response?.workout_id) {
                history.push(`/workouts/${response?.workout_id}`);
            } else {
                history.push(`/my-exercises`);
            }
        } catch (error) {
            setGeneralError("An error occurred. Please try again later.");
        } finally {
            setImageLoading(false);
        }
        // const payload = {
        //     id: exercise?.id,
        //     workout_id: normalizedWorkoutId,
        //     user_id: userId,
        //     title,
        //     description,
        //     sets,
        //     reps,
        //     image_url: imageUrl
        // };
        // const res = await dispatch(editExercise(payload));

        // if (res && res?.errors) {
        //     setErrors(res?.errors);
        // } else if (res?.workout_id) {
        //     history.push(`/workouts/${res?.workout_id}`);
        // } else {
        //     history.push(`/my-exercises`);
        // }

    };

    return (
        <div className="center-form">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Update {`${exercise?.title}`} Exercise</h1>

            {
                exercise?.workout_id ? (
                    <p>Included in: {getWorkoutTitle()}</p>
                ) : (
                    <p>Included in: None</p>
                )
            }

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
          </label>
            {errors.title && (
              <p className="errors" style={{ color: "red", fontSize: 11 }}>
                  {errors.title}
              </p>
            )}

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
          </label>
            {errors.description && (
              <p className="errors" style={{ color: "red", fontSize: 11 }}>
                  {errors.description}
              </p>
            )}

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
          {errors.sets && (
                    <p className="errors" style={{ color: "red", fontSize: 11 }}>
                        {errors.sets}
                    </p>
                )}           </label>

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
          {errors.reps && (
                    <p className="errors" style={{ color: "red", fontSize: 11 }}>
                        {errors.reps}
                    </p>
                )}

                </label>

          <label>

          <div className="form-row" >
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
          </label>

            {
                !exercise?.workout_id ? (
                  <label>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
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
                            <option key={workout.id} value={workout.id}>
                            {workout.title}
                            </option>
                        ))}
                        </select>
                    </label>
                    )}
                  </label>
                ) : (
                  <label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label className="checkbox">
                      <div className="form-row">Move to different workout?</div>
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
                        {myWorkouts
                          .filter((workout) => workout.id !== exercise?.workout_id)
                          .map((workout) => (
                            <option key={workout.id} value={workout.id}>
                              {workout.title}
                            </option>
                          ))}
                      </select>
                    </label>
                  )}
                </label>
                )
            }




          <button
            type="submit"
          >
            Update Exercise
          </button>
          {(imageLoading)&& <p>Loading...</p>}

          <button
            onClick={() => handleCancelButton()}
          >
            Cancel
          </button>

          {exercise?.workout_id && (
          <button
          onClick={() => handleRemoveButton()}
          style={{ color: 'red' }}
        >
          Remove exercise from current workout
        </button>
                  )}
        </form>
      </div>
    )

}

export default UpdateExerciseForm;
