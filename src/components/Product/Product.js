import { useParams, useHistory } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import { ProductsModelContext } from "../../model/ProductsModel/ProductsModel";
import { Link } from "react-router-dom";
import { UserContext } from "../../model/UserModel/UserModel";

function Product() {
  // state space
  const { service: productsService } = useContext(ProductsModelContext);
  const { user } = useContext(UserContext);
  const { pId } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({});

  // controller space
  useEffect(() => {
    productsService.fetchProductById(pId).then((res) => setProduct(res));
  }, []);

  const onClickName = () => {
    setTimeout(() => {
      history.push({ pathname: "/products" });
    }, 1000);
  };

  // view space
  return (
    <>
      <div>
        <h1>Hi User {user.email}</h1>
        <h1 onClick={onClickName}>{product.name}</h1>
      </div>
      <div>
        <Link to="/products">Go back to product</Link>
      </div>
    </>
  );
}
export default Product;
