var databaseUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/turbo";

var collections = ["articles"],
    mongojs = require("mongojs"),
    bluebird = require("bluebird"),
    _ = require("lodash"),
    db = mongojs.connect(databaseUrl, collections);

function resolveOrReject(defer){
    return function(err,data)  {
        if(err || !data) defer.reject(err);
        else defer.resolve(data);
    };
}
function getArticleWithId(id) {
    var defer = bluebird.defer();
    if (mongojs.ObjectId.isValid(id)) {
        db.articles.findOne({_id: mongojs.ObjectId(id)},resolveOrReject(defer));
    }else{
        defer.reject("Invalid Id!")
    }
    return defer.promise;
}

function saveArticle(articleData){
    if(articleData._id) articleData._id = mongojs.ObjectId(articleData._id);
    var defer = bluebird.defer();
    db.articles.save(articleData,resolveOrReject(defer));
    return defer.promise;
}

function listArticles(){
    var defer = bluebird.defer();
    db.articles.find({},resolveOrReject(defer));
    return defer.promise;
}
function removeArticle(id){
    var defer = bluebird.defer();
    if (mongojs.ObjectId.isValid(id)) {
        db.articles.remove({_id: mongojs.ObjectId(id)},resolveOrReject(defer));
    }else{
        defer.reject("Invalid Id!")
    }
    return defer.promise;
}

module.exports = {
    getArticleWithId: getArticleWithId,
    saveArticle:saveArticle,
    listArticles:listArticles,
    removeArticle:removeArticle
};