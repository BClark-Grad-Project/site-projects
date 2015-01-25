var mongo = require('mongoose');

var storySchema = mongo.Schema({
	name:        {type: String},
	description: {type: String},
	weight:      {type: Number},
	status:      {type: String}
});

storySchema.methods.getData = function(){
	return {
		id:		     this._id,
	    name:        this.name,
	    description: this.description,
	    weight:      this.weight,
	    status:      this.status
	};
};

module.exports = mongo.model('Story', storySchema);