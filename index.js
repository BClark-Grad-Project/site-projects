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


var updateTaskCards = function(Obj, Comm){
	var task = [];
	for(var i in Comm){
		for(var j in Obj){
			if(Comm[i].id.toString() == Obj[j].iteration.toString()){
				if(Comm[i].status === 'Active'){
					if(Obj[i] === 'Pending'){
						obj[i].status = 'Active';
						task.push.Obj[i];
					}
				}
			}
		}
	}
	return task;
};

var updateStoryCards = function(Obj, Comm){
	var stories = [];
	for(var i in Comm){
		for(var j in Obj){
			if(Comm[i].id.toString() == Obj[j].task.toString()){
				if(Comm[i].status === 'Active'){
					if(Obj[i] === 'Pending'){
						obj[i].status = 'Active';
						stories.push.Obj[i];
					}
				}
			}
		}
	}
	return stories;
};

var updateCheck = function(){
	R({active:true}, function(err, project){
	  var projectObj = {iteration:[],task:[],stories:[]};
		if(err){return -1;}
		if(new Date(project.start).getTime() <= new Date().getTime()){
			projectObj.id = project.id;
			if(new Date(project.stop).getTime() >= new Date().getTime()){
			  if(project.status === 'Pending'){
				  projectObj.status = 'Active';
				}
				if(project.status === 'Complete'){
				  projectObj.status = 'Active';
				}
			} else {
			  if(project.status === 'Complete'){
				  projectObj.status = 'Pending';
				}
			  if(project.status === 'Active'){
				  projectObj.status = 'Pending';
				}
			}
			
		} 
		if(project.iteration){
			for(var i in project.iteration){
			  if(new Date(project.iteration[i].start).getTime() <= new Date().getTime()){
			    if(new Date(project.iteration[i].stop).getTime() >= new Date().getTime()){
					if(project.iteration[i].status === 'Complete'){
						project.iteration[i].status = 'Active';
						projectObj.iteration.push(project.iteration[i]);
					}
					if(project.iteration[i].status === 'Pending'){
						project.iteration[i].status = 'Active';
						projectObj.iteration.push(project.iteration[i]);
					}
				} else {
					if(project.iteration[i].status === 'Pending'){
						project.iteration[i].status = 'Complete';
						projectObj.iteration.push(project.iteration[i]);
					}							
					if(project.iteration[i].status === 'Active'){
						project.iteration[i].status = 'Complete';
						projectObj.iteration.push(project.iteration[i]);
					}
				}							
			  } else {					  
			    if(project.iteration[i].status === 'Active'){
		        console.log(project.iteration[i].name, 'make Pending');
  				  project.iteration[i].status = 'Pending';
					  projectObj.iteration.push(project.iteration[i]);
	  		  }							
		    	if(project.iteration[i].status === 'Complete'){
		        console.log(project.iteration[i].name, 'make Pending');
			  	  project.iteration[i].status = 'Pending';
				    projectObj.iteration.push(project.iteration[i]);
			    }
			  }	
			} 
		}
		if(project.task){
			projectObj.task = updateTaskCards(project.task, projectObj.iteration);
		}
		if(project.stories){
			projectObj.stories = updateStoryCards(project.stories, projectObj.task);
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

