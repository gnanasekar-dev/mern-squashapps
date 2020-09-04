import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from 'react-select';
import Util from '../../utils/Util';

import { resetForm } from "../../actions/formResetActions";

class AnnouncementForm extends Component {

	constructor(props) {
        super(props);
        this.state = {
            form: {
                subject: "",
                category: "announcement",
                description: "",
                notify_to: "",
            },
            notifyToOptions: [
                { label: "gnanasekardev@gmail.com", value: "gnanasekardev@gmail.com"},
                { label: "kalairasanj@squashapps.com", value: "kalairasanj@squashapps.com"},
                { label: "kalai@gmail.com", value: "kalai@gmail.com"},
            ]
        };
    }
    
    resetForm() {
        this.setState({
            form: {
                subject: "",
                category: "announcement",
                description: "",
                notify_to: "",
            },
        }, () => {
            this.props.resetForm(false);
        });
    }

    componentDidUpdate(prevProps) {

        const { resetform } = this.props;

        // Typical usage (don't forget to compare props):
        if (resetform.resetform && resetform.resetform !== prevProps.resetform.resetform) {
            this.resetForm();
        }
    }

    // Handler for input field change event
    handleInputFeild(event) {
        
        const { name, value } = event.target;
        const { form } = this.state;

        var formObj = {};
        formObj = {
            ...form,
            [name]: value,
        };

        this.setState({
            form: formObj,
        });
        
    }

    // Handler for select field change event
    handleSelectField(name, value) {
        
        const { form } = this.state;

        var formObj = {};
        formObj = {
            ...form,
            [name]: value,
        };

        this.setState({
            form: formObj,
        });
        
    }

	// Handler for announcement submit
	handleAnnouncementSubmit(e) {
        e.preventDefault();

        var error = null;

        if (this.state.form.subject == "" || this.state.form.description == "") {

            error = "Please enter all the details";
            this.setState({
                error: error
            });
            return false;
        }

        const { form } = this.state;
        this.props.onSubmit(form);
    }
    
	render() {

		const { form, notifyToOptions } = this.state;

		return(
			<form onSubmit={this.handleAnnouncementSubmit.bind(this)}>
                <div class="form-group">
					<label>Subject <span className="text-danger">*</span></label>
					<div>
						<input type="text" class="form-control" name="subject" value={form.subject} onChange={this.handleInputFeild.bind(this)} />
					</div>
				</div>

                <p>Due to time constraints default category is set: Announcement</p>
                <input type="hidden" class="form-control" name="category" value={form.category} value="announcement" />

				<div class="form-group">
					<label>Description <span className="text-danger">*</span></label>
					<div>
                        <textarea class="form-control" rows="5" id="description" name="description" value={form.description} onChange={this.handleInputFeild.bind(this)}>{form.description}</textarea>
					</div>
				</div>

				<div class="form-group">
					<label>Notify To <span className="text-danger">*</span></label>
					<div>
                        <Select
                            isMulti
                            name="notify_to"
                            onChange={this.handleSelectField.bind(this, 'notify_to')}
                            options={notifyToOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
					</div>
				</div>

                <div id="errorMsg">
                    <p>{this.state.error}</p>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
		);
	}
}

AnnouncementForm.propTypes = {
    resetform: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    resetform: state.resetform,
});

export default connect(mapStateToProps, { resetForm })(
	AnnouncementForm
);
