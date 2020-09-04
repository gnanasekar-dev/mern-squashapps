import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Util from '../../utils/Util';
import { confirmRegisterCustomer } from "../../actions/authActions.js";
import { history } from '../../utils/history';

class ConfirmRegister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            otp: "",
            error: null,
            buttonDisabled: true,
        };
    }

    componentDidMount() {

        var email = localStorage.getItem("email");

        if(email) {
            this.setState({
                email: email,
            });
        } else {
            history.push('/register');
        }
    }

    register() {

        var error = null;

        if (this.state.otp == "") {

            error = "Please enter otp";
            this.setState({
                error: error
            });
            return false;
        }

        const customerData = {
            otp: this.state.otp,
            email: this.state.email,
        };

        this.props.confirmRegisterCustomer(customerData);
    }

    keypress(e) {
        if (e.key === 'Enter') {
            this.register();
        }
    }

    handleOtpChange(e) {
        this.setState({
            error: null,
            otp: e.target.value,
        }, () => {
            if(this.state.otp) {
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
            <button type="submit" className="btn btn-primary" id="submit" disabled={this.state.buttonDisabled} onClick={this.register.bind(this)}>Verify</button>
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
                                    <h4 className="text-sm-left text-center make-your-life">We've sent you a mail!</h4>
                                    <p className="make-a-workspace">To make a workspace from scratch, please confirm your email address.</p>
                                </div>
                                <div className="form-group">
                                    <p className="input-label-heading">Enter your verification code</p>
                                    <input type="text" className="form-control" id="confirm_code" name="confirm_code" value={this.state.otp} onKeyPress={this.keypress.bind(this)} onChange={this.handleOtpChange.bind(this)} placeholder="1234" />
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

ConfirmRegister.propTypes = {
    confirmRegisterCustomer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { confirmRegisterCustomer })(ConfirmRegister);