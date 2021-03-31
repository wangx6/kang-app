import { useState, useEffect } from "react";
import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';

export const ProductsModelContext = React.createContext();

export const ProductsModel = () => {
  //state
  const [activeProducts, setActiveProducts] = useState([]);
  const [ps, setProducts] = useState([]);

  //power
  useEffect(() => {
    setActiveProducts(ps);
  }, [ps]);

  const fetchAll = async () => {
    return await axios.get('https://jsonplaceholder.typicode.com/users');
  };

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
      resolve(ps.find((p) => p.id === parseInt(pId)))
    );

  return {
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
      setProducts,
    },
  }
};

const ProductProvider = (props) => {
  const productModel = ProductsModel();
  return (
    <ProductsModelContext.Provider
      value={productModel}
    >
      {props.children}
    </ProductsModelContext.Provider>
  )
}

ProductProvider.propTypes = {
  children: PropTypes.any,
};

export default ProductProvider;