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
    addEntranceTransaction: function(initials, team, timeStamp){

    },
    addExitTransaction: function(initials, glove, gown, timeStamp){

    },
    getLoggedInUsers: function(){
        // console.log(`called function with ${userInformation}`);
        return new Promise(function(resolve, reject){
            let connection = mysql.createConnection({
                host:dbhost,
                user:dbuser,
                password:dbpassword,
                database:dbname
            });
            connection.query('SELECT * FROM gowning_db.transactions where exittimestamp is null;', function(err, results, fields) {
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
    getTransactionsInTimePeriod: function(timePeriod) {
        return new Promise(function(resolve, reject){
            let connection = mysql.createConnection({
                host:dbhost,
                user:dbuser,
                password:dbpassword,
                database:dbname
            });
            if (timePeriod.upperBoundry === '' ) {
                console.log('put in placeholder')
                timePeriod.upperBoundry = 4098967981
            }
            let sqlStatement = `SELECT * FROM gowning_db.transactions where (entrytimestamp > ${timePeriod.lowerBoundry}) and (entrytimestamp <= ${timePeriod.upperBoundry})`;
            connection.query(sqlStatement, function(err, results, fields) {
                if (err) {
                    console.log(err);
                    connection.end();
                    reject(err);
                } else {
                    connection.end();
                    resolve(results);
                };
            })
        }) 
    },
    systemClearedTransaction: function(existingTransactionID) {
        return new Promise(function(resolve, reject){
            let connection = mysql.createConnection({
                host:dbhost,
                user:dbuser,
                password:dbpassword,
                database:dbname
            });
            console.log(`system cleared transaction:`);
            console.log(existingTransactionID);
            let sqlStatement = `UPDATE gowning_db.transactions SET exittimestamp = ${Date.now()}, gown=0, glove=0 WHERE id = ${existingTransactionID};`;
            connection.query(sqlStatement, function(err, results, fields) {
                if (err) {
                    console.log(err);
                    connection.end();
                    reject(err);
                } else {
                    connection.end();
                    resolve(results);
                };
            })
        }) 
    },
    newentry: function(entryTransaction) {
        return new Promise(function(resolve, reject){
            let connection = mysql.createConnection({
                host:dbhost,
                user:dbuser,
                password:dbpassword,
                database:dbname
            });
            console.log(`new entry:`);
            console.log(entryTransaction);
            let sqlStatement = `insert into gowning_db.transactions (initials, team, entrytimestamp) values (${entryTransaction.initials}, ${entryTransaction.team}, ${entryTransaction.entrytimestamp});`;
            connection.query(sqlStatement, function(err, results, fields) {
                if (err) {
                    console.log(err);
                    connection.end();
                    reject(err);
                } else {
                    connection.end();
                    resolve(results);
                };
            })
        }) 
    },
    getAllKnownUsers: function() {
        return new Promise(function(resolve, reject){
            let connection = mysql.createConnection({
                host:dbhost,
                user:dbuser,
                password:dbpassword,
                database:dbname
            });
            connection.query('SELECT * FROM gowning_db.users;', function(err, results, fields) {
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
    }
};