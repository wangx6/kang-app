import { useState, useEffect } from "react";
import React from "react";
import PropTypes from "prop-types";

const initProduct = [
  { id: 1, name: "kang", selected: false },
  { id: 2, name: "xx", selected: false },
  { id: 0, name: "zz", selected: false },
  { id: 9, name: "ee", selected: false },
  { id: 8, name: "yy", selected: false },
];

export const ProductsModelContext = React.createContext();

const ProductsModel = (props) => {
  //state
  const [activeProducts, setActiveProducts] = useState([]);
  const [ps, setProducts] = useState([]);

  //power
  useEffect(() => {
    setActiveProducts(ps);
  }, [ps]);

  const fetchAll = () => {
    return new Promise((resolve) => {
      resolve(initProduct);
    }).then((res) => {
      res = _sortById(res);
      setProducts(res);
    });
  };

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
    return activeProducts.find((p) => p.id === parseInt(pId));
  };

  const fetchProductById = (pId) =>
    new Promise((resolve) =>
      resolve(initProduct.find((p) => p.id === parseInt(pId)))
    );

  return (
    <ProductsModelContext.Provider
      value={{
        activeProducts,
        service: {
          addRandomProduct,
          selectProduct,
          filterProductByName,
          getAll,
          deleteSelected,
          getProductById,
          fetchProductById,
          fetchAll,
        },
      }}
    >
      {props.children}
    </ProductsModelContext.Provider>
  );
};

ProductsModel.propTypes = {
  children: PropTypes.any,
};

export default ProductsModel;
