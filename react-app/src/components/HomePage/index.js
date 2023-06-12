import React, { useEffect } from 'react';
import { getLeagues } from '../../store/league';
import { getTeams } from '../../store/team';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketball } from '@fortawesome/free-solid-svg-icons';

import LeagueCreateButton from '../LeagueCreateButton';
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
			<LeagueCreateButton />
			<p />
			<div className="league-divider-title">Explore or Join a League</div>
			{leagueArray?.map((league) => {
				let joined = false;
				const userId = sessionUser?.id;

				return (
					<div key={league.id} className="league-divider">
						<div className="league-divider-column-one">
							<FontAwesomeIcon icon={faBasketball} />
						</div>
						<div className="league-divider-column-two">
							<NavLink
								to={`/leagues/${league.id}`}
								key={league.id}
							>
								<span>{league.name} </span>
								<br />
								{/* <span>{dateConverter(league.created_at)}</span> */}
								{/* <p /> */}
							</NavLink>

							{teamArray?.map((team) => {
								if (
									team.league_id === league.id &&
									parseInt(team.user_id) !==
										parseInt(sessionUser.id)
								) {
									if (
										parseInt(team.user_id) !==
											parseInt(userId)
										// 	&&
										// parseInt(team.league_id) ===
										// 	parseInt(league.id)
									) {

										console.log(team.name)
										console.log(team.user_id)

										joined = true;
									}
									// return (
									// 	<>
									// 		{team.name}<br/>
									// 	</>
									// )
								}
							})}
						</div>
						<div className="league-divider-column-three">
							{joined ? (
								<div className="joined-tag">
									<i class="fa-solid fa-tags" />
									Already Joined
								</div>
							) : (
								<TeamCreate league={league} />
							)}
						</div>
					</div>
				);
			})}
		</>
	);
}

export default HomePage;
