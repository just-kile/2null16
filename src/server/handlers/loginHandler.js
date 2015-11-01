var config = require("../config/config"),
    Joi = require('joi'),
    aguid = require("aguid"),
    JWT = require("jsonwebtoken");

module.exports = function (req, reply) {

    var session = {
        valid: true, // this will be set to false when the person logs out
        id: aguid(), // a random session id
        exp: new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes time
    };

    var token = JWT.sign(session, config.jwtSecret); // synchronous
    reply({status: 'success'})
        .header("Authorization", token)
        .state("token", token, config.cookieOptions)

};


module.exports.validation = {
    payload: {
        name: Joi.string().required(),
        password: Joi.string().required()
    }
};