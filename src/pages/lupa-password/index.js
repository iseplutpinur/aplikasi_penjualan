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

// import app component
import AppLoading from "../../components/AppLoading";

// import snackbar notistack
import { useSnackbar } from "notistack";

function LupaPassword() {
    const classes = useStyles();
    const [form, setForm] = useState({
        email: ''
    });

    const [error, setError] = useState({
        email: ''
    });


    const { auth, user, loading } = useFirebase();

    const [isSubmitting, setSubmitting] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

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
                const actionCodeSeting = {
                    url: `${window.location.origin}/login`
                }
                await auth.sendPasswordResetEmail(form.email, actionCodeSeting);
                setSubmitting(false);
                enqueueSnackbar(`Cek kotak masuk email: ${form.email}, sebuah tautan untuk me-reset pasword telah dikirim`, {
                    variant: 'success'
                });
            } catch (e) {
                const newError = {};
                switch (e.code) {
                    case 'auth/user-not-found':
                        newError.email = 'Email tidak terdaftar';
                        break;

                    case 'auth/invalid-email':
                        newError.email = 'Email tidak valid';
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
        return <Redirect to="/" />
    }

    return <Container maxWidth="xs">
        <Paper className={classes.paper}>
            <Typography
                variant="h5"
                component="h1"
                className={classes.title}>Lupa Password</Typography>
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

                <Grid container className={classes.button}>
                    <Grid item xs>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Kirim
                     </Button>
                    </Grid>
                    <Grid item>
                        <Link
                            to="./login"
                            style={{ textDecoration: 'none' }}
                        >
                            <Button
                                size="large"
                                variant="contained"
                                disabled={isSubmitting}
                            >
                                Login
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
}

export default LupaPassword;