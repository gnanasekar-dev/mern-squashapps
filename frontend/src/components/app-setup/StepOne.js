import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Util from '../../utils/Util';
import { postSignUpOne } from "../../actions/appSetupActions.js";

class StepOne extends Component {

    constructor(props) {
        super(props);
        this.state = {
            company_name: "",
            location: "",
            no_of_employees: "",
            domain_name: "",
            error: null,
            buttonDisabled: true,
        };
    }

    register() {

        var error = null;

        if (this.state.company_name == "" || this.state.location == "" || this.state.no_of_employees == "" || this.state.domain_name == "") {

            error = "Please enter all details";
            this.setState({
                error: error
            });
            return false;
        }

        const customerDataOne = {
            company_name: this.state.company_name,
            location: this.state.location,
            no_of_employees: this.state.no_of_employees,
            domain_name: this.state.domain_name,
        };

        this.props.postSignUpOne(customerDataOne);
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
            if(this.state.company_name && this.state.location && this.state.no_of_employees && this.state.domain_name) {
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
            <button type="submit" className="btn btn-primary" id="submit" disabled={this.state.buttonDisabled} onClick={this.register.bind(this)}>Next</button>
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
                                <h4 className="text-sm-left text-center make-your-life">Setup Your Application</h4>
                                <p className="make-a-workspace">To make a workspace from scratch, please confirm your email address.</p>
                            </div>
                            <div className="form-group">
                                <p className="input-label-heading">Company Name</p>
                                <input type="text" className="form-control" id="company_name" name="company_name" value={this.state.company_name} onKeyPress={this.keypress.bind(this)} onChange={this.handleInputChange.bind(this)} placeholder="Enter your company name" />
                            </div>
                            <div className="form-group">
                                <p className="input-label-heading">Location</p>
                                <input type="text" className="form-control" id="location" name="location" value={this.state.location} onKeyPress={this.keypress.bind(this)} onChange={this.handleInputChange.bind(this)} placeholder="cbe" />
                            </div>
                            <div className="form-group">
                                <p className="input-label-heading">No. of Employees</p>
                                <input type="number" className="form-control" id="no_of_employees" name="no_of_employees" value={this.state.no_of_employees} onKeyPress={this.keypress.bind(this)} onChange={this.handleInputChange.bind(this)} placeholder="2" />
                            </div>
                            <div className="form-group">
                                <p className="input-label-heading">Domain Name</p>
                                <input type="text" className="form-control" id="domain_name" name="domain_name" value={this.state.domain_name} onKeyPress={this.keypress.bind(this)} onChange={this.handleInputChange.bind(this)} placeholder="example.com" />
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

StepOne.propTypes = {
    postSignUpOne: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { postSignUpOne })(StepOne);