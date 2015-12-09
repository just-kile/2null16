
var sessionCache = require("./../clients/sessionCache");
module.exports.validate  = function (decoded, request, callback) {
    sessionCache.isValid(decoded.id).then(function(){
        callback(null,true,{role:decoded.role});
    })
    .catch(function(){
            callback(null,false);
        })

};

