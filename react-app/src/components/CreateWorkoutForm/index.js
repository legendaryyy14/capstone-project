import React, { useEffect, useState } from "react";
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
    const [imageUrl, setImageUrl] = useState("");
    const [errors, setErrors] = useState({});

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateImageUrl = (e) => setImageUrl(e.target.value);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const payload = {
          user_id: userId,
          title,
          description,
          public: isPublic,
          image_url: imageUrl
        };

        const res = await dispatch(createWorkout(payload));

        if (res && res.errors) {
            setErrors(res.errors);
          } else {
            history.push(`/workouts/${res?.id}`);
          };

    };

    const handleCheckboxChange = () => {
    setIsPublic(!isPublic); // Toggle the checkbox state when it's clicked
    }

    return (
        <div>
        <form className="form" onSubmit={handleSubmit}>
          <h1>Create A New Workout</h1>

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
            Create Workout
          </button>
        </form>
      </div>
    )

}

export default CreateWorkoutForm;
