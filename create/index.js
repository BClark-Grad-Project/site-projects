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
		var projectObj = {};
		SDL(project, function(err, detail){
			var s = new Date(project.start);
			var e = new Date(project.stop);
		    var span = e.getTime() - s.getTime();
		    var span_each = span/3;
			var iter_last = s;
			var today = new Date();
			projectObj = detail;
			for(var i = 0; i < 3; i++){
				var status;
				var name = 'Sprint ' + numWritten(i); 
				var start = new Date(iter_last.getTime() + 43200000);
				var stop = new Date(start.getTime() + span_each - 43200000);
				iter_last = stop;
				if(today.getTime() >= start.getTime()){
					status = 'Active';
				} else {
					status = 'Pending';
				}
				var iteration = {
					name:name,
					start:start,
					stop:stop,
					status:status,
					sdl:id
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
		cb('!No project object', null);
	}
};
