// var mysql =require('mysql');


// var db=mysql.createPool({
//     connectionLimit:10,
//     host:'10.3.136.30',
//     user:'root',
//     password:'',
//     database:'village'
// })

// module.exports={
//     select:function(_sql,_callback){
//         db.query(_sql,function(error,results,fields){
//             if(error){
//                 _callback({status:false,error:error})
//             }else{
//                 //_callback({status:true,data:{results:results}});
//                 //_callback({status:true,data:{results, fields}});
//                 _callback({status:true,data:{results:results}});
//             }
//         })
//     },
//     insert: function(){},
//     delete: function(){},
//     update: function(){}
var db = require('./DBHelper')
module.exports = {
	database:db,

}