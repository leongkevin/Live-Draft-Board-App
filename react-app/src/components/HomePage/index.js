import React, { useEffect, useState } from 'react';
import { getLeagues } from '../../store/league';
import { getTeams } from '../../store/team';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketball } from '@fortawesome/free-solid-svg-icons';
import { createTeamAction } from '../../store/team';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import LeagueCreateButton from '../LeagueCreateButton';
import TeamCreate from '../TeamCreate';

function HomePage() {
	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);

	const leagueObject = useSelector((state) => state.leagueReducer);
	const leagueArray = Object.values(leagueObject);

	const leagueObj = useSelector((state) => state.leagueReducer);
	const leagueArr = Object.values(leagueObj);

	const teamObject = useSelector((state) => state.teamReducer);
	const teamArray = Object.values(teamObject);

	const history = useHistory();

	// console.log(leagueArr);

	const league_id = leagueArray[0]?.id;

	useEffect(() => {
		dispatch(getLeagues(leagueArray));
		dispatch(getTeams(teamArray));
		// dispatch(getLeagues(leagueArr));
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
			{/* <LeagueCreateButton /> */}
			<p />

			{/* {league_id} */}

			<div className="league-divider-title">Explore or Join a League</div>

			<div className="league-divider header">
				<div className="league-divider-column-one header"></div>

				<div className="league-divider-column-two header">
					League Name
				</div>
				<div className="league-divider-column-three header">
					Team Name
				</div>
			</div>


			{leagueArray?.map((league) => {
				let joined;
				let admin;
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
								<span>(id #{league.id}) </span>
								<br />
								{/* <span>{dateConverter(league.created_at)}</span> */}
								{/* <p /> */}
							</NavLink>

							{teamArray?.map((team) => {
								if (
									(parseInt(team.league_id) === parseInt(league.id) &&
									parseInt(team.user_id) !==
										parseInt(userId)) ||
									parseInt(userId) ===
										parseInt(league.admin_id)
								) {
									joined = true;
									// if (
									// 	parseInt(team.user_id) ===
									// 	parseInt(userId)
									// 	// parseInt(team.user_id) !==
									// 	// parseInt(userId)
									// 	&&
									// 	parseInt(team.user_id) ===
									// 	parseInt(league.admin_id)
									// 	// 	&&
									// 	// parseInt(team.league_id) ===
									// 	// 	parseInt(league.id)
									// ) {
									// 	// console.log(team)
									// 	// console.log(team.user_id)
									// 	console.log(
									// 	parseInt(league.admin_id))
									// 	joined = true;
									// 	// console.log(joined)
									// }
									// if (
									// 	// parseInt(team.user_id) ===
									// 	// parseInt(userId)

									// 	// parseInt(team.user_id) ===
									// 	// parseInt(league.admin_id)

									// 	(parseInt(team.league_id) === parseInt(league.id) &&
									// 		parseInt(team.user_id) !==
									// 		parseInt(userId))) {
									// 	console.log(team.name);
									// 	// console.log(parseInt(team.user_id) === parseInt(league.admin_id));
									// 	// console.log(league.admin_id);
									// 	// console.log(team.user_id);

									// 	admin = true;
									// 	// console.log(admin);
									// }
									// admin = true;
									// return (
									// 	<>
									// 		{team.name}<br/>
									// 	</>
									// )
								} else if(parseInt(team.league_id) !== parseInt(league.id) && parseInt(team.user_id) !== parseInt(userId) ) {
									joined = false;
								}


								// else if(parseInt(team.league_id) !== parseInt(league.id) && parseInt(team.user_id) ===
								// parseInt(userId) ) {
								// 	joined = true;
								// }
							})}
						</div>
						<div className="league-divider-column-three">
							{joined || admin ? (
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
