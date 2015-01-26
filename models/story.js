var mongo = require('mongoose');

var storySchema = mongo.Schema({
	name:        {type: String},
	description: {type: String},
	weight:      {type: Number},
	status:      {type: String},
	task  :      {type: mongo.Schema.Types.ObjectId,
                  ref: 'Task'},
    sdl:         {type: mongo.Schema.Types.ObjectId,
	              ref: 'SDL'},
	active:      {type: Boolean, 'default':true}
});

storySchema.methods.getData = function(){
	return {
		id:		     this._id,
	    name:        this.name,
	    description: this.description,
	    weight:      this.weight,
	    status:      this.status,
	    sdl:         this.sdl,
	    active:      this.active
	};
};

module.exports = mongo.model('Story', storySchema);