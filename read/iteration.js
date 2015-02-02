var Iteration = require('./../config').iteration;

module.exports = function(Obj, cb){
	Iteration
		.find(Obj)
		.exec(function(err, results){
			if(err){return cb(err, null);}
			
			for(var i in results){
				results[i] = results[i].getData();
			}
			return cb(null, results);
		});	
};