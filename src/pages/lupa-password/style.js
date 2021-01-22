import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        marginBottom: theme.spacing(4)
    },
    paper: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(6)
    },
    button: {
        marginTop: theme.spacing(4)
    }
}));


export default useStyles;