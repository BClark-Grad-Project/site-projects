var Task = require('./../models/task');

module.exports = function(createObj, cb){
    var name        = createObj.name        ? createObj.name        : undefined;
    var description = createObj.description ? createObj.description : undefined;
    var sdl         = createObj.sdl         ? createObj.sdl         : undefined;
    var status      = createObj.status      ? createObj.status      : 'Pending';
	
    var Obj = new Task({
	    name:        name,
	    description: description,
	    status:      status,
	    sdl:         sdl
	});	
	
	Obj.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, Obj.getData());
    });
};