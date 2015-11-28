var dao = require("./../clients/mongoClient");
var articleJson = require("../mock/exampleArticle.json");
function getArticle(request) {
    var id = request.params.articleId;
    return  dao.getArticleWithId(id)
}
function saveArticle(request) {
    var article = request.payload;
    var articleId = request.params.articleId;
    console.log(articleId)
    console.log(article)
    return dao.saveArticle(articleId,article);
}

function listArticles(){
    return  dao.listArticles()

}
function removeArticle(request){
    var id = request.params.articleId;
    return dao.removeArticle(id)
}
module.exports = {
    get: getArticle,
    save: saveArticle,
    list:listArticles,
    remove:removeArticle
};