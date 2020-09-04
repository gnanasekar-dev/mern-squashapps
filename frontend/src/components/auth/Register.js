import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Util from '../../utils/Util';
import { registerCustomer } from "../../actions/authActions.js";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            error: null,
            buttonDisabled: true,
        };
    }

    register() {

        var error = null;

        if (this.state.email == "") {

            error = "Please enter email";
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
        };

        this.props.registerCustomer(customerData);
    }

    keypress(e) {
        if (e.key === 'Enter') {
            this.register();
        }
    }

    handleEmailChange(e) {
        this.setState({
            error: null,
            email: e.target.value,
        }, () => {
            if(this.state.email) {
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
            <button type="submit" className="btn btn-primary" id="submit" disabled={this.state.buttonDisabled} onClick={this.register.bind(this)}>Confirm Email</button>
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
                                    <h4 className="text-sm-left text-center make-your-life">Make Your Life Easy with Intranet!</h4>
                                    <p className="make-a-workspace">To make a workspace from scratch, please confirm your email address.</p>
                                </div>
                                <div className="form-group">
                                    <p className="input-label-heading">Email Address</p>
                                    <input type="email" className="form-control" id="email" name="email" value={this.state.email} onKeyPress={this.keypress.bind(this)} onChange={this.handleEmailChange.bind(this)} placeholder="name@email.com" autocomplete="off" />
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

Register.propTypes = {
    registerCustomer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerCustomer })(Register);