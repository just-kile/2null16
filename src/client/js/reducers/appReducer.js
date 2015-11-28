var GET_ARTICLE = require("./../actions/actionTypes").GET_ARTICLE;
var GET_ARTICLE_START = require("./../actions/actionTypes").GET_ARTICLE_START;
var GET_ARTICLE_LIST = require("./../actions/actionTypes").GET_ARTICLE_LIST;
var GET_ARTICLE_LIST_START = require("./../actions/actionTypes").GET_ARTICLE_LIST_START;
var GET_USERS= require("./../actions/actionTypes").GET_USERS;
var GET_USERS_START = require("./../actions/actionTypes").GET_USERS_START;
var GET_IMAGES= require("./../actions/actionTypes").GET_IMAGES;
var GET_IMAGES_START = require("./../actions/actionTypes").GET_IMAGES_START;
var ACTIVATE_AJAX = require("./../actions/actionTypes").ACTIVATE_AJAX;
var CHANGE_DASHBOARD_TEXTAREA = require("./../actions/actionTypes").CHANGE_DASHBOARD_TEXTAREA;
var _ = require("lodash");
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
        case GET_IMAGES_START:
            return Object.assign({}, state, {
                images:null
            });
        case GET_IMAGES:
            return Object.assign({}, state, {
                images: action.images.images
            });
        case ACTIVATE_AJAX:
            return Object.assign({}, state, {
                activateAjax: action.activateAjax
            });
        case CHANGE_DASHBOARD_TEXTAREA:
            return Object.assign({}, state, {
                article:{
                    article:_.extend( {},state.article.article,action.article),
                    meta:state.article.meta,
                    _id:state.article._id
                }
            });
        default:
            return state;
    }
    return state;
};