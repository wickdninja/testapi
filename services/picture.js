var restify = require('restify');
var mongojs = require("mongojs");

/****************************************************************************
	NOTE: Checkout branch 'mockPicPay/picture' before working in this file!
					$ git checkout picture
*****************************************************************************/

//server config
var _name = "";
var _ip = "";
var _port ="";

//MongoDB config
var connection_string = _ip + ":"+_port+"/"+_name;
var db = mongojs(connection_string, [_name]);
var pics = db.collection("pictures");

/*
*	Initialize the picture RESTful endpoint
*	@param name => type:String =  app name ? "mock"
*	@param ip => type:String =  server ip address ?  "localhost"
*	@param port =>  type:String =  server port ? "8080"
*/
function initialize(name, ip, port){
	if(name !== undefined && name !== null){
		_name = (name.length > 0) ? name : "mock";
		console.log(_name);
	}
	if(ip !== undefined && ip !== null){
		_ip = (ip.length > 0) ? ip : "localhost";
		console.log(_ip);
	}
	if(port !== undefined && port !== null){
		_port = (port.length > 0) ? port : "8080";
		console.log(_port);
	}
};
/*
*	Initialize the picture RESTful endpoint
*	@param name => type:String =  app name ? "mock"
*	@param ip => type:String =  server ip address ?  "localhost"
*	@param port =>  type:String =  server port ? "8080"
*/
function findAll(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    pics.find().limit(20).sort({id : -1} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }else{
            return next(err);
        }

    });
};

/*
*	Initialize the picture RESTful endpoint
*	@param name => type:String =  app name ? "mock"
*	@param ip => type:String =  server ip address ?  "localhost"
*	@param port =>  type:String =  server port ? "8080"
*/
function find(req, res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    pics.findOne({_id:mongojs.ObjectId(req.params.id)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(200 , success);
            return next();
        }
        return next(err);
    })
};
 /*
*	Initialize the picture RESTful endpoint
*	@param name => type:String =  app name ? "mock"
*	@param ip => type:String =  server ip address ?  "localhost"
*	@param port =>  type:String =  server port ? "8080"
*/
function save(req , res , next){
    var pics = {};
    pics.title = req.params.title;
    pics.description = req.params.description;
    pics.location = req.params.location;
    pics.postedOn = new Date();

    res.setHeader('Access-Control-Allow-Origin','*');

    pics.save(job , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(201 , job);
            return next();
        }else{
            return next(err);
        }
    });
};
 /*
*	Initialize the picture RESTful endpoint
*	@param name => type:String =  app name ? "mock"
*	@param ip => type:String =  server ip address ?  "localhost"
*	@param port =>  type:String =  server port ? "8080"
*/
function remove(req , res , next){
    res.setHeader('Access-Control-Allow-Origin','*');
    pics.remove({_id:mongojs.ObjectId(req.params.id)} , function(err , success){
        console.log('Response success '+success);
        console.log('Response error '+err);
        if(success){
            res.send(204);
            return next();
        } else{
            return next(err);
        }
    })

};

exports.initialize = initialize;
exports.findAll = findAll;
exports.find = find;
exports.save = save;
exports.remove = remove;
