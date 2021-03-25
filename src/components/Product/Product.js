/* eslint-disable */
import { useParams } from "react-router";
import React, {useContext, useState, useEffect} from "react";
import { ProductsContext } from '../../model/ProductsModel';
import { Link } from "react-router-dom";
// CONTEXTS


function Product() {
  // state space
  const { pid } = useParams();
  const { service: productService } = useContext(ProductsContext);
  const [ product, setProduct ] = useState({});

  // controller space
  useEffect(() => {
    productService.fetchById(pid).then(res =>{
      setProduct(res);
    });
  }, []);

  // view space
  return (
    <>
      <div>
        <div style={{display: 'flex'}}>
          <div>{product.name}</div>
        </div>
      </div>
      <div>
        <Link to="/">Go back to product</Link>
      </div>
    </>
  );
}
export default Product;
