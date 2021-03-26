import { useParams, useHistory } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import { ProductsModelContext } from "../../model/ProductsModel";
import { Link } from "react-router-dom";

function Product() {
  // state space
  const { service: productsService } = useContext(ProductsModelContext);
  const { pId } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({});

  // controller space
  useEffect(() => {
    productsService.fetchProductById(pId).then((res) => setProduct(res));
  }, []);

  const onClickName = () => {
    setTimeout(() => {
      history.push({ pathname: "/" });
    }, 1000);
  };

  // view space
  return (
    <>
      <div>
        <h1 onClick={onClickName}>{product.name}</h1>
      </div>
      <div>
        <Link to="/">Go back to product</Link>
      </div>
    </>
  );
}
export default Product;
