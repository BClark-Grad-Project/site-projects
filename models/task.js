var mongo = require('mongoose');

var taskSchema = mongo.Schema({
    	name:        {type: String},
    	description: {type: String},
    	status:      {type: String},
    	story:       [{type: mongo.Schema.Types.ObjectId,
    	               ref: 'Story'}]
});

taskSchema.methods.getData = function(){
	return {
		id:		     this._id,
	    name:        this.name,
	    description: this.description,
	    status:      this.status,
	    story:       this.story
	};
};

module.exports = mongo.model('Task', taskSchema);