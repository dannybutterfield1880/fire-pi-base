const express = require("express")
const functions = require("firebase-functions")
const cors = require('cors');
const { approvePayment, completePayment } = require("./services");
const { completedHandler, approveHandler } = require("./handlers");
const CURRENT_VERSION = 1;

const app = express();
// //add the path to receive request and set json as bodyParser to process the body 
// app.use(`/v${CURRENT_VERSION}`, app);
app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(function(req, res, next) {
//   console.log('I am here!')
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Max-Age", "600")
//   console.log(res.getHeaders())
//   next();
// });

app.post('/payments/approve', async (req, res) => {
  console.log('here in payments approve')
  const { paymentId } = req.body

  console.log('approving payment', paymentId)

  //call approvePayment passing in the requested paymentId and a callback to handle the response once it is returned from pi's servers
  const response = await approvePayment(paymentId, approveHandler)

  if (response) {
    console.log(response)
    return res.status(200).send({
      message: 'Payment approved!',
      status: 'success'
    });
  }
  
  return res.status(500).send({
    message: 'error',
    status: 'error'
  });
})

app.post('/payments/complete', async (req, res) => {
  const { paymentId, txid } = req.body

  //call completePayment
  const response = await completePayment(paymentId, completedHandler)

  if (response) {
    return res.status(200).send({
      message: 'Payment completed!',
      status: 'success'
    });
  }

  return res.status(500).send({
    message: 'error',
    status: 'error'
  });
})

//define google cloud function name
module.exports = functions.https.onRequest(app);
