var Iteration = require('./../config').iteration;

module.exports = function(updateData, cb){
	var id = updateData.id;
	delete updateData.id;
	
	Iteration.findOneAndUpdate({_id:id}, updateData, {}, function(err, result){
		if(err){return cb(err, null);}
		
		return cb(null, result.getData());
	});
};