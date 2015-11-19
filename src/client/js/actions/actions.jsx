const {GET_ARTICLE,GET_ARTICLE_LIST} = require("./actionTypes");


function receivedArticle(article) {
    return {
        type: GET_ARTICLE,
        article:article.article
    }
}
function receivedArticleList(articles){
    return {
        type: GET_ARTICLE_LIST,
        articles:articles
    }
}

module.exports.receivedArticle = receivedArticle;
module.exports.receivedArticleList = receivedArticleList;