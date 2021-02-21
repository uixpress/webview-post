const ps = require("./pubsub");

function webview(){
    this.appInstance = null;
};

function postAppMessage(label, msg) {
    if (window.webkit != undefined) {
        if (window.webkit.messageHandlers.appInterface != undefined) {
            const stamp = Date.now();
            window.webkit.messageHandlers.appInterface.postMessage({label, msg, stamp});
        }
    }
    if (window.appInterface != undefined) {
        const stamp = Date.now();
        window.appInterface.postMessage({label, msg, stamp});
    }
}

webview.prototype.config = function({appInstance = 'webviewPost'}){
    window[appInstance] = {};
    this.appInstance = appInstance;
};

webview.prototype.subscribe = function(type, func){
    if(!this.appInstance) this.config({});
    window[this.appInstance][type] = func;
    ps.subscribe(type, func);
}

webview.prototype.publish = function(type, payload){
    if(!this.appInstance) this.config({});
    postAppMessage({
        type,
        payload,
    })
    ps.publish(type, payload)
}

module.exports = new webview();