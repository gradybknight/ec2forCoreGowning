const mysql = require('mysql');

// MySQL consts
const dbhost = 'pinetoprunhistory.cpghyvutjhqg.us-east-1.rds.amazonaws.com';
const dbuser = 'pinetop';
const dbpassword = 'bacon911';
const dbname = 'productionhistory';

module.exports = {
    writeFractionalTimePoint: function(timePointData){
        let connection = mysql.createConnection({
            host:dbhost,
            user:dbuser,
            password:dbpassword,
            database:dbname
        });
        connection.query('INSERT INTO fractional SET ?', timePointData, function(err, results, fields) {
            if (err) {
                console.log(err);
                connection.end();
            } else {
                console.log(`no errors received`);
                connection.end();
            };
        })
    },
    writePotTimePoint: function(timePointData){
        let connection = mysql.createConnection({
            host:dbhost,
            user:dbuser,
            password:dbpassword,
            database:dbname
        });
        connection.query('INSERT INTO pot SET ?', timePointData, function(err, results, fields) {
            if (err) {
                console.log(err);
                connection.end();
            } else {
                console.log(`no errors received`);
                connection.end();
            };
        })
    },
    getBatchRunHistory(batchID, unitOperation){
        let connection = mysql.createConnection({
            host:dbhost,
            user:dbuser,
            password:dbpassword,
            database:dbname
        });
        let qryString = `SELECT * from productionhistory.${unitOperation} WHERE batchID = ${batchID}`;
        connection.query(qryString, function(err, results, fields) {
            if (err) {
                console.log(err);
                connection.end();
            } else {
                connection.end();
                return results;
            }
        })
    }
};