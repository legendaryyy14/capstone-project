import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editWorkout } from "../../store/workouts";

function UpdateWorkoutForm() {
    const dispatch = useDispatch();
    const history = useHistory()
    const userId = useSelector((state) => state.session.user.id);
    const { workoutId } = useParams();
    const workout = useSelector((state) => state.workouts[workoutId])

    const [title, setTitle] = useState(workout?.title);
    const [description, setDescription] = useState(workout?.description);
    const [isPublic, setIsPublic] = useState(workout?.public);
    const [imageUrl, setImageUrl] = useState(workout?.image_url);
    const [errors, setErrors] = useState({});

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateImageUrl = (e) => setImageUrl(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const payload = {
          id: workout?.id,
          user_id: userId,
          title,
          description,
          public: isPublic,
          image_url: imageUrl
        };

        const res = await dispatch(editWorkout(payload));

        if (res && res?.errors) {
            setErrors(res?.errors);
          } else {
            history.push(`/workouts/${workout?.id}`);
          };

    };
    useEffect(() => {
        console.log("Checkbox state changed:", isPublic);
        // Perform actions that depend on the updated isPublic state here
      }, [isPublic]);

    const handleCheckboxChange = () => {
    setIsPublic(!isPublic);
     // Toggle the checkbox state when it's clicked
    }

    const handleCancelButton = () => {
      history.goBack();
    };


    return (
<div>
        <form className="form" onSubmit={handleSubmit}>
          <h1>Update {`${workout?.title}`}</h1>

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
              Workout Photo
            </div>
            <input
              type="text"
              placeholder="Workout Photo URL"
              value={imageUrl}
              onChange={updateImageUrl}
            />
              <p className="errors" style={{color:"red", fontSize:11}}>{errors.image_url}</p>
          </label>

          <label>
            <div className="form-row">
              Public?
            </div>
            <input
              type="checkbox"
              placeholder=""
              checked={isPublic}
              onChange={handleCheckboxChange}
            />
          </label>

          <button
            type="submit"
            disabled={ !description || !imageUrl}
          >
            Update Workout
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

export default UpdateWorkoutForm
