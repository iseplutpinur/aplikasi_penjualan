import React, { useRef, useState } from "react";

// import material ui
import TextFiled from '@material-ui/core/TextField';
import { useSnackbar } from "notistack";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

// firebase
import { useFirebase } from "../../../components/FirebaseProvider";

// validator
import isEmail from 'validator/lib/isEmail';

// import style
import useStyles from "./styles/pengguna";

function Pengguna() {
    const { user } = useFirebase();
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState({
        displayName: '',
        email: ''
    });
    const [isSubmitting, setSubmitting] = useState(false);
    const classes = useStyles();

    // name
    const displayNameRef = useRef();
    const saveDisplayName = async () => {
        const displayName = displayNameRef.current.value;

        if (!displayName) {
            setError({
                displayName: 'Nama wajib di isi'
            });

        } else if (displayName !== user.displayName) {
            setSubmitting(true);
            setError({
                displayName: ''
            });
            await user.updateProfile({
                displayName
            });
            setSubmitting(false);
            enqueueSnackbar('Data pengguna berhasi diperbarui', { variant: 'success' });
        }
    }

    // email
    const emailRef = useRef();
    const updateEmail = async () => {
        const email = emailRef.current.value;
        if (!email) {
            setError({
                email: 'Email wajib di isi'
            });
        } else if (!isEmail(email)) {
            setError({
                email: 'Email tidak valid'
            });
        } else if (user.email !== email) {
            setSubmitting(true);
            setError({
                email: ''
            });
            try {
                await user.updateEmail(email);
                enqueueSnackbar('Email berhasi diperbarui', { variant: 'success' });
            } catch (e) {
                console.log(e);
                let emailError = '';

                switch (e.code) {
                    case "auth/email-already-in-use":
                        emailError = 'Email sudah digunakan';
                        break;

                    case "auth/invalid-email":
                        emailError = 'Email tidak valid';
                        break;

                    case "auth/requires-recent-login":
                        emailError = 'Silahkan logout, kemudian login utnuk memperbarui email';
                        break;

                    default:
                        emailError = 'Terjadi kesalahan silahkan coba lagi';
                        break;
                }

                setError({
                    email: emailError
                });
            }
            setSubmitting(false);
        }

    }

    // verifikasi email
    const sendEmailVerification = async () => {
        const actionCodeSetting = {
            url: `${window.location.origin}/login`
        }
        setSubmitting(true);
        await user.sendEmailVerification(actionCodeSetting);
        enqueueSnackbar(`Email varifikasi telah dikirim ke ${emailRef.current.value}`, { variant: 'success' });
        setSubmitting(false);
    }

    return <div className={classes.pengaturanPengguna}>
        <TextFiled
            id="displayName"
            name="displayName"
            label="Nama"
            defaultValue={user.displayName}
            inputProps={{
                ref: displayNameRef,
                onBlur: saveDisplayName
            }}
            disabled={isSubmitting}
            helperText={error.displayName}
            error={error.displayName ? true : false}
            margin="normal"
        />
        <TextFiled
            id="email"
            name="email"
            label="E-Mail"
            defaultValue={user.email}
            inputProps={{
                ref: emailRef,
                onBlur: updateEmail
            }}
            disabled={isSubmitting}
            helperText={error.email}
            error={error.email ? true : false}
            margin="normal"
        />
        {
            user.emailVerified ?
                <Typography
                    variant="subtitle1"
                >Email sudah terverifikasi</Typography>
                :
                <Button
                    variant="outlined"
                    onClick={sendEmailVerification}
                    disabled={isSubmitting}
                >
                    Kirim Email Verifikasi
                    </Button>
        }
    </div>
}

export default Pengguna;