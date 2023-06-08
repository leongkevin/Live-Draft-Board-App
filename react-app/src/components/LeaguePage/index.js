import React, { useState, useEffect } from 'react';
import { getLeagues } from '../../store/league';
import { getTeams } from '../../store/team';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import './LeaguePage.css';

import OpenModalButton from '../OpenModalButton';
import LeagueUpdateModal from '../LeagueUpdateModal';

function LeaguePage() {
	const dispatch = useDispatch();
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
							<OpenModalButton
								buttonText={league.name}
								modalComponent={
									<LeagueUpdateModal league={league} />
								}
							/>
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
			<NavLink to={`/leagues/${league_id}/drafts`} key={league_id}>
				<button>Enter Draft</button>
			</NavLink>
		</>
	);
}

export default LeaguePage;
