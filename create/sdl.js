var SDL = require('./../models/sdl');

module.exports = function(createObj, cb){
    var name        = createObj.name        ? createObj.name        : undefined;
    var start       = createObj.start       ? createObj.start       : undefined;
    var stop        = createObj.stop        ? createObj.stop        : undefined;
    var status      = createObj.status      ? createObj.status      : undefined;
    var description = createObj.description ? createObj.description : undefined;
    var iteration   = createObj.iteration   ? createObj.iteration   : undefined;
	
    var Obj = new SDL({
	    name:        name,
	    start:       start,
	    stop:        stop,
	    status:      status,
	    vision:      vision,
	    description: description,
	    iteration:   iteration
	});	
	
	Obj.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, Obj.getData());
    });
};