
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer/Footer';

function App({onhanle}) {
  //state
  const [ps, setProducts] = useState([
    {
      id: 11, name: 'sdfa'
    },
    {
      id: 22, name: '6666'
    }
]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('asdasdfa');
    return () => {
      console.log('clean up');
    }
  },  []);

  const onClickAdd = () => {
    setProducts([{id: Math.random().toString(32), name: '888888'}, ...ps]);
  }


  // view space
  return (
    <>
      <div className="App">
        <Header></Header>
        <div>{ps.map(p =><div key={p.id}>
            <div>{p.id}</div>
            <div>{p.name}</div>
          </div>)}
        </div>

        <button onClick={onClickAdd}>Add</button>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
