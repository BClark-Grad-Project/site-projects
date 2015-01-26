var Story = require('./../models/story');

module.exports = function(createObj, cb){
    var name        = createObj.name        ? createObj.name        : undefined;
    var description = createObj.description ? createObj.description : undefined;
    var weight      = createObj.weight      ? createObj.weight      : undefined;
    var sdl         = createObj.sdl         ? createObj.sdl         : undefined;
    var status      = createObj.status      ? createObj.status      : 'Pending';
	
    var Obj = new Story({
	    name:        name,
	    description: description,
	    weight:      weight,
	    status:      status,
	    sdl:         sdl
	});	
	
	Obj.save(function(err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, Obj.getData());
    });
};