import axios from "axios";
import { toast } from "react-toastify";
import Util from '../utils/Util';
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, LOADING } from "./types";

import { history } from '../utils/history';
var UrlConstants = require('../utils/UrlConstants');

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

export const registerCustomer = customerData => dispatch => {

	dispatch(setLoading(true));

	axios
		.post(UrlConstants.URLS.registerCustomer, customerData)
		.then(res => {
			localStorage.setItem("email", customerData.email);
			toast.success("Email sent Successfull")
			history.push('/confirm-register');
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

export const confirmRegisterCustomer = customerData => dispatch => {

	dispatch(setLoading(true));

	axios
		.post(UrlConstants.URLS.confirmRegisterCustomer, customerData)
		.then(res => {

			if(!res.data.status) {
				toast.success(res.data.message);
				return false;
			}

			const { token } = res.data;
			localStorage.setItem("jwtToken", token);

			axios.defaults.headers.common["Authorization"] = token;

			const decoded = jwt_decode(token);

			dispatch(setCurrentUser(decoded));
			history.push('/stepone');
			// window.location.href = "stepone";
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

export const loginCustomer = customerData => dispatch => {

	dispatch(setLoading(true));

	axios
		.post(UrlConstants.URLS.loginCustomer, customerData)
		.then(res => {

			const { token } = res.data;
			localStorage.setItem("jwtToken", token);

			axios.defaults.headers.common["Authorization"] = token;

			const decoded = jwt_decode(token);

			dispatch(setCurrentUser(decoded));
			history.push('/dashboard');
			// window.location.href = "dashboard";
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

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

export const logoutUser = () => dispatch => {
	localStorage.removeItem("jwtToken");
	Util.setAuthToken(false);

	dispatch(setCurrentUser({}));
};

export const setLoading = (loadingStatus) => {
	return {
		type: LOADING,
		payload: loadingStatus
	};
};