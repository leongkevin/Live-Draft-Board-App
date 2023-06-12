import React, { useState, useEffect } from 'react';
import { getLeagues } from '../../store/league';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getTeams } from '../../store/team';
import './LeaguesPage.css';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketball } from '@fortawesome/free-solid-svg-icons';



function LeaguesPage(id) {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const leagueObject = useSelector((state) => state.leagueReducer);
	const leagueArray = Object.values(leagueObject);
	const teamObject = useSelector((state) => state.teamReducer);
	const teamArray = Object.values(teamObject);
	const history = useHistory();

	const { league_id } = useParams();

	// if (!sessionUser) history.push('/');

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
			<div className="league-divider-title">Commissioner Leagues</div>

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
				// console.log(parseInt(league.id))
				if (parseInt(sessionUser?.id) === league.admin_id) {
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
									{/* <span>
										{dateConverter(league.created_at)}
									</span> */}
								</NavLink>
							</div>
							<div className="league-divider-column-three">
								{teamArray?.map((team) => {
									// if (
									// 	(parseInt(team.league_id) === parseInt(league.id)
									// ) return ({
									// 	<></>
									// })
									if (
										parseInt(team.league_id) ===
											parseInt(league.id) &&
										parseInt(team.user_id) ===
											parseInt(sessionUser?.id)
									) {
										return <>{team.name}</>;
									}
									// else if(league.id === 6){
									// 	console.log("team.league_id",team.league_id);
									// 	console.log("league.id",league.id);
									// 	return <>{team.name}</>
									// }
									//  return <>{team.league_id}</>
								})}
							</div>
						</div>
					);
				}
			})}
		</>
	);
}

export default LeaguesPage;
