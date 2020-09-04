import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AnnouncementForm from './AnnouncementForm';
import { addAnnouncement } from "../../actions/announcementActions.js";

class AddAnnouncement extends Component {

	// Handler for adding announcement
	handleAddAnnouncement(announcementData) {
		this.props.addAnnouncement(announcementData);
	}

	render() {

		return (
			<div className="page-content container">
				<ToastContainer position="top-center" transition={Zoom} autoClose={4000} />
				<div className="row page-title">
					<div className="col-md-12">
						<h4><i class="fa fa-angle-left" aria-hidden="true"></i> Add New Announcement</h4>
					</div>
				</div>
				<div class="section-container">
					<div className="row">
						<div className="col-md-6">
							<div className="form-container">
								<AnnouncementForm onSubmit={this.handleAddAnnouncement.bind(this)} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddAnnouncement.propTypes = {
	addAnnouncement: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { addAnnouncement })(
	AddAnnouncement
);
