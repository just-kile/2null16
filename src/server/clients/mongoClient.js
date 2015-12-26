//var databaseUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/2null16";

var databaseUrl =  process.env.MONGODB || 'mongodb://' + (process.env.DATABASE_1_PORT_27017_TCP_ADDR || 'localhost') + ':' + (process.env.DATABASE_1_PORT_27017_TCP_PORT || '27017') + '/2null16';

var collections = ["articles"],
    bluebird = require("bluebird"),
    Promise = bluebird.Promise,
    MongoClient = require("mongodb").MongoClient,
    ObjectId = require("mongodb").ObjectId,
    _ = require("lodash"),
    db,
    accountsCol,sessionsCol,articleCol,imageCol;
MongoClient.connect(databaseUrl, function (err, database) {
    if (err) {
        console.error("Database connection can not be established");
        return;
    }
    db = database;
    accountsCol = db.collection("accounts");
    sessionsCol = db.collection("sessions");
    articleCol = db.collection("articles");
    imageCol = db.collection("images");
    setUserRole("563dfb556fdb542600913d3f","ADMIN");
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
                if (err){return reject(err);}
                resolve(resultAccount.ops[0]);

            });
        });
    })
}
function getArticleWithId(id) {
    return new Promise(function (resolve, reject) {

        articleCol.find({_id:ObjectId(id)}).limit(1).next(function (err,article) {
            if (err){return reject(err);}
            resolve(article);

        });
    });
}

function createArticle(articleData) {
    return new Promise(function (resolve, reject) {
        articleCol.insertOne(articleData,{w:1},function (err, article) {
            if (err){return reject(err);}
            resolve(article);
        });
    });
}

function saveArticle(id,articleData) {
    delete articleData._id;
    return new Promise(function (resolve, reject) {
        articleCol.update({_id:ObjectId(id)},articleData,{upsert: true},function (err, article) {
            if (err){
                return reject(err);
            }
            resolve(article);
        });
    });
}

function listArticles(allArticles) {
    return new Promise(function (resolve, reject) {
        var cursor = allArticles?articleCol.find():articleCol.find({"meta.active":true});
        cursor.sort({"meta.createdAt":-1}).toArray(function (err, articles) {
            if (err){
                return reject(err);
            }
            resolve(articles);
        });
    });
}
function removeArticle(id) {
    return new Promise(function (resolve, reject) {
        articleCol.deleteOne({_id:new ObjectId(id)},function(err,result){
            if (err){
                return reject(err);
            }
            resolve(result);
        });
    });

}

function findAccountByEmail(email) {
    return new Promise(function (resolve, reject) {
        accountsCol.find({email: email}).limit(1).toArray(function (err, accounts) {
            if (err){
                return reject(err);
            }
            resolve(accounts[0]);
        });
    });
}
function saveSession(session){
    return new Promise(function (resolve, reject) {
        sessionsCol.insert(session,function (err) {
            if (err){
                return reject(err);
            }
            resolve({success: true});
        });
    });
}
function updateAccount(email,pass){
    return new Promise(function (resolve, reject) {
        accountsCol.update({email:email},{$set: {password:pass}},function (err) {
            if (err){
                return reject(err);
            }
            resolve({success: true});
        });
    });
}

function getUsers(){
    return new Promise(function (resolve, reject) {
        accountsCol.find().toArray(function (err,accounts) {
            if (err){
                return reject(err);
            }
            resolve(accounts);
        });
    });
}

function saveImageUrl(imageData){
    return new Promise(function(resolve,reject){
        imageCol.insertOne(imageData,{w:1},function (err, image) {
            if (err){return reject(err);}
            resolve(image);
        });
    })
}

function getImageList(){
    return new Promise(function(resolve,reject){
       imageCol.find().toArray(function(err,images){
           if(err){
             return reject(err)
           }
           resolve(images);
       })
    });
}
function setUserRole(accountId,role){
    return new Promise(function(resolve,reject){
        accountsCol.update({_id:ObjectId(accountId)},{$set: {role:role}},function (err) {
            if (err){
                return reject(err);
            }
            resolve({success: true});
        });
    });


}

function addComment(articleId,userId,comment){
    return new Promise(function(resolve,reject){
        accountsCol.find({_id:ObjectId(userId)}).limit(1).toArray(function (err,data) {
            if (err){
                return reject(err);
            }
            var account = data[0];
            var commentData = {
                userName:account.name,
                createdAt:new Date(),
                comment:comment
            };
            articleCol.update({_id:ObjectId(articleId)},{$push:{"meta.comments":commentData}},function(err){
                if (err){
                    return reject(err);
                }
                resolve(commentData);
            });

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
    saveImageUrl,
    getImageList,
    getUsers,
    setUserRole,
    addComment
};