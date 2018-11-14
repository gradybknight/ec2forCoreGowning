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
router.route('/sendtimepointdata')
  .post((req,res) => {
    let timePointMessage = JSON.parse(req.body.timePointMessage);
    if (timePointMessage.secretCode === secretCode) {
      let returnMessage = {
          message:'good data transmission',
          dataPacket:timePointMessage
      };
      if (timePointMessage.unitOperation === 'fractional') {
        rdsOperations.writeFractionalTimePoint(timePointMessage.timePointData);
      } else if (timePointMessage.unitOperation === 'pot') {
        rdsOperations.writePotTimePoint(timePointMessage.timePointData);
      }
      


      console.log('matched password');
      console.log(timePointMessage);
      res.json(returnMessage);
    } else {
      console.log('failed password');
      console.log(timePointMessage);
      res.json({message:'why are you sending me bad data from ${req.socket.remoteAddress}?'})
    }
  });

router.route('/adduser')
  .post((req,res) => {
    let transmittedMessage = JSON.parse(req.body.transmittedMessage);
    if (transmittedMessage.spaVersion = spaVersion) {
        rdsOperations.addUser(transmittedMessage.userInformation)
            .then((results)=>{
                res.status(200);
                res.send(results);
            })
            .catch((err) => {
                res.status(500);
                res.send(err);
            });
    }
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