const express = require("express")
const functions = require("firebase-functions")
const { approvePayment, completePayment } = require("./services");
const { completedHandler, approveHandler } = require("./handlers");
const CURRENT_VERSION = 1;

const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body 
main.use(`/v${CURRENT_VERSION}`, app);
main.use(express.cors())
main.use(express.json());
main.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Max-Age", "600")
  next();
});

app.post('/payments/approve', async (req, res) => {
  //retrieve paymentId from POST request body
  const { paymentId } = req.body

  //call approvePayment passing in the requested paymentId and a callback to handle the response once it is returned from pi's servers
  return await approvePayment(paymentId, approveHandler)
})

app.post('/payments/complete', async (req, res) => {
  const { paymentId, txid } = req.body

  //call completePayment
  return await completePayment(paymentId, completedHandler)
})

//define google cloud function name
module.exports = functions.https.onRequest(main);
