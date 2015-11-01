var config = require("../config/config"),
    Joi = require('joi'),
    aguid = require("aguid"),
    JWT = require("jsonwebtoken");

var mongoClient = require("../clients/mongoClient");

module.exports = function (req, reply) {
    mongoClient.createAccount(req.payload)
        .then(function () {
            var session = {
                valid: true, // this will be set to false when the person logs out
                id: aguid(), // a random session id
                exp: new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes time
            };
            var token = JWT.sign(session, config.jwtSecret);
            reply({status: 'success'})
                .header("Authorization", token)
                .state("token", token, config.cookieOptions)

        })
        .catch(function (err) {
            reply(err).code(400);
        });

};


module.exports.validation = {
    payload: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
};