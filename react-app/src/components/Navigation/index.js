import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

	const handleAllWorkoutsButton = () => {
		history.push(`/workouts`);
	}
	const handleMyWorkoutsButton = () => {
		history.push(`/my-workouts`);
	}
	const handleMyExercisesButton = () => {
		history.push(`/my-exercises`);
	}
	// const handleLikedWorkoutsButton = () => {
	// 	history.push(`/liked`);
	// }

	return (
		<div>
		<div className='navigation-container'>
			{/* <div className='space-filler'></div> */}


			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}

			<NavLink to="/">
				<img src="/FLEXY.png" alt="Home" className="home-logo" />
			</NavLink>

			<div className="search">
				<form action="#">
				<input type="text"
				placeholder=" Search Workouts"
				name="search"/>
				<button>
				<i className="fa fa-search">
				</i>
				</button>
				</form>
			</div>

		</div>
		<div className='nav-menu'>
		<button
            onClick={() => handleAllWorkoutsButton()}
          >
            All Workouts
          </button>
		  {/* <button
            onClick={() => handleLikedWorkoutsButton()}
          >
            Liked Workouts
          </button> */}
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
