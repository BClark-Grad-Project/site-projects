var SDL = require('./sdl');
var Iteration = require('./iteration');
var Task = require('./task');
var Story = require('./story');

var iterationStatus = function(iteration, value){
	for(var i in iteration){
		Iteration({id:iteration[i].id, status:value},function(err, data){});
	}
	if(err){return cb(err, null);}
	return cb(null, 'Success');
};

var taskStatus = function(task, value){
	for(var i in task){
		Task({id:task[i].id, status:value},function(err, data){});
	}
};

var storyStatus = function(stories, value){
	for(var i in iteration){
		Story({id:stories[i].id, status:value},function(err, data){});
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

module.exports.updateStatus = function(project, value){
	if(project){
		if(project.iteration){
			iterationStatus(project.iteration, value);
		} else if(project.task){
			taskStatus(project.task, value);
		} else if(project.stories){
			storyStatus(project.stories, value);
		} else {
			Project({id:project.id, status:value},function(err, data){});
		}
	} 
};
