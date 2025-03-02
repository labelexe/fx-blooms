import { Link as RouterLink } from 'react-router-dom';
import { 
    Divider, 
    Link, 
    IconButton,
    Tooltip,
    Typography,
    Zoom 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Instagram, Linkedin, Twitter, Telegram } from 'mdi-material-ui';
import { animateScroll as scroll } from 'react-scroll';
import clsx from 'clsx';

import { BLOG, DISCLAIMER, TERMS, PRIVACY_POLICY, FAQS, ABOUT_US, LOGIN, SIGN_UP, CONTACT_US, USER_AGREEMENT } from '../../routes';
import { COLORS } from '../../utils/constants';

import logo from '../../assets/img/logo-white.svg';
// import septemLogo from '../../assets/img/septem-logo.png';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: COLORS.black,
        color: COLORS.offWhite,
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: theme.spacing(4),
        padding: [[theme.spacing(5), theme.spacing(10)]],

        [theme.breakpoints.down('md')]: {
            alignItems: 'center',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        },

        '& span:last-child': {
            fontWeight: 300,

            [theme.breakpoints.down('sm')]: {
                display: 'inline-block',
                width: '100%'
            }
        },
    },

    logo: {
        cursor: 'pointer',
        [theme.breakpoints.down('md')]: {
            margin: '0 auto 20px auto',
            width: 'initial'
        }
    },

    content: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
        gap: theme.spacing(5),
        
        [theme.breakpoints.down('md')]: {
            gap: theme.spacing(2)
        },

        [theme.breakpoints.down('sm')]: {
            // justifyContent: 'center',
            gap: theme.spacing(5),
            gridTemplateColumns: '1fr 1fr',
        },
        
        '& div': {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: theme.spacing(2),

            '& h6': {
                marginBottom: theme.spacing(2)
            },

            '& span:first-child': {
                fontWeight: 200
            }
        },

        '& div:first-child': {
            [theme.breakpoints.down('md')]: {
                gridColumn: '1 / span 5'
            },
            [theme.breakpoints.down('sm')]: {
                gridColumn: '1 / span 2'
            }
        }
    },

    link: {
        color: COLORS.offWhite,
        cursor: 'pointer',
        fontWeight: 200,
        textDecoration: 'none',

        '&:hover': {
            textDecoration: 'underline',
        }
    },

    socialContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)'
    },

    social: {
        color: COLORS.white,
    },

    divider: {
        borderTop: `1px solid ${COLORS.offBlack}`
    },

    copyrightContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    copyright: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        }
    },

    septem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
            marginTop: theme.spacing(2)
        }
    },

    septemStacksLogo: {
        cursor: 'pointer',
        width: '25%'
    }
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.root}>
            <section className={classes.content}>
                <div>
                    <img src={logo} className={classes.logo} alt="FX Blooms Logo" onClick={() => scroll.scrollToTop} />
                    <Typography variant="subtitle2" component="span">
                        {/* FXBLOOMS O&#220; (registry code: 16262446) offers its products and services in partnership with Safe Connect UAB, a Yapily Ltd subsidiary regulated by the Bank of Lithuania as an Authorised Payment Institution (Company Code: 305602679, Licence No. 53). */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem dolores vero laudantium amet expedita eum doloremque? Ad doloribus quod provident minima molestiae hic ducimus molestias recusandae nihil debitis totam animi, accusamus enim quidem aperiam earum laborum dolore quo expedita unde quibusdam qui, temporibus maiores! Reiciendis exercitationem tempora perferendis facilis!
                    </Typography>
                </div>
                <div>
                    <Typography variant="h6">Company</Typography>
                    <Link className={classes.link} to={ABOUT_US} component={RouterLink}>About us</Link>
                    <Link className={classes.link} component={RouterLink} to={PRIVACY_POLICY}>Privacy Policy</Link>
                    <Link className={classes.link} component={RouterLink} to={TERMS}>Terms &amp; Conditions</Link>
                    <Link className={classes.link} component={RouterLink} to={DISCLAIMER}>Disclaimer</Link>
                    <Link className={classes.link} component={RouterLink} to={USER_AGREEMENT}>User Agreement</Link>
                </div>
                <div>
                    <Typography variant="h6">Users</Typography>
                    <Link className={classes.link} to={LOGIN} component={RouterLink}>Login</Link>
                    <Link className={classes.link} to={SIGN_UP} component={RouterLink}>Sign Up</Link>
                    <a className={classes.link} href={BLOG} target="_blank" rel="noreferrer">Blog</a>
                </div>
                <div>
                    <Typography variant="h6">Help</Typography>
                    <Link className={classes.link} to={FAQS} component={RouterLink}>FAQs</Link>
                    <Link className={classes.link} to={CONTACT_US} component={RouterLink}>Contact Us</Link>
                </div>
                <div>
                    <Typography variant="h6">Connect</Typography>
                    <a className={classes.link} href="mailto:hello@fxblooms.com">hello@fxblooms.com</a>
                    <section className={classes.socialContainer}>
                        <Tooltip title="Follow FXBLOOMS on Instagram" TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }} arrow>
                            <IconButton 
                                className={clsx(classes.linkedInIcon, classes.social)}
                                onClick={() => {
                                    window.open('https://www.instagram.com/fxblooms/', '_blank', 'noopener,noreferrer')
                                }}
                            >
                                <Instagram />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Connect with us on LinkedIn" TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }} arrow>
                            <IconButton 
                                className={clsx(classes.linkedInIcon, classes.social)}
                                onClick={() => {
                                    window.open('https://www.linkedin.com/company/fxblooms/', '_blank', 'noopener,noreferrer')
                                }}
                            >
                                <Linkedin />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Follow us Twitter" TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }} arrow>
                            <IconButton 
                                className={clsx(classes.linkedInIcon, classes.social)}
                                onClick={() => {
                                    window.open('https://twitter.com/FXBLOOM1', '_blank', 'noopener,noreferrer')
                                }}
                            >
                                <Twitter />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Connect with us on Telegram" TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }} arrow>
                            <IconButton 
                                className={clsx(classes.linkedInIcon, classes.social)}
                                onClick={() => {
                                    window.open('https://t.me/joinchat/4zNq4cJg-fA1NjFi', '_blank', 'noopener,noreferrer')
                                }}
                            >
                                <Telegram />
                            </IconButton>
                        </Tooltip>
                    </section>
                </div>
            </section>
            <Divider className={classes.divider} />
            <section className={classes.copyrightContainer}>
                <Typography variant="subtitle2" component="span" className={classes.copyright}>
                    &copy; {new Date().getFullYear()} FXBLOOMS O&#220;, Harju maakond, Tallinn, Kesklinna linnaosa, Narva mnt 7, 10117 Estonia. All Rights Reserved.
                </Typography>  
                {/* <div className={classes.septem}>
                    <Typography variant="body2">
                        Powered by &nbsp;&nbsp;
                    </Typography>
                    <Tooltip title="https://septemstacks.com" TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }}>
                        <img 
                            src={septemLogo} 
                            alt="Septem Stacks LLC" 
                            className={classes.septemStacksLogo}
                            onClick={() => {
                                window.open('https://septemstacks.com', '_blank', 'noopener,noreferrer')
                            }}
                        />
                    </Tooltip>
                </div> */}
            </section>
        </footer>
    );
};

export default Footer;