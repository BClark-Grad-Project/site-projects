var SDL = require('./sdl');
var Iteration = require('./iteration');
var Task = require('./task');
var Story = require('./story');

module.exports.sdl       = SDL;
module.exports.iteration = Iteration;
module.exports.task      = Task;
module.exports.story     = Story;

module.exports = function(search, cb){
	if(search){
		SDL(search, function(err, detail){
			if(err){return cb(err, null);}
			if(detail){
				var projectObj = detail;
				var id = detail[0].id;
				Iteration({sdl:id, active:true}, function(err, iter){
					if(err){return cb(err, null);}
					
					projectObj.iteration = iter;
					Task({sdl:id, active:true}, function(err, task){
						if(err){return cb(err, null);}
						
						projectObj.task = task;
						Story({sdl:id, active:true}, function(err, stories){
							if(err){return cb(err, null);}
							
							projectObj.stories = stories;
							return cb(null, projectObj);
						});
					});
				});	
			} else {
				return cb('!No projects found', null);
			}
		});
	} else {
		return cb('!No search object', null);
	}
};
