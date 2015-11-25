const {GET_ARTICLE,
    GET_ARTICLE_LIST,
    GET_USERS,
    GET_USERS_START,
    GET_ARTICLE_START,
    GET_ARTICLE_LIST_START,
    CHANGE_DASHBOARD_TEXTAREA,
    ACTIVATE_AJAX} = require("./actionTypes");


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
function getUsersStart(){
    return {
        type: GET_USERS_START
    }

}
function getUsers(users){
    return {
        type: GET_USERS,
        users:users
    }
}
function activateAjax(){
    return {
        type: ACTIVATE_AJAX,
        activateAjax:true
    }
}
function changeDashboardTextarea(val){
    return {
        type: CHANGE_DASHBOARD_TEXTAREA,
        article:val
    }
}
module.exports = {
    receivedArticle,
    receivedArticleList,
    receiveArticleStart,
    receiveArticleListStart,
    getUsersStart,
    getUsers,
    activateAjax,
    changeDashboardTextarea
}