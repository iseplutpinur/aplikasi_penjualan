import React, { useState } from 'react';

// import material ui
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextFiled from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

// import styles
import useStyles from './style';

// react router dom
import { Link, Redirect } from "react-router-dom";

// import validator
import isEmail from "validator/lib/isEmail";

// import firebase hooks
import { useFirebase } from "../../components/FirebaseProvider";

// app component
import AppLoading from "../../components/AppLoading";

function Login(props) {
    const { location } = props;
    const classes = useStyles();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        email: '',
        password: ''
    });


    const { auth, user, loading } = useFirebase();

    const [isSubmitting, setSubmitting] = useState(false);

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setError({
            ...error,
            [e.target.name]: ''
        })
    }

    const validate = () => {
        const newError = { ...error };

        if (!form.email) {
            newError.email = "Email wajib di isi";
        } else if (!isEmail(form.email)) {
            newError.email = "Email tidak valid";
        }

        if (!form.password) {
            newError.password = "Password wajib di isi";
        }

        return newError;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const findErrors = validate();

        if (Object.values(findErrors).some(err => err !== '')) {
            setError(findErrors);
        } else {
            try {
                setSubmitting(true);
                await auth.signInWithEmailAndPassword(form.email, form.password);
            } catch (e) {
                const newError = {};
                switch (e.code) {
                    case 'auth/user-not-found':
                        newError.email = 'Email tidak terdaftar';
                        break;

                    case 'auth/invalid-email':
                        newError.email = 'Email tidak valid';
                        break;

                    case 'auth/wrong-password':
                        newError.password = 'Password salah';
                        break;

                    case 'auth/user-disabled':
                        newError.email = 'Pengguna di blokir';
                        break;

                    default:
                        newError.email = 'Terjadi kesalahan silahkan coba lagi';
                        break;

                }
                setError(newError);
                setSubmitting(false);
            }
        }
    }

    if (loading) {
        return <AppLoading />
    }

    if (user) {
        const redirectTo = location.state && location.state.from && location.state.from.pathname ? location.state.from.pathname : "/";
        return <Redirect to={redirectTo} />
    }

    return <Container maxWidth="xs">
        <Paper className={classes.paper}>
            <Typography
                variant="h5"
                component="h1"
                className={classes.title}>Login</Typography>
            <form onSubmit={handleSubmit} noValidate>
                <TextFiled
                    id="email"
                    type="email"
                    name="email"
                    margin="normal"
                    label="Alamat Email"
                    fullWidth
                    required
                    value={form.email}
                    helperText={error.email}
                    onChange={handleChange}
                    error={error.email ? true : false}
                    disabled={isSubmitting}
                />
                <TextFiled
                    id="password"
                    type="password"
                    name="password"
                    margin="normal"
                    label="Password"
                    fullWidth
                    required
                    value={form.password}
                    helperText={error.password}
                    onChange={handleChange}
                    error={error.password ? true : false}
                    disabled={isSubmitting}
                />

                <Grid container className={classes.button}>
                    <Grid item xs>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Login
                     </Button>
                    </Grid>
                    <Grid item>
                        <Link
                            to="./registrasi"
                            style={{ textDecoration: 'none' }}
                        >
                            <Button
                                size="large"
                                variant="contained"
                                disabled={isSubmitting}
                            >
                                Daftar
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                <div
                    className={classes.forgotPassword}
                >
                    <Typography
                        component={Link}
                        to="./lupa-password"
                    >
                        Lupa Password
                    </Typography>
                </div>
            </form>
        </Paper>
    </Container>
}

export default Login;