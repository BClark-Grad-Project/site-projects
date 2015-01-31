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

var updateCheck = function(){
	var projectObj = {};
	R({active:true}, function(err, project){
		if(err){return -1;}
		if(new Date(project.start).getTime() <= new Date().getTime()){
			projectObj = project;
			if(new Date(project.stop).getTime() >= new Date().getTime()){
				project.status = 'Active';
			} else {
				project.status = 'Complete';
			}
			
			delete projectObj.iteration;
			delete projectObj.task;
			delete projectObj.stories;
			projectObj.iteration = [];
			projectObj.task = [];
			projectObj.stories = [];
		}
		if(project.iteration){
			for(var i in project.iteration){
				if(new Date(project.iteration[i].start).getTime() <= new Date().getTime()){
					if(new Date(project.iteration[i].stop).getTime() >= new Date().getTime()){
						if(projectObj.iteration[i].status != 'Active'){
							projectObj.iteration.push(project.iteration[i]);
							projectObj.iteration[i].status = 'Active';
						}
					} else {
						if(projectObj.iteration[i].status != 'Complete'){
							projectObj.iteration.push(project.iteration[i]);
							projectObj.iteration[i].status = 'Complete';
						}							
					}
				} 
			}
		}
		if(project.task){
			for(var i in project.task){
				
			}
		}
		if(project.stories){
			for(var i in project.stories){
				
			}
		}
		if(projectObj){
			U.updateStatus(projectObj);
		}
	});
};

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
	updateCheck();
	R(Obj, function(err, data){
	    db.close();
		if(err){return cb(err, null);}
    	
		
		return cb(null, data);
	});
};


module.exports.update = function(Obj, cb){
	console.log('site-projects', Obj);
	db.open();
	U(Obj, function(err, data){
	    db.close();
		if(err){return cb(err, null);}
    	
		
		return cb(null, data);
	});
};

module.exports.remove = function(Obj, cb){
	console.log('site-projects', Obj);
	db.open();
	D(Obj, function(err, data){
	    db.close();
		if(err){return cb(err, null);}
    	
		
		return cb(null, data);
	});
};


