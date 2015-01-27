// Get the database(db) configuration & functions.
var db = require('./config');

// Get & Post information.
//var get  = require('./get');
//var post = require('./post');

// C.R.U.D. functions.
var C = require('./create');
var R = require('./read');
var U = require('./update');
var D = require('./delete');

//module.exports.get  = get;
//module.exports.post = post;

module.exports.create = function(Obj, cb){
	console.log('site-projects', Obj);
	db.open();
	C(Obj, function(err, data){
	    db.close();
		if(err){return cb(err, null);}
    	
		
		return cb(null, data);
	});
};

module.exports.read = function(Obj, cb){
	console.log('site-projects', Obj);
	db.open();
	R(Obj, function(err, data){
	    db.close();
		if(err){return cb(err, null);}
    	
		
		return cb(null, data);
	});
};


module.exports.update = function(Obj, cb){
	console.log('site-projects', Obj);
	db.open();
	R(Obj, function(err, data){
	    db.close();
		if(err){return cb(err, null);}
    	
		
		return cb(null, data);
	});
};

module.exports.remove = function(Obj, cb){
	console.log('site-projects', Obj);
	db.open();
	R(Obj, function(err, data){
	    db.close();
		if(err){return cb(err, null);}
    	
		
		return cb(null, data);
	});
};


