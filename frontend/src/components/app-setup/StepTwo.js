import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Util from '../../utils/Util';
import { postSignUpTwo } from "../../actions/appSetupActions.js";

class StepTwo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            password: "",
            error: null,
            buttonDisabled: true,
        };
    }

    register() {

        var error = null;

        if (this.state.first_name == "" || this.state.last_name == "" || this.state.password == "") {

            error = "Please enter all details";
            this.setState({
                error: error
            });
            return false;
        }

        const customerDataOne = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            password: this.state.password,
        };

        this.props.postSignUpTwo(customerDataOne);
    }

    keypress(e) {
        if (e.key === 'Enter') {
            this.register();
        }
    }

    handleInputChange(e) {

        this.setState({
            error: null,
            [e.target.name]: e.target.value,
        }, () => {
            if(this.state.first_name && this.state.last_name && this.state.password) {
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
            <button type="submit" className="btn btn-primary" id="submit" disabled={this.state.buttonDisabled} onClick={this.register.bind(this)}>Complete</button>
        );
    }

    render() {

        return(
            <div>
                <ToastContainer position="top-center" transition={Zoom} autoClose={4000} />
                <div className="login-form-section">
                    <div className="row">
                        <div className="col-sm-6 align-self-center pb-10">
                            <img src="/images/system_img.png" className="img-fluid" alt="system" />
                        </div>
                        <div className="col-sm-6 align-self-center">
                            <div className="signin-heading">
                                <h4 className="text-sm-left text-center make-your-life">Create Personal Password</h4>
                                <p className="make-a-workspace">To make a workspace from scratch, please confirm your email address.</p>
                            </div>
                            <div className="form-group">
                                <p className="input-label-heading">First Name</p>
                                <input type="text" className="form-control" id="first_name" name="first_name" value={this.state.first_name} onKeyPress={this.keypress.bind(this)} onChange={this.handleInputChange.bind(this)} placeholder="John" />
                            </div>
                            <div className="form-group">
                                <p className="input-label-heading">Last Name</p>
                                <input type="text" className="form-control" id="last_name" name="last_name" value={this.state.last_name} onKeyPress={this.keypress.bind(this)} onChange={this.handleInputChange.bind(this)} placeholder="Smith" />
                            </div>
                            <div className="form-group">
                                <p className="input-label-heading">Password</p>
                                <input type="password" className="form-control" id="password" name="password" value={this.state.password} onKeyPress={this.keypress.bind(this)} onChange={this.handleInputChange.bind(this)} placeholder="Enter Your Password" />
                            </div>
                            
                            <div id="errorMsg">
                                <p>{this.state.error}</p>
                            </div>

                            {this.renderButton()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StepTwo.propTypes = {
    postSignUpTwo: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { postSignUpTwo })(StepTwo);