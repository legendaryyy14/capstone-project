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
    <div className='modal'>
      <h2>Confirm delete</h2>
      <div>Are you sure you want to remove this workout?</div>
      <p className='note'>* Exercises will still remain in 'My Exercises'.</p>
      <button style={{ color: 'red' }} onClick={handleDeleteClick}>Yes (Delete Workout)</button>
      <button onClick={handleClick}>No (Keep Workout)</button>
    </div>
  )
}

export default DeleteWorkoutModal;
