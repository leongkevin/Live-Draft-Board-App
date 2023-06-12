import React, { useState, useEffect, useRef } from 'react';
import { login } from '../../store/session';
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
	const [email, setEmail] = useState('demo@aa.io');
	const [password, setPassword] = useState('password');
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

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
							<div>Welcome {user.username}</div>
							<hr className='profile-hr'/>
							<div onClick={handleLogout}>Log Out</div>
						</>
					) : (
						<>
							<OpenModalButton
								buttonText="Log In"
								onItemClick={closeMenu}
								modalComponent={<LoginFormModal />}
							/>
							<br />

							<OpenModalButton
								buttonText="Sign Up"
								onItemClick={closeMenu}
      					modalComponent={<SignupFormModal />}
							/>
							<hr className='profile-hr'/>

							<button
								className="dropdown-button"
								onClick={handleSubmit}
							>
								Demo User
							</button>
							{/* <LeagueCreateButton /><p/> */}
						</>
					)}
				</div>
			</ul>
		</>
	);
}

export default ProfileButton;
