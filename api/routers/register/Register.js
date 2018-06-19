

module.exports = {
	addCustomer(app,db){
		app.post('/addUser',function(req,res){
			console.log(req.body);
			db.insert('customer',req.body,function(result){
				res.send(result);
			})
		})
	}
}