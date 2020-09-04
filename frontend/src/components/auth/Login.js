import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NavLink as RRNavLink } from 'react-router-dom';
import {
    NavLink,
} from 'reactstrap';

import Util from '../../utils/Util';
import { loginCustomer } from "../../actions/authActions.js";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: null,
            buttonDisabled: true,
        };
    }

    login() {

        var error = null;

        if (this.state.email == "" || this.state.password == "") {

            error = "Please enter all the details";
            this.setState({
                error: error
            });
            return false;
        }

        if (!Util.validateEmail(this.state.email)) {

            error = "Please enter a valid email address.";
            this.setState({
                error: error
            });
            return false;
        }

        const customerData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginCustomer(customerData);
    }

    keypress(e) {
        if (e.key === 'Enter') {
            this.login();
        }
    }

    handleEmailChange(e) {
        this.setState({
            error: null,
            email: e.target.value,
        }, () => {
            if(this.state.email && this.state.password) {
                this.setState({
                    buttonDisabled: false,
                });
            } else {
                this.setState({
                    buttonDisabled: true,
                });
            }

        });
    }

    handlePasswordChange(e) {
        this.setState({
            error: null,
            password: e.target.value,
        }, () => {
            if(this.state.email && this.state.password) {
                this.setState({
                    buttonDisabled: false,
                }); 
            } else {
                this.setState({
                    buttonDisabled: true,
                });
            }
        });
    }

    renderButton() {

        return (
            <button type="submit" className="btn btn-primary" id="submit" disabled={this.state.buttonDisabled} onClick={this.login.bind(this)}>Sign In</button>
        );
    }

    render() {

        return (
            <div className="body-section page-content">
                <div className="container">
                    <ToastContainer position="top-center" transition={Zoom} autoClose={4000} />
                    <div className="login-form-section">
                        <div className="row">
                            <div className="col-sm-6 align-self-center pb-10">
                                <img src="/images/system_img.png" className="img-fluid" alt="system" />
                            </div>
                            <div className="col-sm-6 align-self-center">
                                <div className="signin-heading">
                                    <h4 className="text-sm-left text-center make-your-life">Login to your app</h4>
                                    <p className="make-a-workspace">To make a workspace from scratch, please confirm your email address.</p>
                                </div>
                                <div className="form-group">
                                    <p className="input-label-heading">User Name</p>
                                    <input type="text" className="form-control" id="username" name="username" value={this.state.email} onKeyPress={this.keypress.bind(this)} onChange={this.handleEmailChange.bind(this)} placeholder="Enter Your user name" autocomplete="off" />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="pwd" name="password" placeholder="Enter your password" value={this.state.password} onKeyPress={this.keypress.bind(this)} onChange={this.handlePasswordChange.bind(this)} />
                                </div>

                                <div id="errorMsg">
                                    <p>{this.state.error}</p>
                                </div>

                                {this.renderButton()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginCustomer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginCustomer })(Login);