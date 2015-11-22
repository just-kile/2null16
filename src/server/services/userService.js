var dao = require("./../clients/mongoClient"),
    _=require("lodash");

function getUsers(){
    return dao.getUsers().then(function(accounts){
        return {users:_.map(accounts,function(account){
            return {
                _id:account._id,
                name:account.name,
                email:account.email,
            }
        })}
    });
}
module.exports = {
    getUsers: getUsers
};