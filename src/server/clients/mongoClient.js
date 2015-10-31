var databaseUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/turbo";

var collections = ["articles"],
    bluebird = require("bluebird"),
    _ = require("lodash");
   // db = mongojs.connect(databaseUrl, collections);

function resolveOrReject(defer){

}
function getArticleWithId(id) {

}

function saveArticle(articleData){

}

function listArticles(){

}
function removeArticle(id){

}

module.exports = {
    getArticleWithId: getArticleWithId,
    saveArticle:saveArticle,
    listArticles:listArticles,
    removeArticle:removeArticle
};