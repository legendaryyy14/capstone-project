import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
	const dispatch = useDispatch();

	const handleAllWorkoutsButton = () => {
		history.push(`/workouts`);
	}
	const handleMyWorkoutsButton = () => {
		history.push(`/my-workouts`);
	}
	const handleMyExercisesButton = () => {
		history.push(`/my-exercises`);
	}
	const handleLikedWorkoutsButton = () => {
		history.push(`/faves/${sessionUser.id}`);
	}

	// const handleSearchChange = (e) => {
	// 	dispatch(setSearchQueryThunk(e.target.value));
	// 	// ... any additional logic you need
	//   };

	return (
		<div>
		<div className='navigation-container'>
		<div></div>
			<NavLink to="/">
				<img src="/FLEXY.png" alt="Home" className="home-logo" />
			</NavLink>


			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}

			{/* <div className="search">
				<form id="workoutSearchForm">
				<input
				type="text"
				placeholder="Search Workouts"
				name="search"
				id="searchInput"
				onChange={handleSearchChange}
				/>
				<button>
				<i className="fa fa-search">
				</i>
				</button>
				</form>
			</div> */}

		</div>

		<div className='nav-menu'>
		<button
            onClick={() => handleAllWorkoutsButton()}
          >
            All Workouts
          </button>
		  <button
            onClick={() => handleLikedWorkoutsButton()}
          >
            Liked Workouts
          </button>
		  <button
            onClick={() => handleMyWorkoutsButton()}
          >
            My Workouts
          </button>
		  <button
            onClick={() => handleMyExercisesButton()}
          >
            My Exercises
          </button>
		</div>

		</div>
	);
}

export default Navigation;
