/**
 * Pi Network API services
 */

const { db } = require('../services/firebase')
const axios = require("axios");
const piNetworkApi = 'api.minepi.com/v2'
const API_KEY = functions.config().pinetwork.apikey

exports.approvePayment = async (paymentId, handlerFunction = () => console.log('Please implement callback function!'))) => {
  console.log('trying to request approval')

  try {
    //send /approve POST request
    const response = await axios.post(`https://${piNetworkApi}/payments/${paymentId}/approve`, {}, {
      headers: {
        'Authorization': `Key ${API_KEY}`
      }
    })

    if (handlerFunction) {
        handlerFunction(response.data)
    }

    //return response;
    return res.status(200).send({
      message: 'Payment approved!',
      status: 'success'
    });

  } catch (err) {
    //output error for debugging
    console.log('error:', err)
      
    //return something to your front end
    return res.status(500).send({
      message: `There has been an error!`,
      status: 'error'
    })
  }
}

exports.completePayment = async (paymentId, callback = () => console.log('Please implement callback!')) => {
    try {
        //send /approve POST request
        const response = await axios.post(`https://${piNetworkApi}/payments/${paymentId}/complete`, {}, {
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
}