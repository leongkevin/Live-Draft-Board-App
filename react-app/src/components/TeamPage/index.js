import React, { useEffect } from 'react';
import { getTeam, deleteTeamAction, updateTeamAction } from '../../store/team';
import { getPlayers } from '../../store/player';
import { getDraft } from '../../store/draft';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import './TeamPage.css';

import OpenModalButton from '../OpenModalButton';
import TeamUpdateModal from '../TeamUpdateModal';

function TeamPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const teamObject = useSelector((state) => state.teamReducer);
	const teamArray = Object.values(teamObject);

	const playersObject = useSelector((state) => state.playerReducer);
	const playersArray = Object.values(playersObject);

	const draftsObject = useSelector((state) => state.draftReducer);
	const draftsArray = Object.values(draftsObject);

	const history = useHistory()
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
		// e.preventDefault(); //not required with confirm button

		dispatch(deleteTeamAction(team_id))
		.then(history.push('/leagues'));
	};

	let isDrafted = false;

	return (
		<>
			{draftsArray?.map((draft) => {
				if (draft.team_id === parseInt(team_id)) {
					isDrafted = true;
					console.log(draft.team_id === parseInt(team_id))
				}
			})}
			{teamArray?.map((team) => {
					console.log(isDrafted)
				if (
					parseInt(sessionUser?.id) === team.user_id &&
					parseInt(team_id) === team.id &&
					isDrafted
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

							<div key={team.id} className="team-divider">
							<OpenModalButton
								buttonText="Update"
								modalComponent={
									<TeamUpdateModal team={team} />
								}
							/>
							</div>
						</>
					);
				} else if (
					parseInt(sessionUser?.id) === team.user_id &&
					parseInt(team_id) === team.id &&
					isDrafted === false
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
							<div>Season has yet to begin</div>
							<button
								className="delete button"
								onClick={() => {
									const prompt = window.confirm(
										'Are you sure you wish to delete this league?'
									);
									if (prompt === true) {
										handleDeleteTeam()
									}
								}}
							>Delete Team</button>


							{/* <button
								className="team-divider"
								onClick={handleDeleteTeam}
							>
								Delete Team
							</button> */}
							<div key={team.id} className="team-divider">
							<OpenModalButton
								buttonText="Update"
								modalComponent={
									<TeamUpdateModal team={team} />
								}
							/>
							</div>
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
