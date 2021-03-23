<<<<<<< HEAD
<<<<<<< HEAD
import Header from "./components/Header";
import useProducts from "./model/Products";

function App() {
<<<<<<< HEAD
  const { activeProducts, ...productService } = useProducts();
=======
  const [activePs, setActiveProducts] = useState([]);

  const [ps, setProducts] = useState([
    {id: 1, name: "kang"},
    {id: 2, name: "li"}
  ]);

  // sort in the init
  useEffect(() => {
    setProducts(sort(ps))
  }, [])

  // change active list
  useEffect(() => {
    console.log("change")
    setActiveProducts(ps)
    console.log(activePs)
  },[ps])
>>>>>>> filter and get-all button by two useeffect

  // sort by default when adding new element
  const onProductAdd = () => {
<<<<<<< HEAD
    productService.addRandomProduct();
=======
    setProducts(sort([...ps, {id: getRandomInt(1000), name: Math.random().toString(36).substring(7)}]))
>>>>>>> delete button
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
<<<<<<< HEAD
    productService.deleteSelected();
  };
=======
    const boxes = document.getElementsByClassName('chk')
=======
import Header from './components/Header';
import useProducts from './model/Products';
=======
import Header from "./components/Header";
import useProducts from "./model/Products";
>>>>>>> format

function App() {
  const { activeProducts, ...productService } = useProducts();

  const onProductAdd = () => {
    productService.addRandomProduct();
  };

  const onSelectedChange = (p) => {
<<<<<<< HEAD
    productService.selectProduct(p)
  }
>>>>>>> custom hook
=======
    productService.selectProduct(p);
  };
>>>>>>> format

  const onProductFilterByName = () => {
    productService.fliterProductByName();
  };

<<<<<<< HEAD
  const sort = (array) => array.sort((a, b) =>
    b.id - a.id
  )
>>>>>>> delete button
=======
  const onProductAll = () => {
<<<<<<< HEAD
    productService.getAll()
  }
>>>>>>> custom hook
=======
    productService.getAll();
  };
>>>>>>> format

  const onProductsDelete = () => {
    productService.deleteSelected();
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    <>
      <div className="App">
        <Header></Header>
        <div>
          {activePs.map( (p) => 
            <div key={p.id}>
              <input type="checkbox" className='chk' id={p.id}></input>
              <label className='product'>{p.name} {p.id}</label>
            </div>
          )}
        </div>
        <button onClick={onProductAdd}>Add</button>
        <button onClick={onProductFilter}>Filter By Kang</button>
        <button onClick={onProductAll}>Get all</button>
        <button onClick={onProductsDelete}>Delete By Checkbox</button>
>>>>>>> delete button
=======
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
<<<<<<< HEAD
        )}
>>>>>>> custom hook
=======
        ))}
>>>>>>> format
      </div>
      <button onClick={onProductAdd}>Add</button>
      <button onClick={onProductFilterByName}>Filter By Kang</button>
      <button onClick={onProductAll}>Get all</button>
      <button onClick={onProductsDelete}>Delete By Checkbox</button>
    </div>
  );
}

export default App;
