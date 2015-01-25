var mongo = require('mongoose');

var iterationSchema = mongo.Schema({
    	name:    {type: String},
    	start:   {type: Date},
    	stop:    {type: Date},
    	status:  {type: String},
    	sdl:     {type: mongo.Schema.Types.ObjectId,
    	          ref: 'SDL'},
    	task:   [{type: mongo.Schema.Types.ObjectId,
	              ref: 'Task'}]
});

iterationSchema.methods.getData = function(){
	return {
		id:		     this._id,
	    name:        this.name,
	    start:       this.start,
	    stop:        this.stop,
	    status:      this.status,
	    sdl:         this.sdl,
	    task:         this.iteration
	};
};

module.exports = mongo.model('Iteration', iterationSchema);