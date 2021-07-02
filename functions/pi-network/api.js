const express = require("express")
const functions = require("firebase-functions")
const cors = require('cors');
const { approvePayment, completePayment } = require("./services");
const { completedHandler, approveHandler } = require("./handlers");
const CURRENT_VERSION = 1;

const app = express();
app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/payments/approve', async (req, res) => {
  console.log('here in payments approve with body', req.body)
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
