import React, { Component } from 'react';
import { Router, Switch, Route } from "react-router";

import { Provider } from "react-redux";
import store from "./store.js";
import { history } from './utils/history';

import PrivateRoute from "./components/common/PrivateRoute.js";
import RedirectRoute from "./components/common/RedirectRoute.js";
import Spinner from "./components/common/Spinner.js";

// General Layouts
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Landing from './components/layout/Landing';
import NotFound from './components/not-found/NotFound';

// Auth Pages
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ConfirmRegister from "./components/auth/ConfirmRegister";

// Post Register
import StepOne from "./components/app-setup/StepOne";
import StepTwo from "./components/app-setup/StepTwo";

// Dashboard
import Dashboard from "./components/dashboard/Dashboard";
import AddAnnouncement from "./components/dashboard/AddAnnouncement";

export default class Navigation extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div className="App">
                        <Spinner />
                        <NavBar />
                        <div className="container-fluid">
                            <Switch>
                                {/* Public Routes */}
                                
                                    <RedirectRoute path='/' exact component={Login} />
                                
                                    <RedirectRoute path='/login' exact component={Login} />

                                    <RedirectRoute path='/register' exact component={Register} />

                                    <RedirectRoute path='/confirm-register' exact component={ConfirmRegister} />
                                
                                {/* End of Public Routes */}

                                {/* Private Routes */}

                                {/* Post Register routes */}
                                
                                    <PrivateRoute exact path="/stepone" component={StepOne} />

                                    <PrivateRoute exact path="/steptwo" component={StepTwo} />

                                {/* End of Post Register routes */}

                                {/* Dashboard / Announcement routes */}
                                
                                    <PrivateRoute exact path="/dashboard" component={Dashboard} />

                                    <PrivateRoute exact path="/announcement/add" component={AddAnnouncement} />
                                
                                {/* End of Dashboard routes */}

                                {/* End of Private Routes */}

                                <Route exact path="*" component={NotFound} />

                            </Switch>
                            
                        </div>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }

}

