var promise = require("bluebird");
var fs = require("fs");
var _ = require("lodash");
var mongoClient = require("./../clients/mongoClient");
var escapeHtml = require("escape-html");
module.exports.addComment = function(request){
    var userId = _.get(request.auth,"credentials.id");
    var articleId = request.params.articleId;
    var comment = escapeHtml(request.payload.comment.substring(0,5000));

    return mongoClient.addComment(articleId,userId,comment);
};

