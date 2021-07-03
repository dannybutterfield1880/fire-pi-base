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
    appBar: {
        paddingLeft: '1em',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logoImg: {
        height: '2.5em',
        width: 'auto',
        marginRight: '1em'
    },
    logoArea: {
        marginTop: '1em',
        padding: '1em 1em 1em 2.5em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    const [inPiBrowser, setInPiBrowser] = useState(null);
    const [piUser, setPiUser] = useState(null);

    const classes = useStyles();

    //on component mount
    useEffect(() => {
        if (navigator.userAgent.includes('PiBrowser')) {
            // the user is NOT running Chrome
            setInPiBrowser(true)
        }

        //authenticate pi user
        const piAuth = authenticatePiUser();
        if (piAuth) {
            setPiUser(piAuth)
        }

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

        if (isDev) {
            setApiResponse({
                message: 'Payment complete!',
                status: 'success'
            });
        }
        
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
            <AppBar variant="elevation" position="static" className={classes.appBar}>
                <h2>FirePi</h2>
            </AppBar>
            <Container maxWidth={'xs'}>
                <Grid item xs={12}>
                    <div style={{ marginTop: '1em' }} />
                    {
                        isDev && (
                            <Alert severity="warning">Development mode is enabled all Pi payments will be simulated.</Alert>
                        )
                    }
                    {
                        !inPiBrowser && !isDev && (
                            <Alert severity="error">Please use this app in the Pi Browser. Any payments made will not be processed and this is just a simulation when ran outside of the Pi Browser.</Alert>
                        )
                    }
                    <section className={classes.mb1}>
                    <div className={classes.logoArea}>
                        <img className={classes.logoImg} width="50" src="https://cdn.freebiesupply.com/logos/large/2x/firebase-1-logo-png-transparent.png"/>
                        <span>+</span>
                        <img className={classes.logoImg} height="50" src="https://minepi.com/assets/logo-667cd4f63cb2e6f261e16560dea7ac9c9235dcfaf9a285274a576efc96b9ec79.png"/>
                        <span>+</span>

                        <img className={classes.logoImg} height="50" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"/>
                    </div>  
                        <p>A simple boilerplate for building React Pi Network web apps that run on Firebase (Google cloud platform)</p>
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