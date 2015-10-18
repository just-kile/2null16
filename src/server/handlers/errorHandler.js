module.exports = function errorHandler(reply){
    return function(error){
        reply(error || "Not found").code(400);
    }
};