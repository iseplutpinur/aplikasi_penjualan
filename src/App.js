import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Komponen halaman registrasi
import Registrasi from "./pages/registrasi";
import Login from "./pages/login";
import LupaPassword from "./pages/lupa-password";
import NotFound from "./pages/404";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/registrasi" component={Registrasi} />
        <Route path="/login" component={Login} />
        <Route path="/lupa-password" component={LupaPassword} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
