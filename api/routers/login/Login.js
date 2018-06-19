var express = require('express');
var app = new express();
var bodyParser = require('body-parser');
var db = require('../../db/DBHelper');
//webtoken
var jwt = require("jsonwebtoken");


module.exports = {
	userPost:function(app,db){
		app.post('/getUsername',function(req,res){
			//验证用户名
			var name = req.body.username;
			var password = req.body.password;
			var nicheng = req.body.nicheng;
			db.select(`select * from user where user_phone = "${name}"`,function(result){
				if(result.status){
					res.send({state:'ok'});
				}else{
					res.send({state:'err'})
				}
			})

		});

		// 把用户名、电话、密码写入数据库
		app.post('/LoginIn',function(req,res){
			
			var name = req.body.username;
			var password = req.body.password;
			var nicheng = req.body.nicheng;
			
		    db.insert(
		    	`insert into user (user_phone,username,password) VALUES (?,?,?)`,
		    	[name,nicheng,password],function(result){
					res.send(result)
			})

		});

		// 登录
		app.post('/Login',function(req,res){
			// 登录验证
			var name = req.body.username;
			var password = req.body.password;

		
			db.select(`
				select * from user where user_phone = "${name}" and 
				password = "${password}"
				`,
				function(result){
					var status = result.status;
			
					if(status){
						res.send({state:'ok',nc:result.data.results[0]});
					}else{
						res.send({state:'err'});
					}
			})
		});

		app.post('/orderlist',function(req,res){

			var name1 = JSON.stringify(req.body.user_id);
			
			db.select(`select * from orders as a, product as b,user as c where a.user_ID = ${name1} and a.product_ID = b.product_id and a.user_ID = c.user_id`,
				function(result){
					res.send(result)
			})
		})

		app.post('/orderpage',function(req,res){

			var name1 = JSON.stringify(req.body.oname);
			
			db.select(`select * from orders as a, product as b,user as c where a.order_id = ${name1} and a.product_ID = b.product_id and a.user_ID = c.user_id`,
				function(result){
					
					res.send(result);
			})
		})

		
		app.post('/qxdd',function(req,res){

			var name1 = JSON.stringify(req.body.oname);
			
			db.delete(`DELETE FROM orders where order_id = ${name1}`,
				function(result){
					var status = result.status;
					console.log(status)
					if(true){
						res.send({state:'ok'});
					}else{
						res.send({state:'err'});
					}
			})
		})

		app.post('/pay',function(req,res){
			
		  var name1 = JSON.stringify(req.body.oname);
			console.log(name1)
			db.select(`select * from user where user_phone = ${name1}`,
				function(result){
					db.update(`update orders set status= 1 where order_id = ${name1}`,function(res){

					})
			})
		})

		
	}
}

		

// insert:function(table_name,key,condition,value_arr,callback){
//         // var  addSql = 'INSERT INTO user(id,username,password) VALUES(0,?,?)';
//         var  addSql = `INSERT INTO ${table_name}(${key}) VALUES(${condition})`;
//         // var  addSqlParams = ['111', '222'];
//         var  addSqlParams = value_arr;
//         //增
//         connection.query(addSql,addSqlParams,function (err, result) {
//                 if(err){
//                     callback({status: false, error: err});
//                 } else {
//                     callback({status: true, data: result});
//                 }  
//         });
//     },
