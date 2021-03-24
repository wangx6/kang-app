import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Product from "./components/Porduct/Product";
import Products from "./components/Products/Products";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Products}></Route>
        <Route path="/products/:pId" exact component={Product}></Route>
      </Switch>
    </Router>
  );
}

export default App;
