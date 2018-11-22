// ***********************************************   Package Imports   ************************************************
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = express.Router();

const rdsOperations = require('./database/rdsOperations');
// ***********************************************   Express Server Setup   *******************************************
const PORT = 3000;
const app = express();
const spaVersion = 'morecowbell';

// CORS
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);  
app.use(router);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ***********************************************   Routes   *******************************************
router.route('/adduser')
  .post((req,res) => {
    let transmittedMessage = (req.body);
    if (transmittedMessage.spaVersion === spaVersion) {
        rdsOperations.addUser(transmittedMessage.userInformation)
            .then((results)=>{
                res.status(200);
                res.send(results);
            })
            .catch((err) => {
                res.status(500);
                res.send(err);
            });
    } else {
        res.status(500);
        res.send('go away');
    }
  })

router.route('/transactionsintimeperiod')
  .post((req,res) => {
    let transmittedMessage = req.body;
    console.log(req.body);
    rdsOperations.getTransactionsInTimePeriod(transmittedMessage)
      .then((results) => {
        res.status(200);
        res.send(results);
      })
      .catch(err => {
        res.status(500);
        res.send(err);
      });
  });

router.route('/usersincore')
  .get((req,res) => {
    rdsOperations.getLoggedInUsers()
        .then((results)=>{
          res.status(200);
          res.send(results);
        })
        .catch((err) => {
          res.status(500);
          res.send(err);
        });
  });

router.route('/getallknownusers')
  .get((req,res) => {
    rdsOperations.getAllKnownUsers()
      .then((results) => {
        res.status(200);
        res.send(results);
      })
      .catch((err) => {
        res.status(500);
        res.send(err)
      });
  });

router.route('/newentry')
  .post((req,res)=>{
    let entryTransaction = req.body;
    console.log(entryTransaction);
    rdsOperations.newentry(entryTransaction)
      .then(results => {
        res.status(200);
        res.send(results);
      })
      .catch(error => {
        res.status(500);
        res.send(error);
      });
  })

router.route('/systemclearedtransaction')
  .post((req,res) => {
    let existingTransactionID = req.body;
    console.log(existingTransactionID);
    rdsOperations.systemClearedTransaction(existingTransactionID)
      .then(results => {
        res.status(200);
        res.send(results);
      })
      .catch(error => {
        res.status(500);
        res.send(error);
      });
  })

router.route('*')
  .get((req,res) => {
    var userIP = req.socket.remoteAddress;
    console.log(`user from ${userIP} just pinged the server`);
    res.send(`user from ${userIP} just pinged the server`);
  });

// ***********************************************   Start API server   ****************************************
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});