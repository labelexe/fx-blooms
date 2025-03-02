import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link as RouterLink, useNavigate, useLocation} from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { 
    Button, 
    Collapse,
    Divider,
    Grid, 
    IconButton,
    InputAdornment,
    Link, 
    TextField, 
    Tooltip,
    Typography 
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Close, EyeOutline, EyeOffOutline } from 'mdi-material-ui';
import toast, { Toaster } from 'react-hot-toast';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';

import Spinner from '../../components/common/Spinner';

import { externalLogin, login } from '../../actions/customer';
import { GET_ERRORS } from '../../actions/types';

import { COLORS } from '../../utils/constants';
import { DASHBOARD_HOME, FORGOT_PASSWORD, SIGN_UP, VERIFY_2FA } from '../../routes';

import validateLogin from '../../utils/validation/customer/login';

import logo from '../../assets/img/logo.svg';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: [[theme.spacing(5), theme.spacing(10)]],

        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },

    logo: {
        alignSelf: 'flex-start'
    },

    formContainer: {
        alignSelf: 'center',
        justifySelf: 'center',
        paddingTop: theme.spacing(5),
        width: '40%',

        [theme.breakpoints.down('md')]: {
            width: '70%'
        },

        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    
    form: {
        backgroundColor: COLORS.lightTeal,
        borderRadius: theme.shape.borderRadius,
        marginBottom: theme.spacing(5),
        marginTop: theme.spacing(5),
        padding: [[theme.spacing(3), theme.spacing(5)]],

        [theme.breakpoints.down('sm')]: {
            padding: [[theme.spacing(4), theme.spacing(2)]]
        }
    },

    input: {
        borderRadius: '5px',
        marginBottom: theme.spacing(5)
    },

    orContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 0.1fr 1fr',
        alignItems: 'center',
        columnGap: theme.spacing(2)
    },

    button: {
        marginBottom: theme.spacing(2)
    },

    googleButton: {
        width: '100%'
    },

    link: {
        color: theme.palette.primary.main,
        marginTop: theme.spacing(2),
        textDecoration: 'none',
        
        '&:hover': {
            textDecoration: 'none'
        }
    }
}));

const Login = ({ externalLogin, login }) => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const errorsState = useSelector(state => state.errors);
    const { customer } = useSelector(state => state);

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (customer.isAuthenticated) {
            return navigate(DASHBOARD_HOME);
        }
        if (location.state?.msg) {
            setErrors({ msg: location.state.msg });
            // navigate(location.pathname, {});
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (errorsState?.msg) {
            setErrors({ ...errorsState });
            setLoading(false);
            setOpen(true);
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        }
    }, [dispatch, errorsState, errors]);

    useEffect(() => {
        if (customer.twoFactorEnabled === true && loading) {
            setLoading(false);
            navigate(VERIFY_2FA, { twoFactorEnabled: true });
        }
    }, [customer, navigate, loading]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
      
    const handleSocialLoginFailure = (err) => {
        console.log(err.message);
        console.error(err);
    };

    const handleGoogleLoginSuccess = (res) => {
        const { tokenId } = res;
        toast.success('Login Successful');
        setLoading(true);
        const data = {
            provider: 'google',
            idToken: tokenId
        };
        externalLogin(data, navigate);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setErrors({});
    
        const data = { Username, Password };
    
        const { errors, isValid } = validateLogin(data);

        if (!isValid) {
            return setErrors({ ...errors });
        }

        setErrors({});
        setOpen(false);
        setLoading(true);
        login(data, navigate);
    };   

    return (
        <>
            <Helmet>
                <title>Login | FXBLOOMS.com</title>
                <meta name="description" content="Thanks for joining FXBLOOMS. Trust and security are our cornerstones. Log in to enjoy unbeatable rates and service." />
            </Helmet>
            {loading && <Spinner />}
            <Toaster />
            <section className={classes.root}>
                <RouterLink to="/">
                    <img src={logo} className={classes.logo} alt="FX Blooms Logo" />
                </RouterLink>
                <div className={classes.formContainer}>
                    <Typography variant="h5" align="center">
                        Welcome back!
                    </Typography>
                    <Typography variant="subtitle2" style={{ fontWeight: 300, marginTop: theme.spacing(2) }} align="center">
                        Complete the form below to sign in
                    </Typography>
                    {(errors.msg || errors.message) && 
                        <Collapse in={open}>
                            <Alert 
                                severity="error"
                                action={
                                    <IconButton 
                                        color="inherit" 
                                        size="small"
                                        onClick={() => {
                                            setOpen(false);
                                            dispatch({ type: GET_ERRORS, payload: {} })}
                                        }
                                    >
                                        <Close />
                                    </IconButton>
                                }
                            >
                                {errors.msg || errors.message}
                            </Alert>
                        </Collapse>
                    }
                    <form onSubmit={handleFormSubmit} className={classes.form} noValidate>
                        <Grid container direction="row">
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" component="span">Username</Typography>
                                <TextField 
                                    className={classes.input}
                                    value={Username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    variant="outlined" 
                                    placeholder="Enter Username"
                                    helperText={errors.Username}
                                    fullWidth
                                    required
                                    error={errors.Username ? true : false}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container direction="row" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="subtitle2" component="span">Password</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Link to={FORGOT_PASSWORD} component={RouterLink} className={classes.link} style={{ fontWeight: 300 }}>
                                            Forgot Password?
                                        </Link>
                                    </Grid>
                                </Grid>
                                <TextField 
                                    className={classes.input}
                                    value={Password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? 'text': 'password'}
                                    variant="outlined" 
                                    placeholder="Enter Password"
                                    helperText={errors.Password}
                                    fullWidth
                                    required
                                    error={errors.Password  ? true : false}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={toggleShowPassword}
                                                >
                                                    {Password.length > 0 ? 
                                                        showPassword ?
                                                        <Tooltip title="Hide Password" placement="bottom" arrow>
                                                            <EyeOffOutline />
                                                        </Tooltip> : 
                                                        <Tooltip title="Show Password" placement="bottom" arrow>
                                                            <EyeOutline />
                                                        </Tooltip>
                                                            : 
                                                        null
                                                     }
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button 
                                    className={classes.button}
                                    variant="contained" 
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    disabled
                                >
                                    Sign In
                                </Button>
                            </Grid>
                            <Grid item xs={12} className={classes.orContainer}>
                                <Divider />
                                <Typography variant="h6">OR</Typography>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <GoogleLogin
                                    clientId={process.env.REACT_APP_GOOGLE_APP_ID}
                                    className={classes.googleButton}
                                    buttonText="Sign in with Google"
                                    onSuccess={handleGoogleLoginSuccess}
                                    onFailure={handleSocialLoginFailure}
                                    cookiePolicy={'single_host_origin'}
                                />    
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" component="p" align="center" style={{ fontWeight: 300, marginTop: theme.spacing(2) }}>
                                    Don't have an account? <RouterLink to={SIGN_UP} className={classes.link}>Sign Up</RouterLink>
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </section>
        </>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    externalLogin: PropTypes.func.isRequired
};

export default connect(undefined, { externalLogin, login })(Login);