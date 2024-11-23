const mysql = require('mysql')
require('dotenv').config()

const pool = mysql.createPool({
    connectionLimit:10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306,
})


const query = (sql, params) =>{
    return new Promise((resolve,reject)=>{
        pool.query(sql,params,(err,results)=>{
            if(err) return reject(err)
            resolve(results)    
        })
    })
}

pool.getConnection((err, connection)=>{
    if(err){
        console.error("Error connecting to the database:",err.message);
    } else {
        console.log("Connected to the Mysql database!");
        connection.release()
    }
})


module.exports = {query}