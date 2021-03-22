import React from "react";
import useProducts from "./model/Products";

function App() {
  const { activeProducts, ...productService } = useProducts();

  const onProductAdd = () => {
    productService.addProduct();
  };

  const onProductFilter = () => {
    productService.queryNameContains();
  };

  const onProductAll = () => {
    productService.showAll();
  };

  const onProductsDelete = () => {
    productService.deleteSelected();
  };

  const onChangeProductSelected = (p) => {
    productService.toggleSelected(p);
  };

  return (
    <div className="App">
      <div>
        {activeProducts.map((p) => (
          <div key={p.id}>
            <input
              type="checkbox"
              onChange={() => {
                onChangeProductSelected(p);
              }}
              checked={p.selected}
              className="chk"
              id={p.id}
            ></input>
            <label className="product">
              {p.name} {p.id}
            </label>
          </div>
        ))}
      </div>
      <button onClick={onProductAdd}>Add</button>
      <button onClick={onProductFilter}>Filter By Kang</button>
      <button onClick={onProductAll}>Get all</button>
      <button onClick={onProductsDelete}>Delete By Checkbox</button>
    </div>
  );
}

export default App;
