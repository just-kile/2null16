var bluebird = require("bluebird");
var errorHandler = require("./errorHandler");
var _ = require("lodash");
module.exports = function handleJsonRender(propertyHandler) {
    return function (request, reply) {
        var promise;
        if(typeof propertyHandler ==="function"){
            promise = bluebird.props(propertyHandler(request, reply));
        }else{
            promise = bluebird.props(_.mapValues(propertyHandler,function(handler){
                return handler(request,reply);
            }))
        }
        promise.then(function (data) {
            reply(data);
        }).catch(errorHandler(reply));
    }
};