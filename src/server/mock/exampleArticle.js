var ObjectId = require("mongodb").ObjectId;
module.exports.rawArticle = function(){
 return {
    "_id":new ObjectId(),
    "meta": {
        "keywords":[],
        "description":"",
        "author":"DummyUser",
        "createdAt":new Date(),
        "active":false
    },
    "article":{
        "title":"",
        "subTitle":"",
        "text":"",
        "titlePicture":{"title":"Wuff","url":"http://material-ui.com/images/grid-list/water-plant-821293_640.jpg"}
    }


}
};