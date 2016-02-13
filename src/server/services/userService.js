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
function changeUserRole(req){
    var accountId= req.params.accountId;
    var role= req.params.role;
    return dao.setUserRole(accountId,role)
}
function getUser(request){
    var userId = _.get(request.auth,"credentials.id");
    return dao.getUser(userId)
      .then(function(user){
          return {
              _id:user._id,
              name:user.name,
          }
      });
}
function registerUser(request){
    var userId = _.get(request.auth,"credentials.id");
    var wholeWeek = request.payload.wholeWeek;
    return dao.registerUser(userId,wholeWeek)
      .then(function(user){
          return {
              name:user.name,
              registration:user.registration
          }
      });
}
function getRegistrationCount(){
    return dao.getRegistrationCount();
}
module.exports = {
    getUsers,
    changeUserRole,
    getRegistrationCount,
    getUserNames,
    getUser,
    registerUser
};