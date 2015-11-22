var GET_ARTICLE = require("./../actions/actionTypes").GET_ARTICLE;
var GET_ARTICLE_START = require("./../actions/actionTypes").GET_ARTICLE_START;
var GET_ARTICLE_LIST = require("./../actions/actionTypes").GET_ARTICLE_LIST;
var GET_ARTICLE_LIST_START = require("./../actions/actionTypes").GET_ARTICLE_LIST_START;
var GET_USERS= require("./../actions/actionTypes").GET_USERS;
var GET_USERS_START = require("./../actions/actionTypes").GET_USERS_START;
var ACTIVATE_AJAX = require("./../actions/actionTypes").ACTIVATE_AJAX;
module.exports = function(state,action){
    switch(action.type){
        case GET_ARTICLE:
            return Object.assign({}, state, {
                article: action.article
            });
        case GET_ARTICLE_START:
            return Object.assign({}, state, {
                article: null
            });
        case GET_ARTICLE_LIST:
            return Object.assign({}, state, {
                articles: action.articles.articles
            });
        case GET_USERS_START:
            return Object.assign({}, state, {
                users: null
            });
        case GET_USERS:
            return Object.assign({}, state, {
                users: action.users.users
            });
        case ACTIVATE_AJAX:
            return Object.assign({}, state, {
                activateAjax: action.activateAjax
            });
        default:
            return state;
    }
    return state;
};