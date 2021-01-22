import React from "react";
import { Switch, Route } from "react-router-dom";

// Koomponen halaman grid
import GridProduk from "./grid";
import EditProduk from "./edit";

function Produk() {
    return <Switch>
        <Route path="/produk/edit/:produkId" component={EditProduk} />
        <Route component={GridProduk} />
    </Switch>
}

export default Produk;