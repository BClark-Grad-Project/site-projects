var Story = require('./../config').story;

module.exports = function(updateData, cb){
	var id = updateData.id;
	delete updateData.id;
	
	Story.findOneAndUpdate({_id:id}, updateData, {}, function(err, result){
		if(err){return cb(err, null);}
		
		return cb(null, result.getData());
	});
};