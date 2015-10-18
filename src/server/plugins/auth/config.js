var Confidence = require("confidence");

var store = new Confidence.Store({
    provider: {
        $filter: 'env',
        production: {
            google: {
                provider: 'google',
                password: 'hapiauth',
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_KEY,
                isSecure: false
            }
        },
        $default: {
            google: {
                provider: 'google',
                password: 'hapiauth',
                clientSecret: "RZPVwnxCMCzMZhSiZClNN1og", // fill in your Google ClientId here
                clientId: '946899274677-fdlegtdf30ul0uaik2p2ef5mqmru9419.apps.googleusercontent.com', // fill in your Google Client Secret here
                isSecure: false // Terrible idea but required if not using HTTPS
            }
        }
    }
});

var criteria = {
    env: process.env.NODE_ENV
};

exports.get = function(key) {
    return store.get(key, criteria);
};
