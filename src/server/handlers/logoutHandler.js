var config = require("../config/config"),
    Joi = require('joi'),
    aguid = require("aguid"),
    _ = require("lodash"),
    bcrypt = require("bcrypt"),
    Boom = require("boom"),
    sessionCache = require("./../clients/sessionCache"),
    mongoClient = require("../clients/mongoClient"),

    JWT = require("jsonwebtoken");

module.exports = function (req, reply) {

    sessionCache.invalidateSession(req.auth.credentials);
    reply.redirect("/").unstate("token");

};


