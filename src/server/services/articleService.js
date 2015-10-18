var dao = require("./../clients/mongoClient");
var articleJson = require("../mock/exampleArticle.json");
function getArticle(request) {
    var id = request.params.articleId;
    return {
        data: ["article", "test"],
        article: dao.getArticleWithId(id)
    };
}
function saveArticle() {
    return dao.saveArticle(articleJson);
}

function listArticles(){
    return {
        articles: dao.listArticles()
    }
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