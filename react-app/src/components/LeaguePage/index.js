import React, { useState, useEffect } from 'react';
import { getLeagues, deleteLeagueAction } from '../../store/league';
import { getTeams } from '../../store/team';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import './LeaguePage.css';

import OpenModalButton from '../OpenModalButton';
import LeagueUpdateModal from '../LeagueUpdateModal';

function LeaguePage() {
	const dispatch = useDispatch();
	const history = useHistory();

	const sessionUser = useSelector((state) => state.session.user);
	const leagueObject = useSelector((state) => state.leagueReducer);
	const leagueArray = Object.values(leagueObject);

	const teamObject = useSelector((state) => state.teamReducer);
	const teamArray = Object.values(teamObject);

	// console.log(teamObject)

	const { league_id } = useParams();

	useEffect(() => {
		dispatch(getLeagues(leagueArray));
		dispatch(getTeams(teamArray));
	}, [dispatch]);

	const handleDeleteLeague = async (e) => {
		// e.preventDefault(); //not required with confirm button
		dispatch(deleteLeagueAction(league_id)).then(history.push('/leagues'));
	};

	return (
		<>
			{leagueArray?.map((league) => {
				// console.log(`this is line 29: ${league_id}`)
				if (
					parseInt(sessionUser?.id) === league.admin_id &&
					league.id === parseInt(league_id)
				) {
					return (
						<div key={league.id} className="league-divider">
							{league.name}
							<p />
							Commissioner tools:
							<OpenModalButton
								buttonText="Edit Name"
								modalComponent={
									<LeagueUpdateModal league={league} />
								}
							/>
							{/* <button
								className="league-divider"
								onClick={() => {
									if (
										window.confirm(
											'Are you sure you wish to delete this item?'
										)
									)
										this.onCancel(handleDeleteLeague);
								}}
								// />
							>
								Delete League
							</button> */}
							<button
								className="delete button"
								onClick={() => {
									const confirmBox = window.confirm(
										'Are you sure you wish to delete this league?'
									);
									if (confirmBox === true) {
										handleDeleteLeague()
									}
								}}
							>Delete League</button>
						</div>
					);
				}
			})}

			{teamArray?.map((team) => {
				// console.log(`this is line 39: ${team_id}`)
				if (parseInt(league_id) === team.league_id) {
					return (
						<NavLink to={`/teams/${team.id}`} key={team.id}>
							<div key={team.id} className="team-divider">
								Team {team.id}
								<br />
								<span>{team.name} </span>
								<span>(#{team.id}) </span>
								<br />
							</div>
						</NavLink>
					);
				}
			})}
			{/* <NavLink to={`/leagues/${league_id}/drafts`} key={league_id}>
				<button>Enter Draft</button>
			</NavLink> */}
		</>
	);
}

export default LeaguePage;
