var Task = require('./../models/task');

module.exports = function(createObj, cb){
    var name        = createObj.name        ? createObj.name        : undefined;
    var description = createObj.description ? createObj.description : undefined;
    var status      = createObj.status      ? createObj.status      : undefined;
    var story       = createObj.story       ? createObj.story       : undefined;
	
    var Obj = new Task({
	    name:        name,
	    description: description,
	    status:      status,
	    story:       story
	});	
	
	Obj.save(function (err) {
        if (err){
        	return cb(err, null);
        }
        return cb(null, Obj.getData());
    });
};