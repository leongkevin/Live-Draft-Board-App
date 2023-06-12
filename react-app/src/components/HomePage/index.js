import React, { useEffect } from 'react';
import { getLeagues } from '../../store/league';
import { getTeams } from '../../store/team';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './HomePage.css';

import TeamCreate from '../TeamCreate';

function HomePage() {
	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);
	const leagueObject = useSelector((state) => state.leagueReducer);
	const leagueArray = Object.values(leagueObject);

	const teamObject = useSelector((state) => state.teamReducer);
	const teamArray = Object.values(teamObject);

	useEffect(() => {
		dispatch(getLeagues(leagueArray));
		dispatch(getTeams(teamArray));
	}, [dispatch]);

	const dateConverter = (dateString) => {
		let timestamp = Date.parse(dateString);
		let date = new Date(timestamp);

		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];
		let month = date.getMonth();
		let day = date.getDate();
		let year = date.getFullYear();
		let monthByName = months[month];

		let formattedDate = `${monthByName} ${day}, ${year}`;
		return formattedDate;
	};

	return (
		<>
			Explore or Join a League
			{leagueArray?.map((league) => {
				let joined = false;
				return (
					<div key={league.id} className="league-divider">
						<NavLink to={`/leagues/${league.id}`} key={league.id}>
							<span>{league.name} </span>
							<span>(#{league.id}) </span>
							<br />
							<span>Comissoner: user {league.admin_id} </span>
							<br />
							<span>{dateConverter(league.created_at)}</span>
							<p />
						</NavLink>

						{teamArray?.map((team) => {
							if (
								team.league_id === league.id &&
								parseInt(team.user_id) !==
									parseInt(sessionUser.id)
							) {
								console.log(
									parseInt(team.user_id) ===
										parseInt(sessionUser.id)
								);
								if (
									parseInt(team.user_id) !==
									parseInt(sessionUser.id)
								) {
									joined = true;
								}
							}
						})}
						{joined ? (
							<div className="joined-tag">Already Joined</div>
						) : (
							<TeamCreate league={league} />
						)}
					</div>
				);
			})}
		</>
	);
}

export default HomePage;
