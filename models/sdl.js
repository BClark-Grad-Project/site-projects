var mongo = require('mongoose');

var sdlSchema = mongo.Schema({
    	name        : {type: String},
    	start       : {type: Date},
    	stop        : {type: Date},
    	status      : {type: String},
    	vision      : {type: String},
    	description : {type: String},
    	diagrams    : [{type: String}],
    	documents   : [{type: String}],
    	active      : {type: Boolean, 'default':true}
});

sdlSchema.methods.getData = function(){
	return {
		id:		     this._id,
	    name:        this.name,
	    start:       this.start,
	    stop:        this.stop,
	    status:      this.status,
	    vision:      this.vision,
	    description: this.description,
	    active:      this.active
	};
};

module.exports = mongo.model('SDL', sdlSchema);