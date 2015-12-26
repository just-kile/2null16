var promise = require("bluebird");
var fs = require("fs");
var _ = require("lodash");
var mongoClient = require("./../clients/mongoClient");
module.exports.addComment = function(request){
    var userId = _.get(request.auth,"credentials.id");
    var articleId = request.params.articleId;
    var comment = request.payload.comment;
    return mongoClient.addComment(articleId,userId,comment);
};

