import { useParams } from "react-router";
import useProducts from "../../model/Products";
import React from "react";

function Product() {
  const { getProductById } = useProducts();
  let { pId } = useParams();
  console.log(pId);
  return <div>{getProductById(pId)} xxhello</div>;
}
export default Product;
