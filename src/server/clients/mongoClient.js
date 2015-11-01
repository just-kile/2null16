var databaseUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/2null16";

var collections = ["articles"],
    bluebird = require("bluebird"),
    Promise = bluebird.Promise,
    MongoClient = require("mongodb").MongoClient,
    _ = require("lodash"),
    db,
    accountsCol;
// db = mongojs.connect(databaseUrl, collections);
MongoClient.connect(databaseUrl, function (err, database) {
    if (err) {
        console.error("Database connection can not be established");
        return;
    }
    db = database;
    accountsCol = db.collection("accounts");
});
function findAccountByAccountId(accountId) {
    accountsCol.find({_id: accountId}).limit(1)
}
function createAccount(credentials) {
   return findAccountByEmail(credentials.email).then(function (account) {
        return new Promise(function (resolve, reject) {
            if(account){
                return reject({message:"Account exists!"});
            }
            accountsCol.insert(credentials, function (err) {
                if (err)reject(err);
                resolve({success: true});

            });
        });
    })
}
function getArticleWithId(id) {

}

function saveArticle(articleData) {

}

function listArticles() {

}
function removeArticle(id) {

}

function findAccountByEmail(email) {
    return new Promise(function (resolve, reject) {
        accountsCol.find({email: email}).toArray(function (err, accounts) {
            if (err)reject(err);
            resolve(accounts[0]);
        });
    });
}

module.exports = {
    findAccountByAccountId,
    createAccount,
    getArticleWithId,
    saveArticle,
    listArticles,
    removeArticle
};