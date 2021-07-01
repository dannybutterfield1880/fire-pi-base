import axios from './axios';

export const authenticatePiUser = async () => {
    // Identify the user with their username / unique network-wide ID, and get permission to request payments from them.
    const scopes = ['payments'];
    
    try{
        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
        // console.log(`Hi there! You're ready to make payments!`);
        // console.log('auth: ', auth);

        await createPiPayment();
    } catch(err) {
        console.log(err)
    }
}

export const createPiPayment = async (config) => {
    Pi.createPayment(config, {
        // Callbacks you need to implement - read more about those in the detailed docs linked below:
        onReadyForServerApproval: onReadyForApproval,
        onReadyForServerCompletion: onReadyForCompletion,
        onCancel,
        onError,
      });
}

export const onIncompletePaymentFound = (payment) => { 
    //do something with incompleted payment
    console.log('incomplete payment found: ', payment) 
}; // Read more about this in the SDK reference

export const onReadyForApproval = async (paymentId) => {
    console.log('trying to make request to server for approval')
    //make POST request to your app server /payments/approve endpoint with paymentId in the body
    
    const { body, status } = await axios.post('/payments/approve', {
        paymentId
    })

    if (status === 500) {
        //there was a problem approving this payment show user body.message from server
        alert(`${body.status}: ${body.message}`);
        return false;
    } 

    if (status === 200) {
        //payment was approved continue with flow
        console.log(body)
        return true;
    }
}

export const onReadyForCompletion = async (paymentId, txid) => {
    //make POST request to your app server /payments/complete endpoint with paymentId and txid in the body
    const { body, status } = await axios.post('/payments/complete', {
        paymentId, 
        txid
    })

    if (status === 500) {
        //there was a problem completing this payment show user body.message from server
        alert(`${body.status}: ${body.message}`);
        return false;
    } 

    if (status === 200) {
        //payment was completed continue with flow
        return true;
    }
}

export const onCancel = (paymentId) => {
    console.log('payment cancelled', paymentId)
}

export const onError = (error, paymentId) => { 
    console.log('onError', error, paymentId) 
}