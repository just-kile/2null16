var databaseUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/2null16";

var collections = ["articles"],
    bluebird = require("bluebird"),
    MongoClient = require("mongodb").MongoClient,
    _ = require("lodash"),
    db,
    accountsCol;
   // db = mongojs.connect(databaseUrl, collections);
MongoClient.connect(databaseUrl,function(err,database){
    if(err){
        console.error("Database connection can not be established");
        return;
    }
    db = database;
    accountsCol = db.collection("accounts");
});
function existsAccount(accountId){
    accountsCol.find({})
}
function createAccount(credentials){

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
    existsAccount,
    getArticleWithId,
    saveArticle,
    listArticles,
    removeArticle
};