import React, { useState, useEffect } from 'react';
import { getLeagues } from '../../store/league';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './HomePage.css';

import OpenModalButton from '../OpenModalButton';
import TeamCreateModal from '../TeamCreate';
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
				// if (parseInt(id) === league.id) {
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
						{/* {league ? <TeamCreate league={league} /> : <TeamCreate league={league} />} */}

						{/* not working */}
						{teamArray?.map((team) => {
							let joined = true;
							if (team.league_id === league.id) {
								// if(team.user_id === sessionUser.id ) joined = true;
								return (
									<>
										<div
											key={team.id}
											className="team-divider"
										>
											<span>{team.name}</span>
										</div>
									</>
								);
							} else if (!joined) {
								console.log("line86 ", joined)
								return(
								<>
									<TeamCreate league={league} />
								</>)
							}
						})}
						<TeamCreate league={league} />

						{/* <OpenModalButton
							buttonText="Join"
							modalComponent={<TeamCreateModal league={league} />}
						/> */}

					</div>
				);
				// }
			})}

		</>
	);
}

export default HomePage;
