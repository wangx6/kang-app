import React,  { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from '../../model/ProductsModel';

const Products = () => {
  // state space
  const [products, setProducts] = useState([]);
  const { service: productService } = useContext(ProductsContext);

  // controller space (event)
  useEffect(onRender, []);
  
  function onRender() {
    productService.fetchAll().then(res => {
      setProducts(res);
    });  
    return onDestroy;
  }

  function onDestroy() {
    console.log('destroy...');
  }

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

  // view space
  return (
    <div className="App">
      <div>
        {products.map((p) => (
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
  );
};

export default Products;
