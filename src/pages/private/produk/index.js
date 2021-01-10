import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Koomponen halaman grid
import GridProduk from "./grid";
import EditProduk from "./edit";

function Produk() {
    return <Switch>
        <Route path="/produk/grid" component={GridProduk} />
        <Route path="/produk/edit/:produkId" component={EditProduk} />
        <Redirect to="/produk/grid" />
    </Switch>
}

export default Produk;