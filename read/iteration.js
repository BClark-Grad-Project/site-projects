var Iteration = require('./../config').iteration;

module.exports = function(Obj, cb){
	Iteration
		.find(Obj)
		.sort('start')  // mongoose has many methods of doing sort, look out for developer changes
		.exec(function(err, results){
			if(err){return cb(err, null);}
			
			for(var i in results){
				results[i] = results[i].getData();
			}
			return cb(null, results);
		});	
};