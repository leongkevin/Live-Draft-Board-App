// constant
const LOAD_TEAMS = '/TEAMS/LOAD_TEAMS';
const LOAD_TEAM = '/TEAMS/LOAD_TEAM';
const POST_TEAM = '/LEAGUE/POST_TEAM';
const UPDATE_TEAM = '/LEAGUE/UPDATE_TEAM';
const DELETE_TEAM = '/LEAGUE/DELETE_TEAM';

// action creators - define actions( objects with type/data )
const loadTeams = (teams) => ({
	type: LOAD_TEAMS,
	payload: teams,
});

const loadTeam = (team) => ({
	type: LOAD_TEAM,
	payload: team,
});

const postTeam = (team) => ({
	type: POST_TEAM,
	payload: team,
});

const updateTeam = (team) => ({
	type: UPDATE_TEAM,
	payload: team,
});

const deleteTeam = (teamId) => ({
	type: DELETE_TEAM,
	payload: teamId,
});

// // thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators
export const getTeams = () => async (dispatch) => {
	const response = await fetch(`/api/teams`);
	const teams = await response.json();
	// console.log(teams)
	try {
		const response = await fetch('/api/teams');
		// console.log(response)
		if (response.ok) {
			const data = await response.json();
			// console.log('getTeams.line 17', teams);
			dispatch(loadTeams(teams));
			// console.log('getLeagues.line 18', leagues);
			return data;
		}
	} catch (err) {
		return err;
	}
};

export const getTeam = (team_id) => async (dispatch) => {
	try {
		const response = await fetch(`/api/teams/${team_id}`);
		console.log(response);
		if (response.ok) {
			const team = await response.json();
			// console.log('getTeam, line 45', team);
			dispatch(loadTeam(team));
			return team;
		}
	} catch (err) {
		return err;
	}
};

// not tested
export const createTeamAction = (league) => async (dispatch) => {

	// console.log(league)
	// console.log(league.league_id)
	const id = parseInt(league.league_id)

	try {
		const response = await fetch(`/api/leagues/${id}/teams`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			// body: JSON.stringify(data),
		});

		if (response.ok) {
			const data = await response.json();
			dispatch(postTeam(id));
			return data;
		}
	} catch (err) {
		throw err;
	}
};

// not tested
export const updateTeamAction = (team) => async (dispatch) => {
	console.log(team)
	const response = await fetch(`/api/teams/${team.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(team),
	});

	if (response.ok) {
		const data = await response.json();

		dispatch(updateTeam({ ...team, ...data }));
		return data;
	} else return response.json();
};

// not tested
export const deleteTeamAction = (team_id) => async (dispatch) => {
	console.log(team_id)
	const response = await fetch(`/api/teams/${team_id}`, {
		method: 'DELETE',
	});
	console.log(response)

	if (response.ok) {
		const data = await response.json();
		dispatch(deleteTeam(team_id));
		return data;
	}
}


// reducer
const initialState = {};

const teamReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_TEAMS: {
			const newState = { ...state };
			action.payload.teams.forEach((el) => {
				newState[el.id] = el;
				// console.log('teamReducer', el);
			});
			return newState;
		}
		case LOAD_TEAM: {
			const newState = { ...state };
			// console.log("teamReducer, LOAD_TEAM: this is line 69:", action.payload)
			return { ...newState, [action.payload.id]: action.payload };
		}


		case POST_TEAM: {
			const newState = { ...state };
			return { ...newState, [action.payload.id]: action.payload };
		}

		case UPDATE_TEAM: {
			const newState = { ...state };
			return { ...newState, [action.payload.id]: action.payload };
		}

		case DELETE_TEAM: {
			const newState = { ...state };
			delete newState[action.payload];
			return newState;
		}

		default: {
			return state;
		}
	}
};

export default teamReducer;
