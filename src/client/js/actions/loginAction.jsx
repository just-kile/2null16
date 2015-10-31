module.exports.LOGIN = "LOGIN";
module.exports.REGISTER = "REGISTER";

module.exports.register = function(credentials){
    return {
        type:"REGISTER",
        credentials
    }
};

