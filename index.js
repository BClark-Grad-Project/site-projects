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
	for(var j in Obj){
		for(var i in Comm){
		  console.log('task compare', Comm[i].id.toString() == Obj[j].iteration.toString());
			if(Comm[i].id.toString() == Obj[j].iteration.toString()){
				if(Comm[i].status == 'Active'){
				  console.log('Iteration is active', Comm[i].status);
					if(Obj[i].status == 'Pending'){
					  console.log('task is pending', Obj[i].status);
						Obj[i].status = 'Active';
						task.push(Obj[i]);
					}
				}else{
				  if(Comm[i].status == 'Pending'){
				    console.log('iteration is pending', Comm[i].status);
					  if(Obj[i].status == 'Active'){
					    console.log('task is active', Obj[i].status);
						  Obj[i].status = 'Pending';
						  task.push(Obj[i]);
					  }
					}
				}
			}
		}
	}
	return task;
};

var updateStoryCards = function(Obj, Comm){
	var stories = [];
	for(var j in Obj){
		for(var i in Comm){
			if(Comm[i].id.toString() == Obj[j].task.toString()){
  		  console.log('story compare', Comm[i].id.toString() == Obj[j].task.toString());
				if(Comm[i].status == 'Active'){
				  console.log('task is active', Comm[i].status);
					if(Obj[i].status == 'Pending'){
					  console.log('story is pending', Obj[i].status);
						Obj[i].status = 'Active';
						stories.push(Obj[i]);
					}
				}else{
				  if(Comm[i].status == 'Pending'){
				    console.log('task is pending', Comm[i].status);
					  if(Obj[i].status == 'Active'){
					    console.log('story is active', Comm[i].status);
						  Obj[i].status = 'Pending';
						  stories.push(Obj[i]);
					  }
				  }
				}
			}
		}
	}
	return stories;
};

var checkTaskStories = function(Obj, cb){
  console.log('check task stories start', Obj);
	R.getTaskStories(Obj.id, function(err, stories){
		console.log('task stories', stories);
	  var projectObj = {task:[],stories:[]};
		if(err){return cb(null, stories);}
		projectObj.stories = updateStoryCards(stories, [Obj]);
		U.updateStatus(projectObj);
		return cb(null, stories);
	});
};

var updateCheck = function(){
	R({active:true}, function(err, project){
	  var projectObj = {iteration:[],task:[],stories:[]};
		if(err){return -1;}
		if(new Date(project.start).getTime() <= new Date().getTime()){
			projectObj.id = project.id;
			if(new Date(project.stop).getTime() >= new Date().getTime()){
			  if(project.status == 'Pending'){
				  projectObj.status = 'Active';
				}
				if(project.status == 'Complete'){
				  projectObj.status = 'Active';
				}
			} else {
			  if(project.status == 'Complete'){
				  projectObj.status = 'Pending';
				}
			  if(project.status == 'Active'){
				  projectObj.status = 'Pending';
				}
			}
			
		} 
		if(project.iteration){
			for(var i in project.iteration){
			  console.log('start');
			  if(new Date(project.iteration[i].start).getTime() <= new Date().getTime()){
			    console.log('past start');
			    if(new Date(project.iteration[i].stop).getTime() >= new Date().getTime()){
			      console.log('before stop', project.iteration[i].status);
					  if(project.iteration[i].status == 'Complete'){
						  project.iteration[i].status = 'Active';
						  projectObj.iteration.push(project.iteration[i]);
					  }
					  if(project.iteration[i].status == 'Pending'){
						  project.iteration[i].status = 'Active';
						  projectObj.iteration.push(project.iteration[i]);
					  }
				  } else {
				    console.log('past stop', project.iteration[i].status);
					  if(project.iteration[i].status == 'Pending'){
						  project.iteration[i].status = 'Complete';
						  projectObj.iteration.push(project.iteration[i]);
					  }							
					  if(project.iteration[i].status == 'Active'){
						  project.iteration[i].status = 'Complete';
						  projectObj.iteration.push(project.iteration[i]);
					  }
				  }							
			  } else {		
			    console.log('before start', project.iteration[i].status);			  
			    if(project.iteration[i].status == 'Active'){
		        console.log(project.iteration[i].name, 'make Pending');
  				  project.iteration[i].status = 'Pending';
					  projectObj.iteration.push(project.iteration[i]);
	  		  }							
		    	if(project.iteration[i].status == 'Complete'){
		        console.log(project.iteration[i].name, 'make Pending');
			  	  project.iteration[i].status = 'Pending';
				    projectObj.iteration.push(project.iteration[i]);
			    }
			  }	
			} 
		}
		if(project.task){
		  console.log('start task');
			projectObj.task = updateTaskCards(project.task, projectObj.iteration);
		}
		if(project.stories){
		  console.log('start stories');
			projectObj.stories = updateStoryCards(project.stories, projectObj.task);
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
	C(Obj, function(err, data){
		if(err){return cb(err, null);}    	
		
		return cb(null, data);
	});
};

module.exports.read = function(Obj, cb){
	console.log('site-projects', Obj);
	//updateCheck();
	R(Obj, function(err, data){
		if(err){return cb(err, null);}    	
		
		return cb(null, data);
	});
};


module.exports.update = function(Obj, cb){
	console.log('site-projects', Obj);
	if(Obj.task){
		if(Obj.task.iteration){
		  checkTaskStories(Obj.task, function(err, stories){	    
		    U(Obj, function(err, data){
			    if(err){return cb(err, null);}	        	
			
			    return cb(null, data);
		    });
		  });
		} else {
		    U(Obj, function(err, data){
				    if(err){return cb(err, null);}
		        					
				    return cb(null, data);
			});
		}
	} else {
	  U(Obj, function(err, data){
		  if(err){return cb(err, null);}
      			
		  return cb(null, data);
	  });
	}
};

module.exports.remove = function(Obj, cb){
	console.log('site-projects', Obj);
	D(Obj, function(err, data){
		if(err){return cb(err, null);}
    	
		
		return cb(null, data);
	});
};
