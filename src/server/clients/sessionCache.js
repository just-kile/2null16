var NodeCache = require("node-cache"),
    bluebird = require("bluebird"),
    Promise = bluebird.Promise;

var sessionCache = new NodeCache();

function save(session) {
    return new Promise(function (resolve, reject) {
        sessionCache.set(session.id, session, function (err, success) {
            if (err) {
                return reject(err);
            }
            resolve(success);
        });
    });

}

function isValid(id) {
    return new Promise(function(resolve,reject){
        sessionCache.get(id,function(err,session){
            if(err){
                return reject(err);
            }
            if(!session){
                return reject()
            }
            resolve(session);
        });

    });
}
function invalidateSession(session) {
    if(session){
        sessionCache.del(session.id)

    }

}
module.exports.save = save;
module.exports.isValid = isValid;
module.exports.invalidateSession= invalidateSession;