
var sessionCache = require("./../clients/sessionCache");
module.exports.validate  = function (decoded, request, callback) {
    sessionCache.isValid(decoded.id).then(function(){
        callback(null,true,{role:decoded.role,id:decoded.id});
    })
    .catch(function(){
            callback(null,false);
        })

};

