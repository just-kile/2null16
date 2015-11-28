var dao = require("./../clients/mongoClient");
var _ = require("lodash");
var articleJson = require("../mock/exampleArticle.js");
function getArticle(request) {
    var id = request.params.articleId;
    return  dao.getArticleWithId(id)
}
function saveArticle(request) {
    var article = request.payload;
    var articleId = request.params.articleId;
    if(typeof _.get(article,"meta.createdAt") === "string"){
        article.meta.createdAt = new Date(article.meta.createdAt);
    }
    return dao.saveArticle(articleId,article);
}
function createArticle(){
    var article = articleJson.rawArticle();
    return dao.saveArticle(article._id,article);
}
function listArticles(request){
    var allArticles = !!request.query.allArticles;
    return  dao.listArticles(allArticles)

}

function listAllArticles(){
    return  dao.listArticles(true)

}

function removeArticle(request){
    var id = request.params.articleId;
    return dao.removeArticle(id)
}

function toggleArticle(request){
    return getArticle(request).then(function(article){
        _.extend(article.meta,{active:request.params.type});
        return dao.saveArticle(request.params.articleId,article);
    })
}


module.exports = {
    get: getArticle,
    create:createArticle,
    save: saveArticle,
    list:listArticles,
    listAll:listAllArticles,
    remove:removeArticle,
    toggle:toggleArticle
};