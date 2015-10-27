var request = require("superagent");

function getJSON(url) {
    if (getJSON._cache[url])
        return Promise.resolve(getJSON._cache[url]);

    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.onload = function () {
            if (req.status === 404) {
                reject(new Error('not found'));
            } else {
                var data = JSON.parse(req.response);
                resolve(data);
                getJSON._cache[url] = data;
            }
        };
        req.open('GET', url);
        req.send();
    });
}
getJSON._cache = {};

function auth (name,username,pass,success,error){


    request
        .post('/login')
        .send({
            user:username,
            name:name,
            password:pass
        }).end(function(err,res){
            if (res.ok) {
                success(res.body);
            } else {
                error(res.text);
            }
        });
}


module.exports.getJSON = getJSON;
module.exports.auth = auth;