import { useParams } from "react-router";
import React from "react";
import useProducts from "../../model/Products";
import { Link } from "react-router-dom";

function Product() {
  const { pId } = useParams();
  const { getProductById } = useProducts();
  const product = getProductById(pId)[0];

  console.log(product);

  return (
      <>
    <div>
      xxhello
      {/* <h1>{product.name}xxx</h1> */}
    </div>
    <div><Link to='/'>Go back to product</Link></div>
    </>
  );
}
export default Product;
