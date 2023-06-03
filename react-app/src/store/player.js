// constant
const LOAD_PLAYERS = '/PLAYERS/LOAD_PLAYERS';

// action creators - define actions( objects with type/data )
const loadPlayers = (players) => ({
	type: LOAD_PLAYERS,
	payload: players,
});


// // thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators
export const getPlayers = () => async (dispatch) => {
	// const response = await fetch(`/api/players`);
	// const players = await response.json();
	// console.log(response)
	// console.log(players)
	try {
		const response = await fetch('/api/players');
		console.log(response)
		if (response.ok) {
			const players = await response.json();
			// console.log('getPlayers.line 17', players);
			dispatch(loadPlayers(players));
			// console.log('getPlayers.line 18', players);
			return players;
		}
	} catch (err) {
		return err;
	}
};


// reducer
const initialState = {};

const playerReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_PLAYERS: {
			const newState = { ...state };
			action.payload.players.forEach((el) => {
				newState[el.id] = el;
				// console.log('playerReducer', el);
			});
			return newState;
		}

		default: {
			return state;
		}
	}
};

export default playerReducer;
