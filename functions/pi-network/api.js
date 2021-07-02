const express = require("express")
const { db } = require('../services/firebase')
const cors = require('cors')
const functions = require("firebase-functions")
const axios = require("axios")
const CURRENT_VERSION = 1;

const piNetworkApi = 'api.minepi.com/v2'
const API_KEY = functions.config().pinetwork.apikey

const app = express();
const main = express();

//add the path to receive request and set json as bodyParser to process the body 
main.use(`/v${CURRENT_VERSION}`, app);
main.use(cors())
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

  console.log('trying to request approval')

  try {
    //send /approve POST request
    await axios.post(`https://${piNetworkApi}/payments/${paymentId}/approve`, {}, {
      headers: {
        'Authorization': `Key ${API_KEY}`
      }
    })


    //return response;
    return res.status(200).send({
      message: 'Payment approved!',
      status: 'success'
    });
  } catch (err) {
    //output error for debugging
    console.log(err)
      
    //return something to your front end
    return res.status(500).send({
      message: `There has been an error!`,
      status: 'error'
    })
  }
  
  
  // await request(requestConfig, function (error, response) {

  //   //there was an error don't continue with payment process
  //   if (error) {

      
  //   }
    
  //   console.log('response.body', response.body);

  //   /**
  //    * console.log(response.body) will output PaymentDTO object
  //    * do something with this data maybe store in a payments table for your own reference
  //    * 
  //    * PaymentDTO
  //     {
  //       // Payment data:
  //       "identifier": string, // The payment identifier
  //       "user_uid": string, // The user's app-specific ID
  //       "amount": number, // The payment amount
  //       "memo": string, // A string provided by the developer, shown to the user
  //       "metadata": Object, // An object provided by the developer for their own usage
  //       "to_address": string, // The recipient address of the blockchain transaction
  //       "created_at": string, // The payment's creation timestamp
        
  //       // Status flags representing the current state of this payment
  //       "status": {
  //         "developer_approved": boolean, // Server-Side Approval
  //         "transaction_verified": boolean, // Blockchain transaction verified
  //         "developer_completed": boolean, // Server-Side Completion
  //         "cancelled": boolean, // Cancelled by the developer or by Pi Network
  //         "user_cancelled": boolean, // Cancelled by the user
  //       },
        
  //       // Blockchain transaction data:
  //       "transaction": null | { // This is null if no transaction has been made yet
  //         "txid": string, // The id of the blockchain transaction
  //         "verified": boolean, // True if the transaction matches the payment, false otherwise
  //         "_link": string, // A link to the operation on the Blockchain API
  //       },
  //     };
  //    */

  
    
  // });
})

app.post('/payments/complete', async (req, res) => {
  const { paymentId, txid } = req.body

  console.log('completing payment,', paymentId, 'with txid', txid)
  //set up /complete POST request
  try {
    //send /approve POST request
    await axios.post(`https://${piNetworkApi}/payments/${paymentId}/complete`, {
      txid
    }, {
      headers: {
        'Authorization': `Key ${API_KEY}`
      }
    })


    console.log('payment', paymentId, 'approved')
    //return response;
    return res.status(200).send({
      message: 'Payment completed!',
      status: 'success'
    });
  } catch (err) {
    //output error for debugging
    console.log(err)
      
    //return something to your front end
    return res.status(500).send({
      message: `There has been an error!`,
      status: 'error'
    })
  }
})

//define google cloud function name
module.exports = functions.https.onRequest(main);