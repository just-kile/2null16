var promise = require("bluebird");
var fs = require("fs");
var mongoClient = require("./../clients/mongoClient");
module.exports.list = function(){
 return mongoClient.getImageList();
};
module.exports.get = function(){
    return new promise(function(resolve,reject){

    })
};


module.exports.upload = function(request){
    return new promise(function(resolve,reject){
        var data = request.payload;

        if (data.image) {

            var name = data.image.hapi.filename;
            var fileEnding = getFileEnding(data.image.hapi.headers["content-type"]);
            var fileName = "image_"+new Date().getTime()+fileEnding;
            var path = (process.env.IMAGE_DIRNAME || "./tmp/") + fileName;
            var file = fs.createWriteStream(path);
            file.on('error', function (err) {
                console.error(err);
                reject(err);
            });

            data.image.pipe(file);
            data.image.on('end', function (err) {
                if(err){
                    console.error(err);
                    reject(err);
                }
                mongoClient.saveImageUrl({
                    url:"/images/"+fileName,
                    title:data.image.hapi.filename
                }).then(function(){
                    var ret = {
                        filename: fileName,
                        headers: data.image.hapi.headers
                    };
                    resolve(ret);
                });

            });
        }
    })
}

function getFileEnding(contentType){
    switch(contentType){
        case "image/jpeg":
            return ".jpg"
        case "image/png":
            return ".png"
        case "image/gif":
            return ".gif"

    }
}