import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import announcementReducer from "./announcementReducer.js";
import loadingReducer from "./loadingReducer.js";
import formResetReducer from "./formResetReducer.js";

export default combineReducers({
	auth: authReducer,
	announcements: announcementReducer,
	loading: loadingReducer,
	resetform: formResetReducer,
});
