import React, { useState, useEffect } from 'react';
import { getTeam } from '../../store/team';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import './TeamPage.css';



function TeamPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const teamObject = useSelector((state) => state.teamReducer);
	const teamArray = Object.values(teamObject);

	const { team_id } = useParams();

	console.log(teamArray)

	useEffect(() => {
		dispatch(getTeam(team_id));
	}, [dispatch]);

	return (
		<>
			{teamArray?.map((team) => {
				// console.log(`this is line 39: ${team_id}`)
				if (parseInt(sessionUser?.id) === team.user_id && parseInt(team_id) === team.id) {
					return (
						<div key={team.id} className="team-divider">
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
