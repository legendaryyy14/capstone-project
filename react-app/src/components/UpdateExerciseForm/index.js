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
    const [imageUrl, setImageUrl] = useState(exercise?.image_url);
    const [errors, setErrors] = useState({});

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateSets = (e) => setSets(e.target.value)
    const updateReps = (e) => setReps(e.target.value)
    const updateImageUrl = (e) => setImageUrl(e.target.value);

    useEffect(() => {
        dispatch(getWorkoutByIdThunk(exercise?.workout_id));
        dispatch(getExerciseByIdThunk(exerciseId));
        dispatch(getAllWorkoutsThunk())
    }, [dispatch, exerciseId, exercise?.workout_id]);


    const handleCancelButton = () => {
        history.goBack();
      };

    const getWorkoutTitle = (exerciseWorkoutId) => {

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const payload = {
            id: exercise?.id,
            workout_id: selectedWorkoutId,
            user_id: userId,
            title,
            description,
            sets,
            reps,
            image_url: imageUrl
        };
        const res = await dispatch(editExercise(payload));

        if (res && res?.errors) {
            setErrors(res?.errors);
        } else if (res?.workout_id) {
            history.push(`/workouts/${res?.workout_id}`);
        } else {
            history.push(`/my-exercises`);
        }

    };

    return (
        <div>
        <form className="form" onSubmit={handleSubmit}>
          <h1>Update {`${exercise?.title}`} Exercise</h1>

            {
                exercise?.workout_id ? (
                    <p>Included in: {getWorkoutTitle(exercise?.workout_id)}</p>
                ) : (
                    <p>Included in: None</p>
                )
            }

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
            <select value={sets} onChange={updateSets}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
            <p className="errors" style={{color:"red", fontSize:11}}>{errors.sets}</p>
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

            {
                !exercise?.workout_id && (
                    <label>
                    <div className="form-row">Add to existing workout?</div>
                    <input
                        type="checkbox"
                        checked={addToExistingWorkout}
                        onChange={handleCheckboxChange}
                    />
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
                )
            }


          <button
            type="submit"
            disabled={ !description || !imageUrl}
          >
            Update Exercise
          </button>

          <button
            onClick={() => handleCancelButton()}
          >
            Cancel
          </button>
        </form>
      </div>
    )

}

export default UpdateExerciseForm;
