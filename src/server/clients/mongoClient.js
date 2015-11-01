var databaseUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/2null16";

var collections = ["articles"],
    bluebird = require("bluebird"),
    Promise = bluebird.Promise,
    MongoClient = require("mongodb").MongoClient,
    _ = require("lodash"),
    db,
    accountsCol,sessionsCol;
// db = mongojs.connect(databaseUrl, collections);
MongoClient.connect(databaseUrl, function (err, database) {
    if (err) {
        console.error("Database connection can not be established");
        return;
    }
    db = database;
    accountsCol = db.collection("accounts");
    sessionsCol = db.collection("sessions");
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
            accountsCol.insert(credentials, function (err,resultAccount) {
                if (err)reject(err);
                resolve(resultAccount.ops[0]);

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
        accountsCol.find({email: email}).limit(1).toArray(function (err, accounts) {
            if (err)reject(err);
            resolve(accounts[0]);
        });
    });
}
function saveSession(session){
    return new Promise(function (resolve, reject) {
        sessionsCol.insert(session,function (err) {
            if (err)reject(err);
            resolve({success: true});
        });
    });
}

module.exports = {
    findAccountByAccountId,
    findAccountByEmail,
    saveSession,
    createAccount,
    getArticleWithId,
    saveArticle,
    listArticles,
    removeArticle
};