import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { removeExercise } from '../../store/exercises';

function DeleteExerciseModal({ exerciseId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal()



  const handleDeleteClick = () => {
    dispatch(removeExercise(exerciseId));
    closeModal();
    history.push("/my-exercises")
  };

  const handleClick = () => {
    closeModal();
  };


  return (
    <div className='modal'>
      <div>Confirm delete</div>
      <div>Are you sure you want to remove this exercise?</div>
      <button className='delete' onClick={handleDeleteClick} style={{ color: 'red' }}>Delete Exercise Permanently</button>
      <button onClick={handleClick}>No (Keep Exercise)</button>
    </div>
  )
}

export default DeleteExerciseModal;
