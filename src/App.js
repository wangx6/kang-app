import Header from './components/Header';
import React, { useState, useEffect, useRef } from "react";

function App() {
  const [activePs, setActiveProducts] = useState([]);

  const [ps, setProducts] = useState([
    {id: 1, name: "kang"},
    {id: 2, name: "li"}
  ]);

  useEffect(() => {
    setProducts(sort(ps))
  }, [])

  useEffect(() => {
    console.log("change")
    setActiveProducts(ps)
    console.log(activePs)
  },[ps])

  const onProductAdd = () => {
    setProducts(sort([...ps, {id: Math.random() * 100, name: Math.random().toString(36).substring(7)}]))
  };

  const onProductFilter = () => {
    setActiveProducts(activePs.filter( (p) => p.name.includes("kang")))
    console.log('filter')
    console.log(activePs)
  }

  const onProductAll = () => { setActiveProducts(ps) }

  const sort = (array) => array.sort((a, b) =>
    b.id - a.id
  )

  return (
    <>
      <div className="App">
        <Header></Header>
        <div>
          {activePs.map( (p) => <div key={p.id}>{p.name} {p.id}</div>)}
        </div>
        <button onClick={onProductAdd}>Add</button>
        <button onClick={onProductFilter}>Filter By Kang</button>
        <button onClick={onProductAll}>Get all</button>
      </div>
    </>
  );
}

export default App;
