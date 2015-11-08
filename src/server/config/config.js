
var argv = require('minimist')(process.argv.slice(2)),
    isProd = argv.prod || false;
if(isProd){
    module.exports = {
        cookieOptions : {
            ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
            encoding: 'none',    // we already used JWT to encode
            isSecure: true,      // warm & fuzzy feelings
            isHttpOnly: true,    // prevent client alteration
            clearInvalid: false, // remove invalid cookies
            strictHeader: true   // don't allow violations of RFC 6265
        },
        jwtSecret: process.env.JWT_SECRET || "mySecretKey"
    };
}else{
    module.exports = {
        cookieOptions : {
            ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
            encoding: 'none',    // we already used JWT to encode
            clearInvalid: false, // remove invalid cookies
            strictHeader: true   // don't allow violations of RFC 6265
        },
        jwtSecret: process.env.JWT_SECRET || "mySecretKey"
    };
}
