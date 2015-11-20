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

function register (state,success,error){
    request
        .post('/register')
        .send({
            name:state.name,
            email:state.email,
            password:state.pass,
            location:state.location,
        }).end(function(err,res){
            if (res && res.ok) {
                success(res.body);
            } else {
                error(res.text);
            }
        });
}
function login (email,pass,success,error){
    request
        .post('/login')
        .send({
            email:email,
            password:pass
        }).end(function(err,res){
            if (res && res.ok) {
                success(res.body);
            } else {
                error(res.text);
            }
        });
}
function resetPass (email,success,error){
    request
        .post('/resetpass')
        .send({
            email: email
        }).end(function(err,res){
            if (res && res.ok) {
                success(res.body);
            } else {
                error(res.text);
            }
        });
}
function changePass (resetToken,pass,success,error){
    request
        .post('/reset/'+resetToken)
        .send({
            pass: pass
        }).end(function(err,res){
            if (res && res.ok) {
                success(res.body);
            } else {
                error(res.text);
            }
        });
}

module.exports.getJSON = getJSON;
module.exports.register = register;
module.exports.login = login;
module.exports.resetPass = resetPass;
module.exports.changePass = changePass;