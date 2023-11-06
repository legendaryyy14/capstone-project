import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { getExerciseByIdThunk } from '../../store/exercises';

function DeleteWorkoutModal({ exerciseId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal()
  const exercise = useSelector((state) => state.exercises[exerciseId])


  const handleDeleteClick = () => {
    dispatch(getExerciseByIdThunk(exerciseId));
    closeModal();
    history.push("/my-workouts")
  };

  const handleClick = () => {
    closeModal();
  };

  return (
    <div>
      <h2>{`${exercise.title} walk-thro`}</h2>
      <p>{`${exercise.description}`}</p>
    </div>
  )
}

export default DeleteWorkoutModal;
