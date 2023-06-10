import React, { useState, useEffect } from 'react';
import { getTeam, deleteTeamAction, updateTeamAction } from '../../store/team';
import { getPlayers } from '../../store/player';
import { getDraft } from '../../store/draft';
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

	const draftsObject = useSelector((state) => state.draftReducer);
	const draftsArray = Object.values(draftsObject);

	const { team_id } = useParams();
	// console.log(draftsArray)
	// console.log(teamArray)
	// console.log(playerObject)

	useEffect(() => {
		dispatch(getTeam(team_id));
		dispatch(getPlayers(playersArray));
		dispatch(getDraft(draftsArray));
	}, [dispatch]);

	const handleDeleteTeam = async (e) => {
		e.preventDefault();

		dispatch(deleteTeamAction(team_id));
		// .then(history.push('/leagues'));
	};

	const handleUpdateTeam = async (e) => {
		e.preventDefault();

		dispatch(updateTeamAction(team_id));
		// .then(history.push('/leagues'));
	};

	return (
		<>
			{teamArray?.map((team) => {
				// console.log(`this is line 39: ${team_id}`)
				if (
					parseInt(sessionUser?.id) === team.user_id &&
					parseInt(team_id) === team.id
				) {
					return (
						<>
							<div key={team.id} className="team-divider">
								Team {team.id}
								<br />
								<span>{team.name} </span>
								<span>(#{team.id}) </span>
								<br />
							</div>

							<button
								className="team-divider"
								onClick={handleDeleteTeam}
							>
								Delete Team
							</button>
							<button
								className="team-divider"
								onClick={handleUpdateTeam}
							>
								Update Team
							</button>
						</>
					);
				}
			})}
			{draftsArray?.map((draft) => {
				if (draft.team_id === parseInt(team_id)) {
					return (
						<div key={draft.id} className="draft-divider">
							<span>{draft.id}. </span>
							{playersArray?.map((player) => {
								if (player.id === draft.player_id) {
									return (
										<div
											key={player.id}
											className="player-divider"
										>
											<NavLink
												to={{
													pathname: `https://${player.stats}`,
												}}
												target="_blank"
											>
												<span>{player.full_name} </span>
												<br />
												<img
													src={player.profile_image}
													className="player-divider"
												/>
											</NavLink>
										</div>
									);
								}
							})}
						</div>
					);
				}
			})}
		</>
	);
}

export default TeamPage;
