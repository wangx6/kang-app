import React, { useContext, useEffect } from "react";
import { ProductsModelContext } from "../../model/ProductsModel/ProductsModel";
import { UserContext } from "../../model/UserModel";
import { Link } from "react-router-dom";

const Products = () => {
  // state space
  const { activeProducts, service: productService } = useContext(
    ProductsModelContext
  );
  const { user } = useContext(UserContext);

  // controller space
  useEffect(() => {
      const fetchAll = async () => {
      const res = await productService.fetchAll();
      productService.setProducts(res.data);
    }
    fetchAll();
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
      <h1>Hi User {user.email}</h1>
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
