import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Product from "./components/Product/Product";
import Products from "./components/Products/Products";

// model
import ProductsModel from './model/ProductsModel';

function App() {
  return (
    <Router>
      <Switch>
        <ProductsModel>
          <Route path="/" exact component={Products}></Route>
          <Route path="/products/:pid" exact component={Product}></Route>
        </ProductsModel>
      </Switch>
    </Router>
  );
}

export default App;
