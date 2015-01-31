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
		project.start = new Date(project.start).getTime() + 86400000;
		project.stop = new Date(project.stop).getTime() + 86400000;
		
		if(new Date(project.start).getTime() <= new Date().getTime()){
			project.status = 'Active';
		}
		SDL(project, function(err, detail){
			if(err){return cb(err, null);}
			var s = new Date(project.start);
			var e = new Date(project.stop);
		    var span = e.getTime() - s.getTime();
		    var span_each = span/3;
			var iter_last = s;
			projectObj = detail;
			projectObj.iteration = [];
			for(var i = 0; i < 3; i++){
				var status = '';
				var name = 'Sprint ' + numWritten(i); 
				var start = new Date(iter_last.getTime());
				var stop = new Date(start.getTime() + span_each);
				iter_last = stop;
				if(start.getTime() <= new Date().getTime()){
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
