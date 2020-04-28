import mysql from 'mysql';
import configData from '../config/config.js';
console.log(configData)
const connection = mysql.createConnection({
    host: configData.HOST,
    user: configData.USER,
    password: configData.PASSWORD,
    database: configData.DATABASE
});

connection.connect((err) => {
    if(err){
        console.log('database connection error: ', err);
    }
    console.log('database connected successfully');
})

export default connection;