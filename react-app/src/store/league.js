// constant
const LOAD_LEAGUES = '/leagues/LOAD_LEAGUES';

// action creators - define actions( objects with type/data )
const loadLeagues = (leagues) => ({
	type: LOAD_LEAGUES,
	payload: leagues,
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
		default: {
            return state;
        }
	}
};

export default leagueReducer;
