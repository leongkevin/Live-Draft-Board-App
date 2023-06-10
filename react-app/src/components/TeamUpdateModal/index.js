import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { updateTeamAction } from '../../store/team';
import { useModal } from '../../context/Modal';

function TeamUpdateModal(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { closeModal } = useModal();

	const [name, setName] = useState('');
	const [userId, setUserId] = useState(0);
	const [leagueId, setLeagueId] = useState(0);
	const [errors, setErrors] = useState([]);

	const sessionUser = useSelector((state) => state.session?.user);

	const handleUpdateTeam = async (e) => {
		e.preventDefault();
		setErrors([]);

		try {
			const team = await dispatch(
				updateTeamAction({
					id: props.team.id,
					name: name,
				})
			);
			closeModal();
		} catch (errors) {
			alert(errors);
		}
	};
	return (
		<>
			<div className="team">
				<h2>Update Team Name</h2>

				<form className="team-form" onSubmit={handleUpdateTeam}>
					{errors.length ? <h3>Errors</h3> : ''}
					<div className="errors">
						{errors.map((error, idx) => (
							<li key={idx}>{errors}</li>
						))}
					</div>

					<label className="team-form">Name: </label>
					<input
						className="team-form-input"
						type="text"
						placeholder="Name"
						onChange={(e) => setName(e.target.value)}
						required
					/>

					<button
						className="team-form-button"
						type="submit"
						disabled={errors.length ? true : false}
					>
						Update
					</button>
				</form>
			</div>
		</>
	);
}
export default TeamUpdateModal;
