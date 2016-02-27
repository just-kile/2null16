var dao = require("./../clients/mongoClient");
var _ = require("lodash");
var articleJson = require("../mock/exampleArticle.js");
function getConfig() {
    return dao.getConfig()
}

function setRegistrationActive(request){
    var active = request.params.active;
    return dao.setConfig({registration:active});
}
module.exports = {
    getConfig: getConfig,
    setRegistrationActive:setRegistrationActive
};