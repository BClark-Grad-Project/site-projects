var Story = require('./../config').story;

module.exports = function(Obj, cb){
	Story
		.find(Obj)
		.exec(function(err, results){
			if(err){return cb(err, null);}
			
			for(var i in results){
				results[i] = results[i].getData();
			}
			return cb(null, results);
		});	
};