import {useState, useEffect} from 'react';
const initialProducts = [
  { selected: false, id: 2, name: "li" },
  { selected: false, id: 1, name: "wang" },
  { selected: false, id: 3, name: "kang" },
  { selected: false, id: 4, name: "lee" },
  { selected: false, id: 8, name: "kang" },
  { selected: false, id: 6, name: "chun" },
];

const fetchProducts = () => {
  return new Promise((resolve) => {
    resolve(initialProducts);
  });
}

const useProducts = () => {
  // STATE_
  const [activeProducts, setActiveProducts] = useState([]);
  const [ps, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(result => {
      result = _sortById(result);
      setProducts(result);
    });
  },[])
  
  useEffect(() => {
    setActiveProducts(ps);
  }, [ps]);

  const addProduct = () => {
    setProducts([...ps, {
      selected: false,
      id: new Date().getTime(), 
      name: Math.random().toString(32)
    }]);
  }

  const deleteSelected = () => {
    setProducts(ps.filter(p => !p.selected));
  }

  const toggleSelected = (product) => {
    setProducts(ps.map(p => {
      if(product.id === p.id) {
        p.selected = !p.selected;
      }
      return p;
    }));
  }

  const queryNameContains = () => {
    setActiveProducts(ps.filter(p => p.name.includes('kang')));
  }

  const showAll = () => setActiveProducts(ps);

  const _sortById = (data) => {
    return data.sort((p1, p2) => p1.id - p2.id);
  };
  
  // API
  return {
    activeProducts,
    fetchProducts,
    addProduct,
    showAll,
    toggleSelected,
    deleteSelected,
    queryNameContains,
  };
};

export default useProducts;
