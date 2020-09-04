/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');

module.exports = {

    // Sign up the user-agent
    webSignUp: function (req, res) {
        
        var email = req.body.email;

        if (!email) return res.badRequest('Invalid Request..');

        // var otp = Math.floor(100000 + Math.random() * 900000);
        var otp = "1234";

        sails.hooks.email.send(
            "otpEmail",
            {
              recipientName: email,
              otp: otp
            },
            {
              to: email,
              subject: "GS - SA-INTRANET OTP"
            },
            function(err) {

                if (err) return res.status(400).json(err);

                var customerDetails = {
                    email: email,
                    otp: otp,
                    status: 'pending_verification'
                };

                Customer.create(customerDetails).exec((err) => {

                    if (err) return res.status(400).json(err.message);
        
                    res.json({
                        status: true,
                    });
                });
            }
        );       
    },

    // Sign up the user-agent
    webSignUpConfirm: function (req, res) {
        
        var otp = req.body.otp;
        var email = req.body.email;

        if (!email || !otp) return res.badRequest('Invalid Request..');

        Customer.findOne({email: email, otp: otp}).exec((err, foundAuth) => {

            if (err) return res.status(400).json(err.message);

            if (!foundAuth) return res.json({
                status: false,
                message: 'Invalid OTP'
            });

            var userDetails = {
                status: 'active'
            };
    
            Customer.update({email: email}).set(userDetails).exec((err) => {
    
                if (err) return res.status(400).json(err.message);

                const payload = { id: foundAuth.id };
    
                jwt.sign(
                    payload,
                    'sampleseceretkey',
                    { expiresIn: 360000 },
                    (err, token) => {

                        var userAuthDetails = {
                            user_id: foundAuth.id,
                            token: token
                        };
        
                        AuthenticationToken.create(userAuthDetails).exec((err) => {
            
                            if (err) return res.status(400).json(err.message);
                            
                            res.json({
                                status: true,
                                token: "Bearer " + token
                            });
                        });
                    }
                );

            });

        });
    },

    // Sign up the user-agent
    webPostSignUpOne: function (req, res) {
        
        var company_name = req.body.company_name;
        var user_id = req.user_id;
        var location = req.body.location;
        var no_of_employees = req.body.no_of_employees;
        var domain_name = req.body.domain_name;

        if (!company_name || !location || !no_of_employees || !domain_name) return res.badRequest('Invalid Request..');

        var userDetails = {
            company_name: company_name,
            location: location,
            no_of_employees: no_of_employees,
            domain_name: domain_name,
        };

        Customer.update({id: user_id}).set(userDetails).exec((err) => {

            if (err) return res.status(400).json(err.message);

            res.json({
                status: true,
            });
        });
    },

    // Sign up the user-agent
    webPostSignUpTwo: function (req, res) {
        
        var user_id = req.user_id;
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var password = req.body.password;

        if (!first_name || !last_name || !password) return res.badRequest('Invalid Request..');

        bcrypt.genSalt(10, function (err, salt) {
			bcrypt.hash(password, salt, function (err, hash) {

                if (err) return res.status(400).json(err);
                
                var userDetails = {
                    first_name: first_name,
                    last_name: last_name,
                    password: hash,
                };
        
                Customer.update({id: user_id}).set(userDetails).exec((err) => {
        
                    if (err) return res.status(400).json(err.message);
        
                    res.json({
                        status: true,
                    });
                });                
			});
		});

    },

    // Sign in the user-agent
    webLogin: function (req, res) {

        var error = null;
        const email = req.body.email;
        const password = req.body.password;

        if (!email) return res.badRequest('Invalid Request..');

        Customer.findOne({email: email}).exec((err, foundAuth) => {

            if (err) return res.status(400).json(err.message);

            if(!foundAuth) {
                return res.status(400).json('Invalid Credentials');
            }

            bcrypt.compare(password, foundAuth.password, function(err, result) {

                if (err) return res.status(409).json("Invalid credentials, please try again.");

                if(result) {

                    const payload = { id: foundAuth.id };

                    jwt.sign(
                        payload,
                        'sampleseceretkey',
                        { expiresIn: 360000 },
                        (err, token) => {

                            var userAuthDetails = {
                                user_id: foundAuth.id,
                                token: token
                            };
            
                            AuthenticationToken.create(userAuthDetails).exec((err) => {
                
                                if (err) return res.status(400).json(err.message);
                                
                                res.json({
                                    status: true,
                                    token: "Bearer " + token
                                });
                            });
                        }
                    );
                } else {

                    return res.status(409).json("Invalid credentials, please try again.");
                }
            });
        });

    }
};

