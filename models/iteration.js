var mongo = require('mongoose');

var iterationSchema = mongo.Schema({
    	name:    {type: String},
    	start:   {type: Date},
    	stop:    {type: Date},
    	status:  {type: String},
    	task:   [{type: mongo.Schema.Types.ObjectId,
	              ref: 'Task'}],
	   	active:  {type: Boolean, 'default':true}
});

iterationSchema.methods.getData = function(){
	return {
		id:		     this._id,
	    name:        this.name,
	    start:       this.start,
	    stop:        this.stop,
	    status:      this.status,
	    task:        this.task,
	    active:      this.active
	};
};

module.exports = mongo.model('Iteration', iterationSchema);