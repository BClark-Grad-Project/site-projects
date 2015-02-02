var Iteration = require('./../config').iteration;

module.exports = function(createObj, cb){
    var name    = createObj.name    ? createObj.name    : undefined;
    var start   = createObj.start   ? createObj.start   : undefined;
    var stop    = createObj.stop    ? createObj.stop    : undefined;
    var product = createObj.product ? createObj.product : undefined;
    var status  = createObj.status  ? createObj.status  : undefined;
    var sdl     = createObj.sdl     ? createObj.sdl     : undefined;
	
    var Obj = new Iteration({
	    name:        name,
	    start:       start,
	    stop:        stop,
	    status:      status,
	    product:     product,
	    sdl:         sdl
	});	
	
	Obj.save(function (err) {
        if(err){
        	return cb(err, null);
        }
        return cb(null, Obj.getData());
    });
};