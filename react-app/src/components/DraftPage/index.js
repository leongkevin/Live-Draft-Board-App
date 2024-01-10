import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { getLeagues } from '../../store/league';
import { postDraft } from '../../store/league';
import { getPlayers } from '../../store/player';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import './DraftPage.css';

const players = ['Stephen Curry', 'Kevin Durant', 'Nikola Jokic'];

function DraftPage() {
	const dispatch = useDispatch();
	const { league_id } = useParams();

	const [searchPlayer, setSearchPlayer] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const handleSearch = (e) => {
		setSearchPlayer(e.target.value);
	};

	const playersObject = useSelector((state) => state.playerReducer);
	const playersArray = Object.values(playersObject);

	useEffect(() => {
		dispatch(getPlayers(playersArray));
	}, [dispatch]);

	useEffect(() => {

		const results = playersArray.map((player) => {
			if (player.full_name.toUpperCase().includes(searchPlayer) || player.full_name.toLowerCase().includes(searchPlayer)) {
				return player.full_name;
			}
		});

		// const results = playersArray.filter((player) => {
		// 	let name = player.full_name.toString().toLowerCase()
		// 	if (name.includes(searchPlayer)) return name
		// });
		setSearchResults(results);
	}, [searchPlayer]);

	const sessionUser = useSelector((state) => state.session.user);
	const leagueObject = useSelector((state) => state.leagueReducer);
	const leagueArray = Object.values(leagueObject);
	// console.log(`DraftPage, leagueArray: ${leagueArray}`);
	// const draftObject = useSelector((state) => state.draftReducer);
	// const draftArray = Object.values(draftObject);
	// console.log(`DraftPage, draftObject: ${draftObject}`);

	const [team_id, setTeam_id] = useState(0);
	const [player_id, setPlayer_id] = useState(0);

	// const handleDraftPlayer = async (e) => {
	// 	e.preventDefault();
	// 	setErrors([]);

	// 	try {
	// 		const draft = await dispatch(
	// 			postDraft({
	// 				team_id: 1,
	// 				player_id: 2,
	// 			})
	// 		);
	// 	} catch (err) {
	// 		alert(err);
	// 	}
	// };

	useEffect(() => {
		dispatch(getLeagues(leagueArray));
	}, [dispatch]);

	return (
		<>
			Drafts Date/Time:<p></p>
			{leagueArray?.map((league) => {
				if (parseInt(league_id) === league.id) {
					return (
						<div key={league.id} className="league-divider">
							<NavLink
								to={`/leagues/${league.id}`}
								key={league.id}
							>
								<span>{league.name} </span>
							</NavLink>
						</div>
					);
				}
			})}
			{/* <form className="draft-player-form" onSubmit={handleDraftPlayer}>
				<ul>
					{errors.length ? <h3>Errors</h3> : ''}
					<div className="errors">
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</div>
				</ul> */}
			{/*
				<button
					className="draft"
					type="submit"
					disabled={errors.length ? true : false}
				>
					Create
				</button>
			</form> */}
			{/* <label className="draft">Player</label> */}
			{/* <input
					className="song-modal-input"
					type="number"
					step="1"
					min="1"
					max="4"
					placeholder="Album Id"
					onChange={(e) => setAlbumId(e.target.value)}
					required
				/> */}
			<div className="draft">
				<input
					type="text"
					placeholder="Search Player"
					value={searchPlayer}
					onChange={handleSearch}
					required
				/>
				<div className='search-player-list'>
					{searchResults?.map((player) => (
						<div>{player}</div>
					))}
				</div>
			</div>
		</>
	);
}

export default DraftPage;
