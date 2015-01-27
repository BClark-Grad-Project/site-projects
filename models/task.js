var mongo = require('mongoose');

var taskSchema = mongo.Schema({
    	name:        {type: String},
    	description: {type: String},
    	status:      {type: String},
    	iteration:   {type: mongo.Schema.Types.ObjectId,
                      ref: 'Iteration'},
        sdl:         {type: mongo.Schema.Types.ObjectId,
	                  ref: 'SDL'},
       	active:      {type: Boolean, 'default':true}
});

taskSchema.methods.getData = function(){
	return {
		id:		     this._id,
	    name:        this.name,
	    description: this.description,
	    status:      this.status,
	    iteration:   this.iteration,
	    sdl:         this.sdl,
	    active:      this.active
	};
};

module.exports = mongo.model('Task', taskSchema);