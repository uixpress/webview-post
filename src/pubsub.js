function pubsub() {
    this.funcs = {};
};

pubsub.prototype.subscribe = function(label, func){
    if(label && !this.funcs[label]){
        this.funcs[label] = func;
    }
}

pubsub.prototype.publish = function(label, params = {}){
    if(label && this.funcs[label]){
        this.funcs[label](params);
    }
}

module.exports = new pubsub();