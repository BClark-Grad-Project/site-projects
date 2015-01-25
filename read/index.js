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
		
	} else {
		cb('!No project object', null);
	}
};
