/**
 * This file is MIT however it does not require to be modified
 * 
 * @author dannybutterfield1880.github.io
 * @license MIT
 */

const express = require("express")
const cors = require('cors')
const functions = require("firebase-functions")
const axios = require("axios")
const CURRENT_VERSION = 1;

const piNetworkApi = 'api.minepi.com/v2'
const API_KEY = functions.config().pinetwork.apikey

const app = express();
const main = express();

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

  try {
    //send /approve POST request
    await axios.post(`https://${piNetworkApi}/payments/${paymentId}/approve`, {}, {
      headers: {
        'Authorization': `Key ${API_KEY}`
      }
    })

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
})
  
app.post('/payments/complete', async (req, res) => {
  const { paymentId, txid } = req.body
  try {
    //send /approve POST request
    await axios.post(`https://${piNetworkApi}/payments/${paymentId}/complete`, {
      txid
    }, {
      headers: {
        'Authorization': `Key ${API_KEY}`
      }
    })

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

module.exports = functions.https.onRequest(main);