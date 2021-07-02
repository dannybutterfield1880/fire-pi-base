/**
 * Pi Network API services
 */
const functions = require("firebase-functions");
const { db } = require('../services/firebase')
const axios = require("axios");
const piNetworkApi = 'api.minepi.com/v2'
const API_KEY = functions.config().pinetwork.apikey

const piAxios = axios.create({
  baseURL: `https://${piNetworkApi}/payments`
})

exports.approvePayment = async (paymentId, handlerFunction = () => console.log('Please implement callback function!')) => {
  console.log('trying to request approval')

  try {
    //send /approve POST request
    await piAxios.post(`/${paymentId}/approve`, {}, {
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

  } catch (err) {
    //output error for debugging
    console.log('error:', err)
      
    //return something to your front end
    return false
  }
}

exports.completePayment = async (paymentId, handlerFunction = () => console.log('Please implement callback!')) => {
    try {
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
    } catch (err) {
        //output error for debugging
        console.log(err)
            
        //return something to your front end
        return false
    }
}