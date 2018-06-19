var mysql = require('mysql');

var db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: 'root',
    password: 'root',
    database: 'minshu_database'
})



module.exports = {
    select: function(_sql, _callback){
        db.query(_sql, function(error, results,fields){
            console.log(results);
            if(error || results.length == 0){
                _callback({status: false, error: error})
            }else if(results.length > 0){
                _callback({status: true, data: {results}});
            }
           
            
        })
    },
    insert: function(_sql,_sql1,_callback){
         
        db.query(_sql,_sql1, function(error, results,fields){
           
            if(error){ 
                _callback({status: false, error: error})
            }else{ 
                _callback(results);
            }
           
            
        })
    },
    delete: function(_sql, _callback){
        db.query(_sql, function(error, results,fields){
            console.log(results);
            if(error || results.length == 0){
                _callback({status: false, error: error})
            }else if(results.length > 0){
                _callback({status: true, data: {results}});
            }
            
        })
    },
    
  update: function(_sql, _callback){
        db.query(_sql, function(error, results,fields){
            console.log(results);
            if(error || results.length == 0){
                _callback({status: false, error: error})
            }else if(results.length > 0){
                _callback({status: true, data: {results}});
            }
            
        })
    }
}