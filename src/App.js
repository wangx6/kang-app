import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Product from "./components/Product/Product";
import Products from "./components/Products/Products";

// MODEL
import ProductsModel from "./model/ProductsModel";

// CONTEXT
import { ProductsModelContext } from "./context/ProductsModelContext";

function App() {
  const { service: productsService } = ProductsModel();
  return (
    <Router>
      <Switch>
        <ProductsModelContext.Provider value={{ productsService }}>
          <Route path="/" exact component={Products}></Route>
          <Route path="/products/:pId" exact component={Product}></Route>
        </ProductsModelContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
