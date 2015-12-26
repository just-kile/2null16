require('node-jsx').install({harmony: true, extension: '.jsx'});

var http = require('http'),
    Hapi = require('hapi'),
    _ = require('lodash'),
    joi = require('joi'),
    promise = require('bluebird'),
    path = require("path");

var renderViewHandler = require("./handlers/renderViewHandler"),
    renderJsonHandler = require("./handlers/renderJsonHandler"),
    articleService = require("./services/articleService"),
    imageService = require("./services/imageService"),
    userService = require("./services/userService"),
    commentsService = require("./services/commentsService"),
    resetPassService = require("./services/resetPassService");

var server = new Hapi.Server();
var SECRET = require("./config/config").jwtSecret;

server.connection({port: process.env.PORT || 1337});
server.register([
        {register: require('hapi-auth-jwt2')},
        require('hapi-auth-basic'),
        require('vision'),
        require('inert'),
       {register: require('hapi-authorization'),options: {roles: ['ADMIN', 'USER']}}
    ],
    function (err) {
        if (err) throw err;
        server.views({
            engines: {jade: require('jade')},
            relativeTo: __dirname,
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
                verifyOptions: {algorithms: ['HS256']},
                cookieKey:"jwt_secret_token"
            });

        server.auth.default('jwt');
        //server.auth.strategy('simple', 'basic', { validateFunc: require("./auth/basicAuthHandler").validate });
        //public assets
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
        //API PUBLIC

        server.route({
            method: ['POST'],
            path: '/register',
            handler: require("./handlers/registerHandler"),
            config: {
                auth: false,
                validate: require("./handlers/registerHandler").validation
            }

        });
        server.route({
            method: ['POST'],
            path: '/login',
            handler: require("./handlers/loginHandler"),
            config: {
                auth: false,
                validate: require("./handlers/loginHandler").validation
            }

        });
        server.route({
            method: ['POST'],
            path: '/resetpass',
            handler: require("./handlers/resetPasswordHandler"),
            config: {
                auth: false,
                validate: require("./handlers/resetPasswordHandler").validation
            }

        });

        server.route({
            method: ['GET','POST'],
            path: '/logout',
            handler: require("./handlers/logoutHandler")
        });
        server.route({
            method: 'POST',
            path: '/reset/{resetToken}',
            handler: require("./handlers/changePasswordHandler"),
            config:{
                auth:false,
                validate:require("./handlers/changePasswordHandler").validation
            }
        });

        server.route({
            method: 'GET',
            path: '/api/articles',
            handler: renderJsonHandler({articles:articleService.list})
        });
        server.route({
            method: 'POST',
            path: '/api/articles',
            handler: renderJsonHandler(articleService.create),
            config:{
                plugins: {'hapiAuthorization': {role: 'ADMIN'}}
            }
        });
        server.route({
            method: 'GET',
            path: '/api/articles/{articleId}',
            handler: renderJsonHandler({article:articleService.get})
        });
        server.route({
            method: 'PUT',
            path: '/api/articles/{articleId}/comment',
            handler: renderJsonHandler(commentsService.addComment),
            config:{
                validate:{
                    payload:{
                        comment:joi.string()
                    }
                }
            }
        });

        server.route({
            method: 'DELETE',
            path: '/api/articles/{articleId}',
            handler: renderJsonHandler(articleService.remove),
            config:{
                plugins: {'hapiAuthorization': {role: 'ADMIN'}}
            }
        });
        //server.route({
        //    method: 'GET',
        //    path: '/api/articles/create',
        //    handler: renderJsonHandler({article:articleService.save})
        //});
        server.route({
            method: 'GET',
            path: '/api/users',
            handler: renderJsonHandler({users:userService.getUsers}),
            config:{
                plugins: {'hapiAuthorization': {role: 'ADMIN'}}
            }
        });
        server.route({
            method: 'PUT',
            path: '/api/users/{accountId}/{role}',
            handler: renderJsonHandler(userService.changeUserRole),
            config:{
                plugins: {'hapiAuthorization': {role: 'ADMIN'}}
            }
        });

        server.route({
            method: 'PUT',
            path: '/api/articles/publish/{articleId}/{type}',
            handler: renderJsonHandler(articleService.toggle),
            config:{
                plugins: {'hapiAuthorization': {role: 'ADMIN'}},
                validate:{
                    params:{
                        articleId:joi.string(),
                        type:joi.boolean()
                    }
                }
            }

        });
        server.route({
            method: 'PUT',
            path: '/articles/{articleId}',
            handler: renderJsonHandler({users:articleService.save}),
            config:{
              //  auth:"simple",

                plugins: {'hapiAuthorization': {role: 'ADMIN'}},
                validate:{
                    payload:{
                        article:joi.object().required(),
                        meta:joi.object().required(),
                        _id:joi.string().optional()
                    }
                }
            }

        });
        //Images
        server.route({
           method:"POST",
            path:"/images",
            config:{
                plugins: {'hapiAuthorization': {role: 'ADMIN'}},

                payload: {
                    output: 'stream',
                    parse: true,
                    allow: 'multipart/form-data'
                }
            },
            handler:renderJsonHandler(imageService.upload)
        });
        server.route({
            method: 'GET',
            path: '/api/images',
            config:{
                plugins: {'hapiAuthorization': {role: 'ADMIN'}}
            },
            handler: renderJsonHandler({images:imageService.list})
        });
        server.route({
            method: 'GET',
            path: '/images/{p*}',
            handler: {
                directory: {
                    path:process.env.IMAGE_DIRNAME || "./tmp"
                }
            },
            config: {auth: false}
        });
        //Views
        server.route({
            method: 'GET',
            path: '/',
            handler: renderViewHandler(function () {
                return {}
            }, "index"),
           // config: {auth: "simple"}
            config: {auth: false}
        });
        server.route({
            method: 'GET',
            path: '/reset/{resetToken}',
            handler: renderViewHandler(resetPassService.getEmailByResetToken, "index"),
            //config: {auth: "simple"}
            config: {auth: false}
        });

        server.route({
            method: 'GET',
            path: '/blog',
            handler: renderViewHandler({articles:articleService.list}, "index")
        });
        server.route({
            method: 'GET',
            path: '/blog/{articleId}',
            handler: renderViewHandler({article:articleService.get}, "index")
        });

        server.route({
            method: 'GET',
            path: '/admin',
            handler: renderViewHandler({users:userService.getUsers,articles:articleService.listAll}, "index"),
            config:{
                plugins: {'hapiAuthorization': {role: 'ADMIN'}}
            }
        });
        server.route({
            method: 'GET',
            path: '/admin/edit/{articleId}',
            handler: renderViewHandler({article:articleService.get,images:imageService.list}, "index"),
            config:{
                plugins: {'hapiAuthorization': {role: 'ADMIN'}}
            }
        });


        server.start(function () {
            console.log('Server running at:', server.info.uri);
            console.log('Server started on port: ', server.info.port);
        });

    });



