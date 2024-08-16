import React from 'react'
import './App.css';
// import Card from './Components/Card';
import MasonryLayout from './Components/Card';
import { useAPI } from './Components/APIProvider/APIContext';
import CartDrawer from './Components/CartPage';
import CartButton from './Components/CartButton';

function Home() {
  const { data, cartData } = useAPI()
  const [isopen, setIsopen] = React.useState(false)

  const handleAddToCart = () => {
    setIsopen(true)
  }
  return (
    <>
      {!isopen && <CartButton itemCount={cartData.length} onClick={handleAddToCart} />}
      <div className='test'>
        {/* {
        data.map(obj => {
          return (<Card image={obj.image} title={obj.title} description={obj.description} id={obj.id}/>)
        })
      } */}
        <MasonryLayout items={data} />
      </div>
      <CartDrawer isOpen={isopen} onClose={() => setIsopen(false)} />
    </>


  );
}

export default Home;
