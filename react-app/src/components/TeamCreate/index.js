import React, { useEffect, useState } from 'react';
import { getLeagues } from '../../store/league';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createTeamAction, getTeam } from '../../store/team';
import { useModal } from '../../context/Modal';

function TeamCreate(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { closeModal } = useModal();

	const [name, setName] = useState('');
	const [errors, setErrors] = useState([]);

	const sessionUser = useSelector((state) => state.session?.user);

	const leagueObject = useSelector((state) => state.leagueReducer);
	const leagueArray = Object.values(leagueObject);

	const teamObject = useSelector((state) => state.teamReducer);
	const teamArray = Object.values(teamObject);

	// console.log(teamObject)
	// console.log(props)

	// console.log(leagueArray[3-1]?.admin_id)
	// console.log(teamArray)
	// let joined;
	// {
	// 	teamArray?.map((team) => {
	// 		if (
	// 			parseInt(team.league_id) === parseInt(props.league.id) &&
	// 			parseInt(team.user_id) === parseInt(sessionUser?.id)
	// 		) {
	// 			joined = true;
	// 		}
	// 		// console.log((parseInt(team.league_id) === parseInt(props.league.id)) && parseInt(team.user_id) === parseInt(sessionUser?.id))
	// 		// console.log(parseInt(team.league_id))
	// 		// console.log(parseInt(props.league.id))
	// 		// console.log(parseInt(team.user_id))
	// 		// console.log(parseInt(sessionUser?.id))
	// 	});
	// }

	useEffect(() => {
		dispatch(getLeagues(leagueArray));
	}, [dispatch]);

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
			history.push(`/leagues/${props.league.id}`);
		} catch (errors) {
			alert(errors);
		}
	};
	return (
		<>
			<div className="team">
				<form className="team-form" onSubmit={handleCreateTeam}>
					{/* {errors.length ? <h3>Errors</h3> : ''}
					<div className="errors">
						{errors.map((error, idx) => (
							<li key={idx}>{errors}</li>
						))}
					</div> */}

					<button
						className="team-form-button"
						type="submit"
						disabled={errors.length ? true : false}
					>
						Join League
					</button>
				</form>
			</div>
		</>
	);
}
export default TeamCreate;
