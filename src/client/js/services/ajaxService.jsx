var request = require("superagent");

function getJSON(url) {
   // if (getJSON._cache[url])
     //   return Promise.resolve(getJSON._cache[url]);

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
function saveArticle(article,success,error){
    request
        .put('/articles/'+article._id)
        .send(article).end(function(err,res){
            if (res && res.ok) {
                success(res.body);
            } else {
                error(res.text);
            }
        });
}
function toggleArticle(articleId,type,success,error){
    request
        .put('/api/articles/publish/'+articleId+"/"+type)
        .end(function(err,res){
            if (res && res.ok) {
               success &&  success(res.body);
            } else {
                error && error(res.text);
            }
        });
}

function createArticle(success,error){
    request
        .post('/api/articles')
        .end(function(err,res){
            if (res && res.ok) {
                success &&  success(res.body);
            } else {
                error && error(res.text);
            }
        });
}

function uploadImage(fileList,success,error){
    var file = fileList[0];
    request
        .post("/images")
        .attach("image",file)
        .end(function(err,res){
            if (res && res.ok) {
                success &&  success(res.body);
            } else {
                error && error(res.text);
            }
        });
}
function toggleUserRole(accountId,role,success,error){
    request
        .put("/api/users/"+accountId+"/"+role)
        .end(function(err,res){
            if (res && res.ok) {
                success &&  success(res.body);
            } else {
                error && error(res.text);
            }
        });
}
function deleteArticle(id,success,error){
    request
        .delete("/api/articles/"+id)
        .end(function(err,res){
            if (res && res.ok) {
                success &&  success(res.body);
            } else {
                error && error(res.text);
            }
        });
}
function addComment(id,comment,success,error){
    request
        .put("/api/articles/"+id+"/comment")
        .send({comment:comment})
        .end(function(err,res){
            if (res && res.ok) {
                success &&  success(res.body);
            } else {
                error && error(res.text);
            }
        });
}
function registerForEvent(wholeWeek,success,error){
    request
      .post("/api/user/registerForEvent")
      .send({wholeWeek:wholeWeek})
      .end(function(err,res){
          if (res && res.ok) {
              success &&  success(res.body);
          } else {
              error && error(res.text);
          }
      });
}function setRegistrationActive(active,success,error){
    request
      .put("/api/config/registration/"+active)
      .end(function(err,res){
          if (res && res.ok) {
              success &&  success(res.body);
          } else {
              error && error(res.text);
          }
      });
}
module.exports.getJSON = getJSON;
module.exports.register = register;
module.exports.login = login;
module.exports.resetPass = resetPass;
module.exports.changePass = changePass;
module.exports.saveArticle = saveArticle;
module.exports.toggleArticle = toggleArticle;
module.exports.createArticle = createArticle;
module.exports.deleteArticle = deleteArticle;
module.exports.uploadImage = uploadImage;
module.exports.addComment = addComment;
module.exports.toggleUserRole = toggleUserRole;
module.exports.registerForEvent = registerForEvent;
module.exports.setRegistrationActive = setRegistrationActive;
