import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Product from "./components/Product/Product";
import Products from "./components/Products/Products";
import UserLogin from "./components/UserLogin/UserLogin";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

// Context
import ProductsModel from "./model/ProductsModel/ProductsModel";
import UserModel from "./model/UserModel/UserModel";

function App() {
  return (
    <Router>
      <Switch>
        <UserModel>
          <Route path="/" exact component={UserLogin}></Route>
          <ProductsModel>
            <PrivateRoute
              path="/products"
              exact
              component={Products}
            ></PrivateRoute>
            <PrivateRoute
              path="/products/:pId"
              exact
              component={Product}
            ></PrivateRoute>
          </ProductsModel>
        </UserModel>
      </Switch>
    </Router>
  );
}

export default App;
