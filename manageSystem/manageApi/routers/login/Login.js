var express = require('express');
var app = new express();
var bodyParser = require('body-parser');

//webtoken
var jwt = require("jsonwebtoken");

app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');

module.exports = {
	userPost:function(app,db){
		app.post('/getUsername',function(req,res){
			//验证用户名
			var name = req.body.username;
			console.log(req.body);
			db.select(`select * from manager where username = "${name}"`,function(result){
				if(result.status){
					res.send({state:'ok'});
				}else{
					res.send({state:'err'});
				}
			})
		});


		app.post('/login',function(req,res){
			// 登录验证
			var name = req.body.username;
			var password = req.body.password;
			db.select(`
				select * from manager where username = "${name}" and 
				password = "${password}"
				`,
				function(result){
					var status = result.status;
					
					if(status){
						res.send({state:'ok',msg:result.data.results[0]});
					}else{
						res.send({state:'err'});
					}
			})
		});

		app.post('/getPhone',function(req,res){
			//验证用户名
			var phone = req.body.phone;
			db.select(`select * from manager where phone = "${phone}"`,function(result){
				if(result.status){
					res.send({state:'ok'});
				}else{
					res.send({state:'err'});
				}
			})
		});


		app.post('/register',function(req,res){
			//验证用户名
			var phone = req.body.phone;
			var username = req.body.username;
			var password = req.body.password;
			db.insert(`INSERT INTO manager(id,phone,username,password) VALUES(0,?,?,?)`,[phone,username,password],function(result){
				console.log(result);
				if(result.status){
					res.send({state:'ok',username:username});
				}else{
					res.send({state:'err'});
				}
			})
		});

	}
}