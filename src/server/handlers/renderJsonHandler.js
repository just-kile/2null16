var bluebird = require("bluebird");
var errorHandler = require("./errorHandler");

module.exports = function handleJsonRender(propertyHandler) {
    return function (request, reply) {
        bluebird.props(propertyHandler(request, reply)).then(function (data) {
            reply(data);
        }).catch(errorHandler(reply));
    }
};