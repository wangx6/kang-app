import axios from 'axios';

const Product = (product) => {
  //state space is
  let products = [];

  // power space

  async function fetchProducts() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return await axios.get(url);
  }
  // api space
  return (
    <div>{product.id} {product.name}</div>
  )
};

export default Product;
