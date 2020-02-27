var mysql = require('mysql');

var db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'test'
})

db.getConnection(function(err, connection) {
    if(err) console.log('MySQL数据库建立连接失败。');
    else{
        console.log('数据库建立连接成功。');
        connection.query( 'select * from user', function(err, data) {
            if(err) console.log('查询数据操作失败。');
            else{
                console.log('查询数据成功！');
                // db.end();
            }
        });
    }
});


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