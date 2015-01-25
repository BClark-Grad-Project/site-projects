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
	if(project){
		if(project.detail){
		    var span = new Date(project.detail.stop).getTime() - new Date(project.detail.start).getTime();
		    var span_each = span/3;
			var iter_last = new Date(project.detail.start).getTime;
			var projectObj = {};
			var today = new Date();
			for(var i = 0; i < 3; i++){
				var status;
				var name = 'Sprint ' + numWritten(i);
				var start = new Date(iter_last + 100);
				var stop = new Date(start + span_each - 100);
				iter_last = stop.getTime();
				if(today.getTime() <= start.getTime()){
					status = 'Active';
				} else {
					status = 'Pending';
				}
				var iteration = {
					name:name,
					start:start,
					stop:stop,
					status:status
				};
				Iteration(iteration, function(err, iter){
					if(err){return cb(err, null);}
					
					if(i === 2){
						SDL(project.detail, function(err, sdl){
							if(err){return cb(err, null);}
							return cb(null, projectObj);
						});
					}			
				});
			}
		} else {
			cb('!Not valid object', null);
		}
	} else {
		cb('!No project object', null);
	}
};
