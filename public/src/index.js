import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import axios from './services/axios'
import { createPiPayment, authenticatePiUser } from './services/pi';

//import './utils/pi-mock';

// window.PiMockConfig = {
//     username: 'john_doe',
//     uid: '12345678-1234-414e-b578-42e89d1f3c02',
//     payment_found: {
//         amount: 1, // Amount of π to be paid
//         memo: "Please pay for your order #12345", // User-facing explanation of the payment
//         metadata: {orderId: 12345}, // Developer-facing metadata
//     },
//     payment_error: false,
//     payment_cancelled: false,
// }

const Pi = window.Pi;

const App = () => {
    const [amountToTransfer, setAmountToTransfer] = useState(0);

    //on component mount
    useEffect(() => {
        //authenticate pi user
        authenticatePiUser();

        //clean up not neccessary
        return () => {}
    }, [])

    const testPayment = async (e) => {
        e.preventDefault();

        //create pi network payment
        await createPiPayment({
            amount: amountToTransfer,
            memo: 'Sample Transfer',
            metadata: {
                orderId: 123
            }
        });
    }

    return (
        <div>
            <p>Fire Pi</p>
            <small>Firebase + Pi Netwrok + React boilerplate</small>
            <div>
                <p>Test a payment</p>
                <form onSubmit={testPayment}>
                    <div>
                        <label forHtml="amount">Amount</label>
                        <input type="number" value={amountToTransfer} onChange={(e) => setAmountToTransfer(e.target.value)}/>
                    </div>
                    <button type="submit">Transfer</button>
                </form>
            </div>
        </div>
    )
}

render(<App />, document.getElementById('root'))