import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

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
		</div>
		<div className='nav-menu'>
			<NavLink to="/workouts">
				All Workouts
			</NavLink>
			<NavLink to="/workouts/liked">
				Liked Workouts
			</NavLink>
			<NavLink to="/my-workouts">
				My Workouts
			</NavLink>
			<NavLink to="/my-exercises">
				My Exercises
			</NavLink>
		</div>

		</div>
	);
}

export default Navigation;
