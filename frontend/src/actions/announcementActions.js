import axios from "axios";
import { toast } from "react-toastify";
import {
	LOADING,
	RESET_ANNOUNCEMENT,
	GET_ANNOUNCEMENTS,
} from "./types";

import { resetForm } from "./formResetActions";
var UrlConstants = require('../utils/UrlConstants');

const token = localStorage.getItem("jwtToken") ? localStorage.getItem("jwtToken") : '';

// Set authorization header for all request in this action.
axios.defaults.headers.common['Authorization'] = token;

// Reset to initial Values
export const resetAnnouncementData = () => dispatch => {
	dispatch({
		type: RESET_ANNOUNCEMENT,
	})
}

// Get Announcements
export const getAnnouncements = () => dispatch => {

	dispatch(setLoading(true));

	axios
		.get(UrlConstants.URLS.getAnnouncements)
		.then(res => {
			return dispatch({
				type: GET_ANNOUNCEMENTS,
				payload: res.data
			})
		})
		.catch(err => {
			if(err.response && err.response.data) {
				toast.error(err.response.data)
			} else {
				console.log('err..', err)
			}
		})
		.finally(() => {
			dispatch(setLoading(false));
		});
};

// Add a announcement
export const addAnnouncement = (announcementData, history) => dispatch => {

	dispatch(setLoading(true));

	axios
		.post(UrlConstants.URLS.addAnnouncement, announcementData)
		.then(res => {
			toast.success('Announcement Added');
			dispatch(resetForm(true));
		})
		.catch(err => {
			toast.error(err.response.data);
		})
		.finally(() => {
			dispatch(setLoading(false));
		});
};

export const setLoading = (loadingStatus) => {
	return {
		type: LOADING,
		payload: loadingStatus
	};
};