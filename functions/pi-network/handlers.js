/**
 * Here you can do things with the repsonse after the API calls
 */


exports.approveHandler = (response) => {
    console.log(response)
}

exports.completedHandler = (response) => {
    console.log(response)
}
  
  /* *
     * handler notes 
    
     * console.log(response) will output PaymentDTO object
     * do something with this data maybe store in a payments table for your own reference
     * 
     * PaymentDTO
      {
        // Payment data:
        "identifier": string, // The payment identifier
        "user_uid": string, // The user's app-specific ID
        "amount": number, // The payment amount
        "memo": string, // A string provided by the developer, shown to the user
        "metadata": Object, // An object provided by the developer for their own usage
        "to_address": string, // The recipient address of the blockchain transaction
        "created_at": string, // The payment's creation timestamp
        
        // Status flags representing the current state of this payment
        "status": {
          "developer_approved": boolean, // Server-Side Approval
          "transaction_verified": boolean, // Blockchain transaction verified
          "developer_completed": boolean, // Server-Side Completion
          "cancelled": boolean, // Cancelled by the developer or by Pi Network
          "user_cancelled": boolean, // Cancelled by the user
        },
        
        // Blockchain transaction data:
        "transaction": null | { // This is null if no transaction has been made yet
          "txid": string, // The id of the blockchain transaction
          "verified": boolean, // True if the transaction matches the payment, false otherwise
          "_link": string, // A link to the operation on the Blockchain API
        },
      };

  }); */


