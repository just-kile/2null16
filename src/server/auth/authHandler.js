var people = { // our "users database"
    1: {
        id: 1,
        name: 'Jen Jones',
        email:"jen@jones.org",
        password:"123"

    }
};



module.exports.validate  = function (decoded, request, callback) {

    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
        return callback(null, false);
    }
    else {
        return callback(null, true);
    }
};

