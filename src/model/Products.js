import { useState, useEffect } from "react";

const initProduct = [
  { id: 1, name: "kang", selected: false },
  { id: 2, name: "xx", selected: false },
  { id: 0, name: "zz", selected: false },
  { id: 9, name: "ee", selected: false },
  { id: 8, name: "yy", selected: false },
];

const fetchAll = () => {
  return new Promise((resolve) => {
    resolve(initProduct);
  });
};

const useProducts = () => {
  //state
  const [activeProducts, setActiveProducts] = useState([]);
  const [ps, setProducts] = useState([]);

  //power
  useEffect(() => {
    fetchAll().then((result) => {
      result = _sortById(result);
      setProducts(result);
    });
  }, []);

  useEffect(() => {
    setActiveProducts(ps);
    // console.log('hjere')
    // console.log(activeProducts)
  }, [ps]);

  const _sortById = (product) => product.sort((d1, d2) => d1.id - d2.id);

  const addRandomProduct = () => {
    setProducts([
      ...ps,
      {
        id: new Date().getTime(),
        name: Math.random().toString(32),
        selected: false,
      },
    ]);
  };

  const selectProduct = (product) => {
    setProducts(
      ps.map((p) => {
        if (p.id === product.id) p.selected = !p.selected;
        return p;
      })
    );
  };

  const fliterProductByName = () => {
    setActiveProducts(
      ps.filter((p) => {
        return p.name.includes("kang");
      })
    );
  };

  const getAll = () => {
    setActiveProducts(ps);
  };

  const deleteSelected = () => {
    setProducts(ps.filter((p) => !p.selected));
  };

  //api
  return {
    activeProducts,
    addRandomProduct,
    selectProduct,
    fliterProductByName,
    getAll,
    deleteSelected,
  };
};

export default useProducts;
