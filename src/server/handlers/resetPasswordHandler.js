var config = require("../config/config"),
    Joi = require('joi'),
    aguid = require("aguid"),
    sha256 = require("crypto-js/sha256"),
    Boom = require("boom"),
    sessionCache = require("./../clients/sessionCache"),
    mongoClient = require("../clients/mongoClient"),
    nodemailer = require("nodemailer"),
    smtpTransport = require('nodemailer-smtp-transport'),npm
    JWT = require("jsonwebtoken");

var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.goneo.de',
    secure:true,
    port: 465,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
}));

module.exports = function (req, reply) {

    mongoClient.findAccountByEmail(req.payload.email)
        .then(function (account) {
            var hash = sha256(new Date().getTime()* Math.random()).toString();
            console.info(hash)
            var session = {
                id: hash, // a random session id,
                account:account,
                exp: new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes time
            };

            sessionCache.save(session,30*60);
            sendEmail(req.payload.email,hash,function(err){
                if(err){
                    console.error(err);
                    return reply(Boom.badImplementation());
                }
                reply({}).code(201);
            });


        })
    .catch(function(){
            reply(Boom.forbidden());
        })

};

function sendEmail(email,hash,callback){
    transporter.sendMail({
        from:"postmaster@2null16.de",
        to:email,
        subject:"2null16 - Dein vergessenes Passwort",
        text:"Klickst du hier: http://www.2null16.de/reset/"+hash+" .Er ist eine halbe stunde aktiv."
    },callback);

}
module.exports.validation = {
    payload: {
        email: Joi.string().email().required()
    }
};