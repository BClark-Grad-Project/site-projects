var SDL = require('./sdl');
var Iteration = require('./iteration');
var Task = require('./task');
var Story = require('./story');

var numWritten = function(i){
	var written = '';
	
	switch(i){
		case 0:
			written = 'One';
			break;
		case 1:
			written = 'Two';
			break;
		case 2:
			written = 'Three';
			break;
	};
	
	return written;
};

module.exports.sdl       = SDL;
module.exports.iteration = Iteration;
module.exports.task      = Task;
module.exports.story     = Story;

module.exports = function(project, cb){
	if(project.task){
		var projectObj = {};
		Task(project.task, function(err, task){
			if(err){return cb(err, null);}
			
			projectObj.task = task;
			return cb(null, project);
		});
	} else if(project.story){
		var projectObj = {};
		Story(project.story, function(err, story){
			if(err){return cb(err, null);}
			
			projectObj.story = story;
			return cb(null, project);
		});
	} else if(project){
		var projectObj = {};
		if(project.start.getTime() >= new Date()){
			project.status = 'Active';
		}
		SDL(project, function(err, detail){
			if(err){return cb(err, null);}
			var s = new Date(project.start);
			var e = new Date(project.stop);
		    var span = e.getTime() - s.getTime();
		    var span_each = span/3;
			var iter_last = s;
			var today = new Date();
			projectObj = detail;
			projectObj.iteration = [];
			for(var i = 0; i < 3; i++){
				var name = 'Sprint ' + numWritten(i); 
				var start = new Date(iter_last.getTime());
				var stop = new Date(start.getTime() + span_each);
				iter_last = stop;
				if(today.getTime() >= start.getTime()){
					status = 'Active';
				}
				var iteration = {
					name:name,
					start:start,
					stop:stop,
					status:status,
					sdl:projectObj.id
				};
				var j = 0;
				Iteration(iteration, function(err, iter){
					if(err){return cb(err, null);}
					if(j !== 3){projectObj.iteration.push(iter);}
					
					j++;
					if(j === 3){						
						return cb(null, projectObj);	
					}
				});
			}
		});
	} else {
		return cb('!No project object', null);
	}
};
