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
import { Link } from "react-router-dom";

// validator
import isEmail from "validator/lib/isEmail";
function Registrasi() {
    const classes = useStyles();
    const [form, setForm] = useState({
        email: '',
        password: '',
        ulangi_password: ''
    });

    const [error, setError] = useState({
        email: '',
        password: '',
        ulangi_password: ''
    });

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

        if (!form.ulangi_password) {
            newError.ulangi_password = "Ulangi Password wajib di isi";
        } else if (form.ulangi_password !== form.password) {
            newError.ulangi_password = "Ulangi Password tidak sama dengan Password";
        }

        return newError;
    }

    const handleSubmit = e => {
        e.preventDefault();
        const findErrors = validate();

        if (Object.keys(findErrors).some(err => err !== '')) {
            setError(findErrors);
        }
    }

    return <Container maxWidth="xs">
        <Paper className={classes.paper}>
            <Typography
                variant="h5"
                component="h1"
                className={classes.title}>Buat Akun Baru</Typography>
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
                />
                <TextFiled
                    id="ulangi_password"
                    type="password"
                    name="ulangi_password"
                    margin="normal"
                    label="Ulangi Password"
                    fullWidth
                    required
                    value={form.ulangi_password}
                    helperText={error.ulangi_password}
                    onChange={handleChange}
                    error={error.ulangi_password ? true : false}
                />

                <Grid container className={classes.button}>
                    <Grid item xs>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Daftar
                     </Button>
                    </Grid>
                    <Grid item>
                        <Link to="./login">
                            <Button
                                size="large"
                                variant="contained"
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

export default Registrasi;