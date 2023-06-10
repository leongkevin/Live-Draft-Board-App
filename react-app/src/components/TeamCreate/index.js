import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createTeamAction } from '../../store/team';
import { useModal } from '../../context/Modal';

function TeamCreate(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { closeModal } = useModal();

	const [name, setName] = useState('');
	const [errors, setErrors] = useState([]);

	const sessionUser = useSelector((state) => state.session?.user);

	console.log(props)

	const handleCreateTeam = async (e) => {
		e.preventDefault();
		setErrors([]);

		try {
			const team = await dispatch(
				createTeamAction({
					name: name,
					league_id: props.league.id,
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
				<form className="team-form" onSubmit={handleCreateTeam}>
					{errors.length ? <h3>Errors</h3> : ''}
					<div className="errors">
						{errors.map((error, idx) => (
							<li key={idx}>{errors}</li>
						))}
					</div>

					<button
						className="team-form-button"
						type="submit"
						disabled={errors.length ? true : false}
					>
						<h2>Join League</h2>
					</button>
				</form>
			</div>
		</>
	);
}
export default TeamCreate;
