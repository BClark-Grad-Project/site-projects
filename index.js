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
	R({active:true}, function(err, project){
	  var projectObj = {};
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
			
			projectObj.iteration = [];
			projectObj.task = [];
			projectObj.stories = [];
			console.log(project, projectObj);
		} 
		if(project.iteration){
			for(var i in project.iteration){
				console.log(project.iteration[i].name, 'iteration status check');
			  if(new Date(project.iteration[i].start).getTime() <= new Date().getTime()){
				  console.log(project.iteration[i].name, 'past start');
			    if(new Date(project.iteration[i].stop).getTime() >= new Date().getTime()){
						if(project.iteration[i].status === 'Complete'){
  				    console.log(project.iteration[i].name, 'make Active');
							project.iteration[i].status = 'Active';
							projectObj.iteration.push(project.iteration[i]);
						}
						if(project.iteration[i].status === 'Pending'){
  				    console.log(project.iteration[i].name, 'make Active');
							project.iteration[i].status = 'Active';
							projectObj.iteration.push(project.iteration[i]);
						}
					} else {
						if(project.iteration[i].status === 'Pending'){
  				    console.log(project.iteration[i].name, 'make Complete');
							project.iteration[i].status = 'Complete';
							projectObj.iteration.push(project.iteration[i]);
						}							
						if(project.iteration[i].status === 'Active'){
  				    console.log(project.iteration[i].name, 'make Complete');
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

