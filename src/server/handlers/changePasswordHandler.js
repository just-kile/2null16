var config = require("../config/config"),
    Joi = require('joi'),
    aguid = require("aguid"),
    bcrypt = require("bcrypt"),
    promise = require("bluebird"),
    Boom = require("boom"),
    sessionCache = require("./../clients/sessionCache"),
    mongoClient = require("../clients/mongoClient"),
    nodemailer = require("nodemailer"),
    smtpTransport = require('nodemailer-smtp-transport'),npm
    JWT = require("jsonwebtoken");

module.exports = function (req, reply) {
    sessionCache.isValid(req.params.resetToken)
        .then(function(session){
            return new promise(function(resolve,reject){
                bcrypt.hash(req.payload.pass, 10, function(err, hash) {
                    if(err){
                        return reject(err);
                    }
                    mongoClient.updateAccount(session.account.email, hash)
                        .then(resolve)
                        .catch(reject);

                })
            })

        }).then(function(account){
            reply(account).code(201);
        })


        .catch(function(err){
            console.error(err)
            reply(Boom.forbidden());
        })
};

module.exports.validation = {
    payload: {
        pass: Joi.string().required()
    }
};