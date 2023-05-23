import React, { useState, useEffect } from 'react';
import { getLeagues } from '../../store/league';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const leagueObject = useSelector((state) => state.leagueReducer);
	const leagueArray = Object.values(leagueObject);
	// console.log(`HomePage, leagueArray: ${leagueArray}`);

	useEffect(() => {
		dispatch(getLeagues(leagueArray));
	}, [dispatch]);

	return (
		<>
			Leagues
			{/* {leagueArray[0].name} */}
			{leagueArray?.map((league) => {
				// if (parseInt(league_id) === league.league_id) {
				return (
					<div key={league.league_id}>
						<NavLink
							to={`/leagues/${league.league_id}`}
							key={league.league_id}
						>
							<span>{league.name}</span>
						</NavLink>
					</div>
				);
				// }
			})}
		</>
	);
}

export default HomePage;
