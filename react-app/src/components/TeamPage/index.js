import React, { useState, useEffect } from 'react';
import { getTeam } from '../../store/team';
import { getPlayers } from '../../store/player';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import './TeamPage.css';

function TeamPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const teamObject = useSelector((state) => state.teamReducer);
	const teamArray = Object.values(teamObject);

	const playersObject = useSelector((state) => state.playerReducer);
	const playersArray = Object.values(playersObject);

	const { team_id } = useParams();

	// console.log(teamArray)
	// console.log(playerObject)

	useEffect(() => {
		dispatch(getTeam(team_id));
		dispatch(getPlayers(playersArray));
	}, [dispatch]);

	return (
		<>
			{teamArray?.map((team) => {
				// console.log(`this is line 39: ${team_id}`)
				if (
					parseInt(sessionUser?.id) === team.user_id &&
					parseInt(team_id) === team.id
				) {
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

			{playersArray?.map((player) => {
				return (
					<NavLink
						to={{ pathname: `https://${player.stats}` }}
						target="_blank"
					>
						<div key={player.id} className="player-divider">
							<span>{player.full_name} </span>
							<br />
						</div>
					</NavLink>
				);
			})}
		</>
	);
}

export default TeamPage;
