import {
	RESET_ANNOUNCEMENT,
	GET_ANNOUNCEMENTS,
} from "../actions/types.js";

const initialState = {
	announcements: [],
	announcement: {},
};

export default function (state = initialState, action) {

	switch(action.type) {

		case RESET_ANNOUNCEMENT:
			return {
				...initialState,
			};

		case GET_ANNOUNCEMENTS:
			return {
				...state,
				announcements: action.payload,
			};

		default:
			return state;
	}
}
