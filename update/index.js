var SDL = require('./sdl');
var Iteration = require('./iteration');
var Task = require('./task');
var Story = require('./story');

var iterationStatus = function(iteration){
	for(var i in iteration){
		Iteration({id:iteration[i].id, status:iteration[i].status},function(err, data){});
	}
};

var taskStatus = function(task){
	for(var i in task){
		Task({id:task[i].id, status:task[i].status},function(err, data){});
	}
};

var storyStatus = function(stories){
	for(var i in stories){
		Story({id:stories[i].id, status:stories[i].status},function(err, data){});
	}
};

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

module.exports.updateStatus = function(project){
	if(project){
		if(project.iteration){
			iterationStatus(project.iteration);
		}
		if(project.task){
			taskStatus(project.task);
		}
		if(project.stories){
			storyStatus(project.stories);
		}
		SDL({id:project.id, status:project.status},function(err, data){});
	} 
};
