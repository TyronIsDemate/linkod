import React, { Component } from 'react';
import Header from '../components/Header';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Navigation from '../components/navigationBar';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import TextField from '@material-ui/core/TextField';
import { Redirect } from "react-router-dom";


const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const phoneno = /^\d{10}$/;
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

const countErrors = (errors) => {
    let count = 0;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (count = count + 1)
    );
    return count;
}

export default class DateLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formValid: false,
            errorCount: null,
            errors: {
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                pay: '',
            }
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'firstname':
                errors.firstname =
                    value.length < 5
                        ? 'Full Name must be 5 characters long!'
                        : '';
                break;
            case 'lastname':
                errors.lastname =
                    value.length < 5
                        ? 'Full Name must be 5 characters long!'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'phone':
                errors.phone =
                    phoneno.test(value)
                        ? ''
                        : 'You only need to input numbers';
                break;
            case 'pay':
                errors.pay =
                    phoneno.test(value)
                        ? ''
                        : 'You only need to input numbers';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ formValid: validateForm(this.state.errors) });
        this.setState({ errorCount: countErrors(this.state.errors) });
    }

    render() {

        const { errors, formValid } = this.state;
        const classes = makeStyles(theme => ({
            root: {
                flexGrow: 1,
            },
            paper: {
                height: 140,
                width: 100,
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary
            },
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
            selectEmpty: {
                marginTop: theme.spacing(2),

            },
            pos: {
                marginBottom: 12,
            },
            textField: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
            },
        }));
        return (
            <div className={classes.root}>
                <Header />
                <Grid container spacing={3} justify="center" style={{ marginTop: '5%%' }}>
                    <Grid item xs={8}>
                        <Navigation />
                        <Paper className={classes.paper}>
                            <Grid container justify='space-around' style={{ height: '10%' }}>
                                <Grid style={{ width: '30%' }}>
                                    <Card className={classes.card} style={{ maxHeight: '300px', marginTop: '8%' }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Journey
                                                </Typography>

                                                <p>  <b>Date:</b> &nbsp;mm-dd-yyyy</p>
                                                <p> <b>Departure from:</b> &nbsp; Place / Time</p>
                                                <p><b> Arrive to: </b> &nbsp;Place/Time</p>
                                                <b>Bus:</b>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid style={{ width: '30%', maxHeight: '300px', marginTop: '2.5%' }}>
                                    <Card className={classes.card}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Tickets
                                                </Typography>

                                                <p>  <b>Tickets:</b> &nbsp;1 Adult  x Price</p>
                                                <p><b>Seats:</b> &nbsp; (Number of seats)</p>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid style={{ width: '30%', marginTop: '2.5%', }}>
                                    <Card className={classes.card}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Payment
                                                </Typography>

                                                <p>  <b>Tickets Total:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ₱ 0 . 00</p>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <center>
                                    <form onSubmit={this.handleSubmit} noValidate>
                                        <div className='firstname'>
                                            <label className='firstname' htmlFor="firstname">Firstname</label>
                                            <input type='text' name='firstname' onChange={this.handleChange} noValidate />
                                            {errors.firstname.length > 0 &&
                                                <span className='error'>{errors.firstname}</span>}
                                        </div>
                                        <div className='lastname'>
                                            <label className='lastname' htmlFor="lastname">Lastname</label>
                                            <input type='text' name='lastname' onChange={this.handleChange} noValidate />
                                            {errors.lastname.length > 0 &&
                                                <span className='error'>{errors.lastname}</span>}
                                        </div>
                                        <div className='email'>
                                            <label htmlFor="email">Email</label>
                                            <input type='email' name='email' onChange={this.handleChange} noValidate />
                                            {errors.email.length > 0 &&
                                                <span className='error'>{errors.email}</span>}
                                        </div>
                                        <div className='phone'>
                                            <label className='phone' htmlFor="phone">Phone</label>
                                            <input type='text' name='phone' onChange={this.handleChange} noValidate />
                                            {errors.phone.length > 0 &&
                                                <span className='error'>{errors.phone}</span>}
                                        </div>
                                        <div className='pay'>
                                            <label htmlFor="pay">Payment Method</label>
                                            <input type='text' name='pay' onChange={this.handleChange} noValidate />
                                            {errors.pay.length > 0 &&
                                                <span className='error'>{errors.pay}</span>}
                                        </div>
                                        <br></br>
                                        <br></br>

                                        <hr style={{ width: '96%' }}></hr>
                                    </form>
                                </center>
                                <Typography style={{ textAlign: 'right' }} gutterBottom variant="h6" component="h6">
                                    &nbsp;&nbsp;Price:
                                                </Typography>
                                    <div className='submit' style={{textAlign:'center'}}>
                                        <button>Preview & Confirm</button>
                                    </div>
                                    {this.state.errorCount !== null ? <p className="form-status">Form is {formValid ? 'valid ✅' : 'invalid ❌'}</p> : 'Form not submitted'}


                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>
            </div >
        )
    }

}