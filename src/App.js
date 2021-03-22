import Header from './components/Header';
import React, { useState, useEffect, useRef } from "react";

function App() {
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

  // sort by default when adding new element
  const onProductAdd = () => {
    setProducts(sort([...ps, {id: getRandomInt(1000), name: Math.random().toString(36).substring(7)}]))
  };

  const onProductFilter = () => {
    setActiveProducts(activePs.filter( (p) => p.name.includes("kang")))
    console.log('filter')
    console.log(activePs)
  }

  const onProductAll = () => { setActiveProducts(ps) }

  const onProductsDelete = () => {
    const boxes = document.getElementsByClassName('chk')

    let checkedId = []
    for(var i = 0; i < boxes.length; i++){
      const box = boxes[i];
      if (box.checked) {
        checkedId.push(parseInt(box.id))
      }
    }
    setProducts(ps.filter( (p) => !checkedId.includes(p.id)))
  }

  const sort = (array) => array.sort((a, b) =>
    b.id - a.id
  )

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  return (
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
      </div>
    </>
  );
}

export default App;
