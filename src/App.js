import useProducts from "./model/Products";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Product from "./components/Porduct/Product";

function App() {
  const { activeProducts, ...productService } = useProducts();

  const onProductAdd = () => {
    productService.addRandomProduct();
  };

  const onSelectedChange = (p) => {
    productService.selectProduct(p);
  };

  const onProductFilterByName = () => {
    productService.fliterProductByName();
  };

  const onProductAll = () => {
    productService.getAll();
  };

  const onProductsDelete = () => {
    productService.deleteSelected();
  };

  // const getProduct = (p) => productService.getProductById(p);

  return (
    <Router>
      <div className="App">
        <div>
          {activeProducts.map((p) => (
            <div key={p.id}>
              <input
                type="checkbox"
                className="chk"
                checked={p.selected}
                onChange={() => onSelectedChange(p)}
              ></input>
              <label className="product">
                <Link to={`/products/${p.id}`}>
                  {p.name} {p.id}
                </Link>
              </label>
            </div>
          ))}
        </div>
        <button onClick={onProductAdd}>Add</button>
        <button onClick={onProductFilterByName}>Filter By Kang</button>
        <button onClick={onProductAll}>Get all</button>
        <button onClick={onProductsDelete}>Delete By Checkbox</button>
      </div>

      <Switch>
        <Route path="/products/:pId" component={Product}>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
