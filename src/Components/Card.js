import React from 'react'
import './Style.css'
import { useAPI } from './APIProvider/APIContext';


const Card = ({ image, title, description,price, id }) => {
    const { onAddToCart } = useAPI();
    return (
        <div className="test2">
            <div>
                <img src={image} alt={title} className="card-image" />
                <div className='card-content'>
                    <h3 className="card-title">{title}</h3>
                    <p className="card-description">{description}</p>
                    <p className="card-price">{`$${price}`}</p>
                </div>
            </div>
            <div className='button-cls'>
                <button className="card-add-to-cart" onClick={() => onAddToCart(id)}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

const MasonryLayout = ({ items }) => {
    return (
        <div className="container">
            {items.map((item) => (
                <div className='item'>
                    <Card
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        title={item.title}
                        price={item.price}
                        description={item.description}
                    />
                </div>
            ))}
        </div>
    );
};
export default MasonryLayout