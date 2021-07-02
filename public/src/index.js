import React, { useState, useEffect, Fragment } from 'react'
import { render } from 'react-dom'
import { createPiPayment, authenticatePiUser, openPiShareDialog } from './services/pi';
import { makeStyles, Button, Container, Grid, TextField, CircularProgress, Typography, Paper, AppBar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

//import './utils/pi-mock';

const isDev = process.env.NODE_ENV === 'development';
window.isDev = isDev;

// window.PiMockConfig = {
//     production_domain: isDev ? false : 'https://firepi-react.web.app',
//     debug: isDev,
//     username: 'john_doe',
//     uid: '12345678-1234-414e-b578-42e89d1f3c02',
//     payment_found: {
//         amount: 1, // Amount of π to be paid
//         memo: "Please pay for your order #12345", // User-facing explanation of the payment
//         metadata: {orderId: 12345}, // Developer-facing metadata
//     },
//     payment_error: 'There has been an error with your payment',
//     payment_cancelled: 'Your payment was cancelled',
// }

const useStyles = makeStyles((theme) => ({
    root: {},
    mb1: {
        marginBottom: '1em'
    },
    paper: {
        padding: '1em'
    },
    loading: {
        display: 'flex',
        top: '0px',
        margin: '0px auto',
        position: 'absolute',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
    },
    listList: {
        padding: 0,
        margin: '0 0 1em 0'
    },
    form: { 
        display: 'flex', 
        width: '100%', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
    }
}))

const App = () => {
    const [apiResponse, setApiResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [amountToTransfer, setAmountToTransfer] = useState('');
    const [walletKey, setWalletKey] = useState('');

    const classes = useStyles();

    //get browser name
    //console.log(navigator.userAgent)

    //on component mount
    useEffect(() => {
        //authenticate pi user
        authenticatePiUser();

        //clean up not neccessary
        return () => {}
    }, [])

    //on apiResponse updated
    useEffect(() => {
        const timeout = setTimeout(() => {
            //clear apiResponse after 2 seconds
            setApiResponse(null)
        }, 5000)
        
        //clean up
        return () => {
            //clear timeout if it has not already finished
            clearTimeout(timeout)
        }
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

        setApiResponse({
            message: 'Payment complete!',
            status: 'success'
        });

        setLoading(false);
    }

    const openDialog = () => {
        openPiShareDialog('Hello World', 'This is my first pi dialog')
    }

    return (
        <Fragment>
            {
                loading && (
                    <div className={classes.spinner}>
                        <CircularProgress />
                    </div>
                )
            }
            <AppBar />
            <Container>
                <Grid item xs={12}>
                    <div style={{ marginTop: '1em' }} />
                    {
                        isDev && (
                            <Alert severity="warning">Development mode is enabled all Pi payments will be simulated.</Alert>
                        )
                    }
                    <h2>FirePi</h2>
                    <section className={classes.mb1}>
                        <p>A simple boilerplate for building Pi Network web apps that run on Firebase (Google cloud platform)</p>
                        <p>FirePi bundles the below list of technologies:</p>
                        <ul className={classes.linkList}>
                            <li><a target="_blank" href="https://firebase.google.com">Firebase</a> (<a target="_blank" href="https://firebase.google.com/docs">documentation</a>)</li>
                            <li><a target="_blank" href="https://minepi.com">Pi Network</a> (<a target="_blank" href="https://github.com/pi-apps/pi-platform-docs">documentation</a>)</li>
                            <li><a target="_blank" href="https://reactjs.org">React</a></li>
                            <li><a target="_blank" href="https://material-ui.com">Material UI</a></li>
                        </ul>
                        <p className={classes.mb1}>You can view the full repository for this code here: <a target="_blank" href="https://github.com/dannybutterfield1880/fire-pi-base">FirePi</a></p>

                    </section>
                    <hr className={classes.mb1} />
                    <Paper className={[classes.paper, classes.mb1]}>
                        <div style={{ margin: '0 0 1em' }}>
                            <Typography>Test Payment</Typography>
                        </div>
                        
                        {
                            apiResponse && (
                                <div className={classes.mb1}>
                                    <Alert severity={apiResponse.status}>{apiResponse.message}</Alert>
                                </div>
                            )
                        }
                        <form onSubmit={testPayment} className={classes.form}>
                            <small className={classes.mb1}>This will transfer {amountToTransfer < 0.1 ? 'the requested amount of ' : `${amountToTransfer} `} test-π to our development test wallet</small>
                            {/* <TextField className={classes.mb1} type="text" fullWidth variant="outlined" label="Wallet to send Pi to" value={walletKey} onChange={(e) => setWalletKey(e.target.value)} /> */}
                            <TextField className={classes.mb1} type="number" fullWidth variant="outlined" label="Amount to pay" value={amountToTransfer} onChange={(e) => setAmountToTransfer(e.target.value)} />
                            <Button variant="text" fullWidth type="submit">Transfer</Button>
                        </form>
                    </Paper>
                     
                </Grid>
            </Container>
        </Fragment>
        
    )
}

render(<App />, document.getElementById('root'))