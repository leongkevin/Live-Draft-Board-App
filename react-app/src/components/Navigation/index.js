import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LeagueCreateButton from '../LeagueCreateButton';


function Navigation({ isLoaded }, { user }) {
	const sessionUser = useSelector((state) => state.session.user);


	console.log(user)
	return (
		<div className="nav-bar">
			<div className="nav-bar-item">
				<NavLink exact to="/">
					<button className="nav-bar-button">Home</button>
				</NavLink>
			</div>
			{sessionUser ?<div className="nav-bar-item">
				<NavLink exact to="/leagues">
					<button className="nav-bar-button">My Leagues</button>
				</NavLink>
			</div>:<></>}
			<div className="nav-bar-item">
				{isLoaded && <ProfileButton user={sessionUser} />}
			</div>
			{sessionUser ?<div className="nav-bar-item">
				<LeagueCreateButton />
			</div>:<></>}
		</div>
	);
}

export default Navigation;
