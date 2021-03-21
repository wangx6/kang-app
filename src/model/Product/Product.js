import axios from 'axios';

const Product = () => {
  //state space is
  let products = [];

  // power space

  async function fetchProducts() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return await axios.get(url);
  }
  // api space
  return {
    fetchProducts
  };
};

export default Product;
