//var databaseUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/2null16";

var databaseUrl =  process.env.MONGODB || 'mongodb://' + (process.env.DATABASE_1_PORT_27017_TCP_ADDR || 'localhost') + ':' + (process.env.DATABASE_1_PORT_27017_TCP_PORT || '27017') + '/2null16';

var collections = ["articles"],
    bluebird = require("bluebird"),
    Promise = bluebird.Promise,
    MongoClient = require("mongodb").MongoClient,
    ObjectId = require("mongodb").ObjectId,
    _ = require("lodash"),
    db,
    accountsCol,sessionsCol,articleCol;
MongoClient.connect(databaseUrl, function (err, database) {
    if (err) {
        console.error("Database connection can not be established");
        return;
    }
    db = database;
    accountsCol = db.collection("accounts");
    sessionsCol = db.collection("sessions");
    articleCol = db.collection("articles");
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
    return new Promise(function (resolve, reject) {

        articleCol.find({_id:id}).limit(1).next(function (err,article) {
            if (err)reject(err);
            resolve(article);

        });
    });
}

function saveArticle(articleData) {
    return new Promise(function (resolve, reject) {
        articleCol.insertOne(articleData,{w:1},function (err, article) {
            if (err)reject(err);
            resolve(article);
        });
    });
}

function listArticles() {
    return new Promise(function (resolve, reject) {
        articleCol.find().limit(20).toArray(function (err, articles) {
            if (err)reject(err);
            resolve(articles);
        });
    });
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