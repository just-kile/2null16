var dao = require("./../clients/mongoClient");
var articleJson = require("../mock/exampleArticle.json");
function getArticle(request) {
    var id = request.params.articleId;
    return  dao.getArticleWithId(id)
}
function saveArticle(request) {
    var article = request.payload;
    var articleId = request.params.articleId;
    return dao.saveArticle(articleId,article);
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
module.exports = {
    get: getArticle,
    save: saveArticle,
    list:listArticles,
    listAll:listAllArticles,
    remove:removeArticle
};