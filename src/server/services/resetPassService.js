var promise = require("bluebird"),
    sessionCache = require("./../clients/sessionCache");
module.exports.getEmailByResetToken = function (request) {
    return sessionCache.isValid(request.params.resetToken);
};

