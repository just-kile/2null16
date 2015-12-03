var NodeCache = require("node-cache"),
    bluebird = require("bluebird"),
    Promise = bluebird.Promise;

var sessionCache = new NodeCache();
var TIME = 7*24*60*60;//7 Days
function save(session,ttl) {
    return new Promise(function (resolve, reject) {
        console.info("save",session);
        sessionCache.set(session.id, session,ttl || TIME, function (err, success) {
            if (err) {
                console.error(err);
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
function keys(cb){
    sessionCache.keys(cb);
}
module.exports.save = save;
module.exports.isValid = isValid;
module.exports.invalidateSession= invalidateSession;
module.exports.keys= keys;