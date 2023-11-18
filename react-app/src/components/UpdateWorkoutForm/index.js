import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getWorkoutByIdThunk, editWorkout } from "../../store/workouts";

function UpdateWorkoutForm() {
    const dispatch = useDispatch();
    const history = useHistory()
    const userId = useSelector((state) => state.session.user.id);
    const { workoutId } = useParams();
    const workout = useSelector((state) => state.workouts[workoutId])

    const [title, setTitle] = useState(workout?.title || "");
    const [description, setDescription] = useState(workout?.description || "");
    const [isPublic, setIsPublic] = useState(workout?.public || false);
    const [image, setImage] = useState(workout?.image_url);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    // const updateImageUrl = (e) => setImageUrl(e.target.value);

    useEffect(() => {
      // Set the initial value when the workout changes
      setImage(workout?.image_url || "");
    }, [setImage, workout]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setGeneralError("");

        const formData = new FormData();
        formData.append("id", workoutId);
        formData.append("user_id", userId);
        formData.append("title", title);
        formData.append("public", isPublic);
        formData.append("description", description);
        // Check if a new image has been selected
        if (e.target.files?.[0]) {
          formData.append("image_url", e.target.files[0]);
        }
        setImageLoading(true);
        console.log("Form Data Content:", Array.from(formData.entries()));



        try {
          const response = await dispatch(editWorkout(formData));
          if (response && response?.errors) {
              setErrors(response?.errors);
          } else {
              history.push(`/workouts/${workoutId}`);
          }
        } catch (error) {
            setGeneralError("An error occurred. Please try again later.");
        } finally {
            setImageLoading(false);
        }



        // const payload = {
        //   id: workout?.id,
        //   user_id: userId,
        //   title,
        //   description,
        //   public: isPublic,
        //   image_url: imageUrl
        // };

        // const res = await dispatch(editWorkout(payload));

        // if (res && res?.errors) {
        //     setErrors(res?.errors);
        //   } else {
        //     history.push(`/workouts/${workout?.id}`);
        //   };

    };


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
            {generalError && (
              <p className="errors" style={{ color: "red", fontSize: 11 }}>
                  {generalError}
              </p>
            )}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={updateTitle}
            />
              {errors.title && (
                  <p className="errors" style={{ color: "red", fontSize: 11 }}>
                      {errors.title}
                  </p>
              )}          </label>

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
                {errors.description && (
                    <p className="errors" style={{ color: "red", fontSize: 11 }}>
                        {errors.description}
                    </p>
                )}          </label>

          <label>
            <div className="form-row">
              Workout Photo
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0])}
            />
                  {/* {errors.image_url && (
                      <p className="errors" style={{ color: "red", fontSize: 11 }}>
                          {errors.image_url}
                      </p>
                  )} */}
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
          >
            Update Workout
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

export default UpdateWorkoutForm
