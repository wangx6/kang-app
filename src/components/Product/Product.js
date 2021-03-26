import { useParams } from "react-router";
import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ProductsModelContext } from "../../context/ProductsModelContext";

function Product() {
  // state space
  const history = useHistory();
  const { pId } = useParams();
  const { productsService } = useContext(ProductsModelContext);
  const [product, setProduct] = useState({});

  // controller space
  useEffect(() => {
    productsService.fetchProductById(pId).then((res) => setProduct(res));
  }, []);

  const onClickName = () => {
    setTimeout(() => {
      history.push({
        pathname: "/",
      });
    }, 1000);
  };

  // view state
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
