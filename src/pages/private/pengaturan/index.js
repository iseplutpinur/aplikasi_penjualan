import React from "react";
import { Switch, Route } from "react-router-dom";

// Koomponen halaman pengguna
import Pengguna from "./pengguna";
import Toko from "./toko";

// import material ui
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// import styles
import useStyles from "./styles/index";

function Pengaturan(props) {
    const { location, history } = props;
    const handleChagneTab = (event, value) => {
        history.push(value);
    }
    const classes = useStyles();
    return (
        <Paper square>
            <Tabs
                value={location.pathname}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChagneTab}
            >
                <Tab label="Pengaturan Pengguna" value="/pengaturan" />
                <Tab label="Pengaturan Toko" value="/pengaturan/toko" />
            </Tabs>
            <div className={classes.tabContents}>
                <Switch>
                    <Route path="/pengaturan/toko" component={Toko} />
                    <Route component={Pengguna} />
                </Switch>
            </div>
        </Paper>
    )
}

export default Pengaturan;