import { useState, useEffect } from "react";
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const ProductsModelContext = React.createContext();

export const ProductsModel = () => {
  //state
  const [activeProducts, setActiveProducts] = useState([]);
  const [products, setProducts] = useState([]);

  //power
  useEffect(() => {
    setActiveProducts(products);
  }, [products]);

  const fetchAll = async () => {
    return await axios.get("https://jsonplaceholder.typicode.com/users");
  };

  const addRandomProduct = () => {
    setProducts([
      ...products,
      {
        id: new Date().getTime(),
        name: Math.random().toString(32),
        selected: false,
      },
    ]);
  };

  const selectProduct = (product) => {
    setProducts(
      products.map((p) => {
        if (p.id === product.id) p.selected = !p.selected;
        return p;
      })
    );
  };

  const filterProductByName = () => {
    setActiveProducts(
      products.filter((p) => {
        return p.name.includes("kang");
      })
    );
  };

  const getAll = () => {
    setActiveProducts(products);
  };

  const deleteSelected = () => {
    setProducts(products.filter(p => !p.selected));
  };

  const getProductById = (pId) => {
    return activeProducts.find((p) => p.id === pId);
  };

  const fetchProductById = (pId) =>
    new Promise((resolve) => resolve(products.find((p) => p.id === parseInt(pId))));

  return {
    activeProducts,
    products,
    service: {
      addRandomProduct,
      selectProduct,
      filterProductByName,
      getAll,
      deleteSelected,
      getProductById,
      fetchProductById,
      fetchAll,
      setActiveProducts,
      setProducts,
    },
  };
};

const ProductProvider = (props) => {
  const productModel = ProductsModel();
  return (
    <ProductsModelContext.Provider value={productModel}>
      {props.children}
    </ProductsModelContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.any,
};

export default ProductProvider;
