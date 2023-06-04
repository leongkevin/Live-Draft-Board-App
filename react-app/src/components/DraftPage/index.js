import React, { useState, useEffect } from 'react';
import { getLeagues } from '../../store/league';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './DraftPage.css';

function DraftPage() {
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
			Drafts Date/Time:
			{leagueArray?.map((league) => {
				// if (parseInt(id) === league.id) {
				return (
					<div key={league.id} className='league-divider'>
						<NavLink
							to={`/leagues/${league.id}`}
							key={league.id}
						>
							<span>{league.name} </span>
						</NavLink>
					</div>
				);
				// }
			})}
		</>
	);
}

export default DraftPage;
