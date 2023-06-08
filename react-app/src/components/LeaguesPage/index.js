import React, { useState, useEffect } from 'react';
import { getLeagues } from '../../store/league';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import './LeaguesPage.css';

function LeaguesPage(id) {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const leagueObject = useSelector((state) => state.leagueReducer);
	const leagueArray = Object.values(leagueObject);
	// console.log(`HomePage, leagueArray: ${leagueArray}`);
	const { league_id } = useParams();

	useEffect(() => {
		dispatch(getLeagues(leagueArray));
	}, [dispatch]);

  const dateConverter = (dateString) => {
    let timestamp = Date.parse(dateString);
    let date = new Date(timestamp);

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let month = date.getMonth();

    let day = date.getDate();
    let year = date.getFullYear();
    let monthByName = months[month]

    let formattedDate = `${monthByName} ${day}, ${year}`;
    return formattedDate;
  }

	return (
		<>
			My Leagues:
			{leagueArray?.map((league) => {
				// console.log(parseInt(league.id))
				if (parseInt(sessionUser?.id) === league.admin_id) {
				return (
					<div key={league.id} className='league-divider'>
						<NavLink
							to={`/leagues/${league.id}`}
							key={league.id}
						>
							<span>{league.name} </span>
							<span>(#{league.id}) </span><br/>
							<span>user {league.admin_id} </span><br/>
              <span>{dateConverter(league.created_at)}</span><p/>
						</NavLink>

					</div>
				);
				}
			})}
		</>
	);
}

export default LeaguesPage;
