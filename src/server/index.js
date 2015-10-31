require('node-jsx').install({harmony: true, extension: '.jsx'});

var http = require('http'),
    Hapi = require('hapi'),
    _ = require('lodash'),
    aguid = require("aguid"),
    JWT = require("jsonwebtoken"),
    path = require("path");

var renderViewHandler = require("./handlers/renderViewHandler"),
    renderJsonHandler = require("./handlers/renderJsonHandler"),
    articleService = require("./services/articleService");

var server = new Hapi.Server();
var SECRET = "NeverShareYourSecret ";
var cookie_options = {
    ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
    encoding: 'none',    // we already used JWT to encode
    isSecure: true,      // warm & fuzzy feelings
    isHttpOnly: true,    // prevent client alteration
    clearInvalid: false, // remove invalid cookies
    strictHeader: true   // don't allow violations of RFC 6265
};
server.connection({port: process.env.PORT || 1337});
server.register([
        {register: require('hapi-auth-jwt2')},
        require('vision'),
        require('inert')
    ],
    function (err) {
        if (err) throw err;
        server.views({
            engines: {jade: require('jade')},
            relativeTo: __dirname ,
            path: './views',
            layoutKeyword: 'layout',
            compileOptions: {
                pretty: true
            }
        });

        server.auth.strategy('jwt', 'jwt',
            {
                key: SECRET,          // Never Share your secret key
                validateFunc: require("./auth/authHandler").validate,            // validate function defined above
                verifyOptions: {algorithms: ['HS256']}
            });

        server.auth.default('jwt');
        server.route({
            method: 'GET',
            path: '/assets/{p*}',
            handler: {
                directory: {
                    path: './build'
                }
            },
            config: {auth: false}
        });
//Api
        //PUBLIC
        server.route({
            method: ['POST'],
            path: '/login',
            handler: function (req, reply) {
                var session = {
                    valid: true, // this will be set to false when the person logs out
                    id: aguid(), // a random session id
                    exp: new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes time
                };
                var token = JWT.sign(session, SECRET); // synchronous
                console.log(token);
                reply({text: 'Check Auth Header for your Token'})
                    .header("Authorization", token)
                    .state("token", token, cookie_options)
            },
            config: {auth: false}
        });

        server.route({
            method: ['GET','POST'], path: '/restricted', config: { auth: 'jwt' },
            handler: function(request, reply) {
                reply({text: 'You used a Token!'});
                    //.header("Authorization", request.headers.authorization)
                    //.state("token", request.headers.authorization, {ttl: 365 * 30 * 7 * 24 * 60 * 60 * 1000})
                // .set(token)
            }
        });


//Views
        server.route({
            method: 'GET',
            path: '/',
            handler: renderViewHandler(function(){return {}}, "index"),
            config: {auth: false}
        });

        server.route({
            method: 'GET',
            path: '/blog',
            handler: renderViewHandler(articleService.get, "article"),
            config: {auth: false}

        });


        server.start(function () {
            console.log('Server running at:', server.info.uri);
            console.log('Server started on port: ', server.info.port);
        });

    });



