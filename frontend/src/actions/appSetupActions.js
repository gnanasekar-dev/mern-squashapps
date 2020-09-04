import axios from "axios";
import { toast } from "react-toastify";
import Util from '../utils/Util';
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, LOADING } from "./types";

import { history } from '../utils/history';
var UrlConstants = require('../utils/UrlConstants');

const token = localStorage.getItem("jwtToken") ? localStorage.getItem("jwtToken") : '';

// Set authorization header for all request in this action.
axios.defaults.headers.common['Authorization'] = token;

export const postSignUpOne = customerDataOne => dispatch => {

	dispatch(setLoading(true));

	axios
		.post(UrlConstants.URLS.postSignUpOne, customerDataOne)
		.then(res => {
			history.push('/steptwo');
		})
		.catch(err => {
			if(err.response && err.response.data) {
				toast.error(err.response.data)
			}
		})
		.finally(() => {
			dispatch(setLoading(false));
		});
};

export const postSignUpTwo = customerDataOne => dispatch => {

	dispatch(setLoading(true));

	axios
		.post(UrlConstants.URLS.postSignUpTwo, customerDataOne)
		.then(res => {
			history.push('/dashboard');
		})
		.catch(err => {
			if(err.response && err.response.data) {
				toast.error(err.response.data)
			}
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