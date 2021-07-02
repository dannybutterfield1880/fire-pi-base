import React, { useState, useEffect, Fragment } from 'react'
import { render } from 'react-dom'
import axios from './services/axios'
import { createPiPayment, authenticatePiUser } from './services/pi';
import { Button, Container, Grid, TextField, CircularProgress, Typography, Paper } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import './utils/pi-mock';

const isDev = process.env.NODE_ENV === 'development';

window.PiMockConfig = {
    username: 'john_doe',
    uid: '12345678-1234-414e-b578-42e89d1f3c02',
    payment_found: {
        amount: 1, // Amount of π to be paid
        memo: "Please pay for your order #12345", // User-facing explanation of the payment
        metadata: {orderId: 12345}, // Developer-facing metadata
    },
    payment_error: false,
    payment_cancelled: false,
}

const spinnerStyle = {
    display: 'flex',
    top: '0px',
    margin: '0px auto',
    position: 'absolute',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
}

const App = () => {
    const [apiResponse, setApiResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [amountToTransfer, setAmountToTransfer] = useState('');
    const [walletKey, setWalletKey] = useState('');

    //on component mount
    useEffect(() => {
        //authenticate pi user
        authenticatePiUser();

        //clean up not neccessary
        return () => {}
    }, [])

    //on apiResponse updated
    useEffect(() => {
        setTimeout(() => {
            //clear apiResponse after 2 seconds
            setApiResponse(null)
        }, 5000)
    }, [apiResponse])

    const testPayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        //create pi network payment
        await createPiPayment({
            amount: amountToTransfer,
            memo: 'Sample Transfer',
            metadata: {
                orderId: 123
            }
        });
        
        //simulate a load
        setTimeout(() => {
            setApiResponse({
                message: 'Payment complete!',
                status: 'success'
            });
            setLoading(false);
        }, 1000)

       
    }

    return (
        <Fragment>
            {
                loading && (
                    <div style={spinnerStyle}>
                        <CircularProgress />
                    </div>
                )
            }
            <Container>
                <Grid item xs={12}>
                    <div style={{ marginTop: '1em' }} />
                    {
                        apiResponse && (
                            <div style={{ marginBottom: '1em' }}>
                                <Alert severity={apiResponse.status}>{apiResponse.message}</Alert>
                            </div>
                        )
                    }
                    {
                        isDev && (
                            <Alert severity="warning">Development mode is enabled all Pi payments will be simulated.</Alert>
                        )
                    }
                    <h2>Fire Pi</h2>
                    <div>
                        <p>You can view the full repository here: <a href="https://github.com/dannybutterfield1880/fire-pi-base">https://github.com/dannybutterfield1880/fire-pi-base</a></p>
                        <Typography style={{ marginBottom: '1em' }} >Firebase + Pi Network + React + Material UI boilerplate</Typography>

                    </div>
                    
                    <Paper style={{ padding: '1em' }}>
                        <div style={{ margin: '0 0 1em' }}>
                            <Typography>Test a payment</Typography>
                            <hr />
                        </div>
                        
                        <form onSubmit={testPayment} style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                            <TextField style={{ marginBottom: '1em' }} type="text" fullWidth variant="outlined" label="Wallet to send Pi to" value={walletKey} onChange={(e) => setWalletKey(e.target.value)} />
                            <TextField style={{ marginBottom: '1em' }} type="number" fullWidth variant="outlined" label="Amount" value={amountToTransfer} onChange={(e) => setAmountToTransfer(e.target.value)} />
                            <Button variant="text" fullWidth type="submit">Transfer</Button>
                        </form>
                    </Paper>    
                </Grid>
            </Container>
        </Fragment>
        
    )
}

render(<App />, document.getElementById('root'))