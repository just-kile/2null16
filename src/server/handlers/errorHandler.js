module.exports = function errorHandler(reply){
    return function(error){
        console.error(error);
        reply(error || "Not found");
    }
};