import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';

import { getAnnouncements } from "../../actions/announcementActions";

import moment from 'moment';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {        };
    }

    componentDidMount() {
        this.props.getAnnouncements();
    }

    render() {

        const { announcements } = this.props.announcements;

        return(
            <div>
                <ToastContainer position="top-center" transition={Zoom} autoClose={4000} />
                <Link to="/announcement/add" className="btn btn-light custom-link-style add-announcement-btn" title="Add Announcement">Add Announcement</Link>
                <div className="section-container">

                    {
                        announcements.map((value) => {
                            return (
                                <div class="card" style={{"margin-bottom": "25px"}}>
                                    <div class="card-header">
                                        {value.subject ? value.subject : "No Title"}
                                    </div>
                                    <div class="card-body">
                                        <p>{value.description ? value.description : "No description"}</p>
                                        <p style={{"font-size": "12px"}}><i>{value.createdAt ? moment(value.createdAt).format("DD MMM, YYYY") : "No Date"}</i></p>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <p>{announcements.length == 0 ? "No Announcements Available" : null}</p>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getAnnouncements: PropTypes.func.isRequired,
    announcements: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    announcements: state.announcements,
});

export default connect(mapStateToProps, { getAnnouncements })(
    Dashboard
);
