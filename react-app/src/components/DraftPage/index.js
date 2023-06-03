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

  const dateConverter = (dateString) => {
    let timestamp = Date.parse(dateString);
    let date = new Date(timestamp);

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let month = date.getMonth();
    console.log(month)
    let day = date.getDate();
    let year = date.getFullYear();
    let monthByName = months[month]

    let formattedDate = `${monthByName} ${day}, ${year}`;
    return formattedDate;
  }

	return (
		<>
			Drafts Time:
			{/* {leagueArray[0].name} */}
			{leagueArray?.map((league) => {
				// if (parseInt(id) === league.id) {
				return (
					<div key={league.id} className='league-divider'>
						<NavLink
							to={`/leagues/${league.id}`}
							key={league.id}
						>
							<span>{league.name} </span>
              <span>{dateConverter(league.created_at)}</span><p/>
						</NavLink>
					</div>
				);
				// }
			})}
		</>
	);
}

export default DraftPage;
