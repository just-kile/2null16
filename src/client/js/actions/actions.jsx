const {GET_ARTICLE,
    GET_ARTICLE_LIST,
    GET_ARTICLE_START,
    GET_ARTICLE_LIST_START} = require("./actionTypes");


function receivedArticle(article) {
    return {
        type: GET_ARTICLE,
        article:article.article
    }
}
function receiveArticleStart() {
    return {
        type: GET_ARTICLE_START
    }
}

function receivedArticleList(articles){
    return {
        type: GET_ARTICLE_LIST,
        articles:articles
    }
}

function receiveArticleListStart(){
    return {
        type: GET_ARTICLE_LIST_START
    }
}

module.exports.receivedArticle = receivedArticle;
module.exports.receivedArticleList = receivedArticleList;
module.exports.receiveArticleStart = receiveArticleStart;
module.exports.receiveArticleListStart = receiveArticleListStart;