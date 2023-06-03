// constant
const LOAD_DRAFT = '/DRAFTS/LOAD_DRAFT';


// action creators - define actions( objects with type/data )
const loadDraft = (draft) => ({
	type: LOAD_DRAFT,
	payload: draft,
});


// // thunk action creators - for asynchronous code, i.e fetch calls prior to dispatching action creators
export const getDraft = () => async (dispatch) => {
	// const response = await fetch(`/api/teams`);
	// const teams = await response.json();
	// console.log(teams)
	try {
		const response = await fetch('/api/drafts');
		console.log(response)
		if (response.ok) {
			const drafts = await response.json();
			// console.log('getTeams.line 17', teams);
			dispatch(loadDraft(drafts));
			return drafts;
		}
	} catch (err) {
		return err;
	}
};


// reducer
const initialState = {};

const draftReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_DRAFT: {
			const newState = { ...state };
			action.payload.draft.forEach((el) => {
				newState[el.id] = el;
				// console.log('teamReducer', el);
			});
			return newState;
		}

		default: {
			return state;
		}
	}
};

export default draftReducer;
