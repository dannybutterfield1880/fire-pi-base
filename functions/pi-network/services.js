/**
 * Pi Network API services
 */
const functions = require("firebase-functions");
const { db } = require('../services/firebase')
const axios = require("axios");
const { uuid } = require('uuidv4');

const piNetworkApi = 'api.minepi.com/v2'
const API_KEY = functions.config().pinetwork.apikey
const isDev = process.env.FUNCTIONS_EMULATOR;

const paymentDTOMock = (amount, memo, metadata, toAddress, approved, completed) =>  {
  const paymentId = uuid();
  return {
    // Payment data:
    "identifier": paymentId, // The payment identifier
    "user_uid": uuid(), // The user's app-specific ID
    "amount": amount, // The payment amount
    "memo": memo, // A string provided by the developer, shown to the user
    "metadata": metadata, // An object provided by the developer for their own usage
    "to_address": toAddress, // The recipient address of the blockchain transaction
    "created_at": 'date-string', // The payment's creation timestamp
    
    // Status flags representing the current state of this payment
    "status": {
      "developer_approved": approved, // Server-Side Approval
      "transaction_verified": true, // Blockchain transaction verified
      "developer_completed": completed, // Server-Side Completion
      "cancelled": false, // Cancelled by the developer or by Pi Network
      "user_cancelled": false, // Cancelled by the user
    },
    
    // Blockchain transaction data:
    "transaction": { // This is null if no transaction has been made yet
      "txid": uuid(), // The id of the blockchain transaction
      "verified": true, // True if the transaction matches the payment, false otherwise
      "_link": `https://${piNetworkApi}/payments/${paymentId}/approve`, // A link to the operation on the Blockchain API
    },
  }
}

exports.approvePayment = async (paymentId, handlerFunction = () => console.log('Please implement callback function!')) => {
  console.log('trying to request approval')

  try {
    if (!isDev) {
      //send /approve POST request
      await axios.post(`https://${piNetworkApi}/payments/${paymentId}/approve`, {}, {
        headers: {
          'Authorization': `Key ${API_KEY}`
        }
      })

      console.log('response', response)

      if (handlerFunction) {
          handlerFunction(response.data)
      }

      //return response;
      return true;

    } else {
      //mock PaymentDTO
      return paymentDTOMock(4.20, 'Test payment', { serviceId: 123 }, 'test-address', true, false)
    }
   
  } catch (err) {
    //output error for debugging
    console.log('error:', err)
      
    //return something to your front end
    return false
  }
}

exports.completePayment = async (paymentId, handlerFunction = () => console.log('Please implement callback!')) => {
    try {
      if(!isDev) {
        //send /approve POST request
        const response = await axios.post(`https://${piNetworkApi}/payments/${paymentId}/complete`, {}, {
          headers: {
          'Authorization': `Key ${API_KEY}`
          }
        })

        if (handlerFunction) {
          handlerFunction(response.data)
        }

        //return response;
        return true
      } else {
        //mock PaymentDto
        return paymentDTOMock(4.20, 'Test payment', { serviceId: 123 }, 'test-address', true, false)
      }
       
    } catch (err) {
        //output error for debugging
        console.log(err)
            
        //return something to your front end
        return false
    }
}