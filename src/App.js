import Header from "./components/Header";
import useProducts from "./model/Products";

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

  return (
    <div className="App">
      <Header></Header>
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
              {p.name} {p.id}
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
}

export default App;