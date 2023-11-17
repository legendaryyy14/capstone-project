import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {  createWorkout } from "../../store/workouts";


function CreateWorkoutForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state.session.user.id);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");


    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    // const updateImageUrl = (e) => setImageUrl(e.target.value);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setGeneralError("");

        const formData = new FormData();
        formData.append("image_url", image);
        formData.append("user_id", userId);
        formData.append("title", title);
        formData.append("public", isPublic);
        formData.append("description", description);
        setImageLoading(true);

        try {
          const response = await dispatch(createWorkout(formData));

          if (response && response.errors) {
              setErrors(response.errors);
          } else {
              history.push(`/workouts/${response?.id}`);
          }
        } catch (error) {
            setGeneralError("An error occurred. Please try again later.");
        } finally {
            setImageLoading(false);
        }

        // history.push(`/workouts/${formData?.id}`);


        // const payload = {
        //   user_id: userId,
        //   title,
        //   description,
        //   public: isPublic,
        //   image_url: imageUrl
        // };

        // const res = await dispatch(createWorkout(payload));

        // if (res && res.errors) {
        //     setErrors(res.errors);
        //   } else {
        //     history.push(`/workouts/${res?.id}`);
        //   };

    };

    const handleCheckboxChange = () => {
    setIsPublic(!isPublic); // Toggle the checkbox state when it's clicked
    }

    const handleCancelButton = () => {
      history.goBack();
    };

    return (
        <div>
        <form className="form" encType="multipart/form-data" onSubmit={handleSubmit}>
          <h1>Create A New Workout</h1>

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
                  )}
          </label>

          <label>
            <div className="form-row">
              Workout Photo
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
                  {errors.image_url && (
                      <p className="errors" style={{ color: "red", fontSize: 11 }}>
                          {errors.image_url}
                      </p>
                  )}
          </label>

          <label>
            <div className="form-row">
              Public: Do you want this workout to be seen by all users?
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
            Create Workout
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

export default CreateWorkoutForm;
