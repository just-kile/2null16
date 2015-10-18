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

module.exports.getJSON = getJSON;