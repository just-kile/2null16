var people = { // our "users database"
    "a1e01f39-bebb-4e49-a45f-db4e2ce475d8": {
        id: "a0f5b116-d3ca-432f-996b-880bab6f5f31",
        name: 'Jen Jones',
        email:"jen@jones.org",
        password:"123"

    }
};



module.exports.validate  = function (decoded, request, callback) {
    console.log(decoded);
    // do your checks to see if the person is valid
    if (false && !people[decoded.id]) {
        return callback(null, false);
    }
    else {
        console.log("Valid true");
        return callback(null, true);
    }
};

