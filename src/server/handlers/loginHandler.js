var config = require("../config/config"),
    Joi = require('joi'),
    aguid = require("aguid"),
    bcrypt = require("bcrypt"),
    Boom = require("boom"),
    sessionCache = require("./../clients/sessionCache"),
    mongoClient = require("../clients/mongoClient"),

    JWT = require("jsonwebtoken");

module.exports = function (req, reply) {

    mongoClient.findAccountByEmail(req.payload.email)
        .then(function (account) {
            bcrypt.compare(req.payload.password, account.password, function (err, isValid) {
                if (err) {
                    return reply(Boom.badImplementation());
                }
                if (!isValid) {
                    return reply(Boom.forbidden());
                }
                var session = {
                    valid: true, // this will be set to false when the person logs out
                    id: account._id.toString(), // a random session id
                    exp: new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes time
                };

                sessionCache.save(session);
                var token = JWT.sign(session, config.jwtSecret); // synchronous
                reply({status: 'success'})
                    .header("Authorization", token)
                    .state("token", token, config.cookieOptions)

            });

        })
    .catch(function(){
            reply(Boom.forbidden());
        })

};


module.exports.validation = {
    payload: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
};