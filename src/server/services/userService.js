var dao = require("./../clients/mongoClient"),
    _=require("lodash");

function getUsers(){
    return dao.getUsers().then(function(accounts){
        return _.map(accounts,function(account){
            return {
                _id:account._id,
                name:account.name,
                email:account.email,
                role:account.role
            }
        })
    });
}

function getUserNames(){
    return dao.getUsers().then(function(accounts){
        return _.map(accounts,function(account){
            return {
                _id:account._id,
                name:account.name
            }
        })
    });
}
function changeUserRole(req,response){
    var accountId= req.params.accountId;
    var role= req.params.role;
    return dao.setUserRole(accountId,role)
}

module.exports = {
    getUsers: getUsers,
    changeUserRole:changeUserRole,
    getUserNames:getUserNames
};