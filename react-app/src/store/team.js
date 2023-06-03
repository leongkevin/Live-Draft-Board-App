// constant
const LOAD_TEAMS = '/TEAMS/LOAD_TEAMS';
const LOAD_TEAM = '/TEAMS/LOAD_TEAM';

// action creators - define actions( objects with type/data )
const loadTeams = (teams) => ({
	type: LOAD_TEAMS,
	payload: teams,
});

const loadTeam = (team) => ({
	type: LOAD_TEAM,
	payload: team,
});

// // thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators
export const getTeams = () => async (dispatch) => {
	const response = await fetch(`/api/teams`);
	const teams = await response.json();
	console.log(teams)
	try {
		const response = await fetch('/api/teams');
		console.log(response)
		if (response.ok) {
			const teams = await response.json();
			// console.log('getTeams.line 17', teams);
			dispatch(loadTeams(teams));
			// console.log('getLeagues.line 18', leagues);
			return teams;
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
		default: {
			return state;
		}
	}
};

export default teamReducer;
