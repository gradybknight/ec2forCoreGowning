const mysql = require('mysql');

// MySQL consts
const dbhost = 'gowning-db.cpghyvutjhqg.us-east-1.rds.amazonaws.com';
const dbuser = 'gradyknight';
const dbpassword = 'watson78';
const dbname = 'gowning_db';

module.exports = {
    addUser: function(userInformation){
        console.log(`called function with ${userInformation}`);
        return new Promise(function(resolve, reject){
            let connection = mysql.createConnection({
                host:dbhost,
                user:dbuser,
                password:dbpassword,
                database:dbname
            });
            connection.query('INSERT INTO users SET ?', userInformation, function(err, results, fields) {
                if (err) {
                    console.log(err);
                    connection.end();
                    reject(err);
                } else {
                    console.log(`no errors received`);
                    connection.end();
                    resolve(results);
                };
            })
        })
    },
    addEntranceTransaction: function(initials, timeStamp){

    },
    addExitTransaction: function(initials, glove, gown, timeStamp){

    },
    getLoggedInUsers: function(){

    },
    getTransactionsFromWeeknumber: function(weekNumber, year) {

    }
};