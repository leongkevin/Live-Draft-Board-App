// constant
const LOAD_LEAGUES = '/LEAGUES/LOAD_LEAGUES';
const LOAD_LEAGUE = '/LEAGUES/LOAD_LEAGUE';
const POST_LEAGUE = '/LEAGUE/POST_LEAGUE';
const UPDATE_LEAGUE = '/LEAGUE/UPDATE_LEAGUE';
const DELETE_LEAGUE = '/LEAGUE/DELETE_LEAGUE';

// action creators - define actions( objects with type/data )
const loadLeagues = (leagues) => ({
	type: LOAD_LEAGUES,
	payload: leagues,
});

const loadLeague = (league) => ({
	type: LOAD_LEAGUE,
	payload: league,
});

const postLeague = (league) => ({
	type: POST_LEAGUE,
	payload: league,
});

const updateLeague = (league) => ({
	type: UPDATE_LEAGUE,
	payload: league,
});

const deleteLeague = (leagueId) => ({
	type: DELETE_LEAGUE,
	payload: leagueId,
});

// thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators
export const getLeagues = () => async (dispatch) => {
	try {
		const response = await fetch('/api/leagues');
		if (response.ok) {
			const leagues = await response.json();
			// console.log('getLeagues.line 16', leagues);
			dispatch(loadLeagues(leagues));
			// console.log('getLeagues.line 18', leagues);
			return leagues;
		}
	} catch (err) {
		return err;
	}
};


export const getLeagueAction = (leagueId) => async (dispatch) => {
	const response = await fetch(`/api/leagues/${leagueId}`);

	if (response.ok) {
		const data = await response.json();
		dispatch(loadLeague(leagueId));
		return data;
	}
};

export const getLeagueCurrentAction = () => async (dispatch) => {
	const response = await fetch(`/api/leagues/current`);

	if (response.ok) {
		const data = await response.json();
		dispatch(loadLeagues());
		return data;
	}
};



export const createLeagueAction = (data) => async (dispatch) => {
	console.log(data)
	try {
		const response = await fetch(`/api/leagues`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			// body: JSON.stringify(data),
		});

		if (response.ok) {
			const data = await response.json();
			dispatch(postLeague(data));
			return data;
		}
	} catch (err) {
		throw err;
	}
};


export const updateLeagueAction = (league) => async (dispatch) => {
	console.log(league)
	const response = await fetch(`/api/leagues/${league.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(league),
	});

	if (response.ok) {
		const data = await response.json();

		dispatch(updateLeague({ ...league, ...data }));
		return data;
	} else return response.json();
};

// not tested
export const deleteLeagueAction = (league_id) => async (dispatch) => {
	console.log(league_id)
	const response = await fetch(`/api/leagues/${league_id}`, {
		method: 'DELETE',
	});
	console.log(response)

	if (response.ok) {
		const data = await response.json();
		dispatch(deleteLeague(league_id));
		return data;
	}
}

// reducer
const initialState = {};

const leagueReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_LEAGUES: {
			const newState = { ...state };
			action.payload.leagues.forEach((el) => {
				newState[el.id] = el;
				// console.log('leagueReducer', line 35:, el)
			});
			return newState;
		}
		case LOAD_LEAGUE: {
			const newState = { ...state };
			return { ...newState, [action.payload.id]: action.payload };
		}

		case POST_LEAGUE: {
			const newState = { ...state };
			return { ...newState, [action.payload.id]: action.payload };
		}

		case UPDATE_LEAGUE: {
			const newState = { ...state };
			return { ...newState, [action.payload.id]: action.payload };
		}

		case DELETE_LEAGUE: {
			const newState = { ...state };
			delete newState[action.payload];
			return newState;
		}

		default: {
			return state;
		}
	}
};

export default leagueReducer;
