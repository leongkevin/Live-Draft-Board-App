import React, { useState, useEffect } from 'react';
// import { getTeam } from '../../store/team';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import './TeamsPage.css';

import { getTeams } from '../../store/team';

function TeamPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	// const teamObject = useSelector((state) => state.teamReducer);
	// const teamArray = Object.values(teamObject);

	const { team_id } = useParams();

	const teamsObject = useSelector((state) => state.teamReducer);
	const teamsArray = Object.values(teamsObject);

	console.log(teamsObject);

	useEffect(() => {
		dispatch(getTeams(teamsArray));
	}, [dispatch]);
	return (
		<>
			<p />
			Team
			{teamsArray?.map((team) => {
				// console.log(`this is line 39: ${team_id}`)
				if (parseInt(sessionUser?.id) === team.user_id) {
					return (
						<div key={team.id} className="team-divider">
							Team {team.id}
							<br />
							<span>{team.name} </span>
							<span>(#{team.id}) </span>
							<br />
						</div>
					);
				} else {
					return (
						<div key={team.id} className="team-divider">
							<div>You do not have access to edit this team</div>
							Team {team.id}
							<br />
							<span>{team.name} </span>
							<span>(#{team.id}) </span>
							<br />
						</div>
					);
				}
			})}
		</>
	);
}

export default TeamPage;
