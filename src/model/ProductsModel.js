/* eslint-disable */
import React, { useState, useEffect } from "react";
import { createContext } from "react";
import PropTypes from "react";

export const ProductsContext = createContext();

const initProduct = [
  { id: 1, name: "kang", selected: false },
  { id: 2, name: "xx", selected: false },
  { id: 0, name: "zz", selected: false },
  { id: 9, name: "ee", selected: false },
  { id: 8, name: "yy", selected: false },
];

const ProductsModel = props => {
  //state
  const [activeProducts, setActiveProducts] = useState([]);
  const [ps, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});


  useEffect(() => {
    
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

  const fetchAll = () => {
    return new Promise((resolve) => {
      resolve(initProduct);
    });
  };

  const fetchById = pid => new Promise(resolve => resolve(initProduct.find(p => p.id === parseInt(pid))));

  const selectProduct = (product) => {
    setProducts(
      ps.map((p) => {
        if (p.id === product.id) p.selected = !p.selected;
        return p;
      })
    );
  };

  const filterProductByName = () => {
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

  const getProductById = (pId) => {
    return activeProducts.find(p => p.id === parseInt(pId));
  };

  return (
    <ProductsContext.Provider
      value={{
        activeProducts,
        selectedProduct,
        service: {
          fetchAll,
          fetchById,
          addRandomProduct,
          selectProduct,
          filterProductByName,
          getAll,
          deleteSelected,
          getProductById,
        },
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );

};

export default ProductsModel;
