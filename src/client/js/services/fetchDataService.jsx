var isFirst = true;
function fetchData(routes, params) {
    var data = {};
    return Promise.all(routes
            .filter(route => route.handler.fetchData)
            .map(route => {
                return route.handler.fetchData(params).then(d => {data[route.name] = d;});
            })
    ).then(() => data);
}


module.exports.fetch = function(routes,params){
if(isFirst && window.TOTR){
    isFirst = false;
    return Promise.resolve(window.TOTR);
}else{
    return fetchData(routes,params);
}
};