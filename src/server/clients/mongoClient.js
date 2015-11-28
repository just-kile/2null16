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

        articleCol.find({_id:ObjectId(id)}).limit(1).next(function (err,article) {
            if (err)reject(err);
            resolve(article);

        });
    });
}

function createArticle(articleData) {
    return new Promise(function (resolve, reject) {
        articleCol.insertOne(articleData,{w:1},function (err, article) {
            if (err)reject(err);
            resolve(article);
        });
    });
}

function saveArticle(id,articleData) {
    delete articleData._id;
    return new Promise(function (resolve, reject) {
        articleCol.update({_id:ObjectId(id)},articleData,{upsert: true},function (err, article) {
            if (err)reject(err);
            resolve(article);
        });
    });
}

function listArticles(allArticles) {
    return new Promise(function (resolve, reject) {
        var cursor = allArticles?articleCol.find():articleCol.find({"meta.active":true});
        cursor.toArray(function (err, articles) {
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
function updateAccount(email,pass){
    return new Promise(function (resolve, reject) {
        accountsCol.update({email:email},{$set: {password:pass}},function (err) {
            if (err)reject(err);
            resolve({success: true});
        });
    });
}

function getUsers(){
    return new Promise(function (resolve, reject) {
        accountsCol.find().toArray(function (err,accounts) {
            if (err)reject(err);
            resolve(accounts);
        });
    });
}
module.exports = {
    findAccountByAccountId,
    findAccountByEmail,
    saveSession,
    createAccount,
    updateAccount,
    getArticleWithId,
    saveArticle,
    listArticles,
    removeArticle,

    getUsers
};