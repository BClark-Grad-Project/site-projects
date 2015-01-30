var SDL = require('./sdl');
var Iteration = require('./iteration');
var Task = require('./task');
var Story = require('./story');

module.exports.sdl       = SDL;
module.exports.iteration = Iteration;
module.exports.task      = Task;
module.exports.story     = Story;

module.exports = function(project, cb){
	if(project){
		if(project.story){
			Story(project.story, function(err, story){
				if(err){return cb(err, null);}
				
				return cb(null, story);
			});
		} else if(project.task){
			Task(project.task, function(err, task){
				if(err){return cb(err, null);}
				
				return cb(null, task);
			});
		} else if(project.iteration){
			Iteration(project.iteration, function(err, iter){
				if(err){return cb(err, null);}
				
				return cb(null, iter);
			});
		} else {
			SDL(project, function(err, sdl){
				if(err){return cb(err, null);}
				
				return cb(null, project);
			});
		}
	} else {
		return cb('!No project object', null);
	}
};
