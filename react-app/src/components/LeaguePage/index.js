import React, { useState, useEffect } from 'react';
import { getLeagues } from '../../store/league';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import './LeaguePage.css';

function LeaguePage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const leagueObject = useSelector((state) => state.leagueReducer);
	const leagueArray = Object.values(leagueObject);
	// console.log(`HomePage, leagueArray: ${leagueArray}`);
	const { league_id } = useParams();

	useEffect(() => {
		dispatch(getLeagues(leagueArray));
	}, [dispatch]);

	return (
		<>
			{leagueArray?.map((league) => {
				console.log(`this is line 39: ${league_id}`)
				if (parseInt(sessionUser?.id) === league.admin_id && league.id === parseInt(league_id)) {
				return (
					<div key={league.id} className='league-divider'>
							League {league.id}<br/>
							<span>{league.name} </span>
							<span>(#{league.id}) </span><br/>

					</div>
				);
				}
			})}
		</>
	);
}

export default LeaguePage;
