var promise = require("bluebird");
var fs = require("fs");
var mongoClient = require("./../clients/mongoClient");
var gm = require("gm");
module.exports.addComment = function(request){
    return mongoClient.getImageList();
};

