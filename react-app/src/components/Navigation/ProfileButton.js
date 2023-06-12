import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import LeagueCreateButton from '../LeagueCreateButton';

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	};

	const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');
	const closeMenu = () => setShowMenu(false);

	return (
		<>
			<button onClick={openMenu} className="nav-bar-button">
				{/* {user ? (
					<img
						alt="profile"
						className="small-profile-pic"
						src={user.profile_picture}
					/>
				) : ( */}

				<i className="fas fa-user-circle fa-lg" />

				{/* )} */}
			</button>
			<ul className={ulClassName} ref={ulRef}>
        <div className="user-action-dropdown">
				{user ? (
					<>
						<div>{user.username}</div>
						<div>{user.email}</div>
						<div onClick={handleLogout}>Log Out</div>
					</>
				) : (
					<>
						<OpenModalButton
							buttonText="Log In"
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/><p/>

						<OpenModalButton
							buttonText="Sign Up"
							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/><p/>
						<LeagueCreateButton /><p/>
					</>
				)}
        </div>
			</ul>
		</>
	);
}

export default ProfileButton;
