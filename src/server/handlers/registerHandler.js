var config = require("../config/config"),
    Joi = require('joi'),
    aguid = require("aguid"),
    bcrypt = require("bcrypt"),
    sessionCache = require("./../clients/sessionCache"),
    JWT = require("jsonwebtoken");

var mongoClient = require("../clients/mongoClient");

module.exports = function (req, reply) {
    var credentials = req.payload;
    bcrypt.hash(credentials.password, 10, function(err, hash) {
        credentials.password = hash;
        mongoClient.createAccount(credentials)
            .then(function (account) {
                var session = {
                    valid: true, // this will be set to false when the person logs out
                    id:account._id.toString(), // a random session id
                    exp: new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes time
                };
                var token = JWT.sign(session, config.jwtSecret);
                sessionCache.save(session);
                reply({status: 'success'})
                    .header("Authorization", token)
                    .state("token", token, config.cookieOptions)

            })
            .catch(function (err) {
                console.error(err);
                reply(err).code(400);
            });
    });


};


module.exports.validation = {
    payload: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        location: Joi.string().valid("herrenhaus").valid("lübbenow").insensitive().required()
    }
};