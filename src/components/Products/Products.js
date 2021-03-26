import React, { useContext, useEffect } from "react";
import { ProductsModelContext } from "../../model/ProductsModel";
import { Link } from "react-router-dom";

const Products = () => {
  // state space
  const { activeProducts, service: productService } = useContext(
    ProductsModelContext
  );

  // controller space
  useEffect(() => {
    productService.fetchAll();
  }, []);

  const onProductAdd = () => {
    productService.addRandomProduct();
  };

  const onSelectedChange = (p) => {
    productService.selectProduct(p);
  };

  const onProductFilterByName = () => {
    productService.filterProductByName();
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
  );
};

export default Products;
