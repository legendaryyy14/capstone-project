import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { removeWorkout } from '../../store/workouts';

function DeleteWorkoutModal({ workoutId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal()

  const handleDeleteClick = () => {
    dispatch(removeWorkout(workoutId));
    closeModal();
    history.push("/my-workouts")
  };

  const handleClick = () => {
    closeModal();
  };

  return (
    <div>
      <div>Confirm delete</div>
      <div>Are you sure you want to remove this workout?</div>
      <button onClick={handleDeleteClick}>Yes (Delete Workout)</button>
      <button onClick={handleClick}>No (Keep Workout)</button>
    </div>
  )
}

export default DeleteWorkoutModal;
