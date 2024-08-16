import React from 'react';
import './Style.css';
import { useAPI } from './APIProvider/APIContext';

const CartDrawer = ({ isOpen, onClose, cartItems }) => {
    const { cartData, onUpdateQuantity, onRemoveItem } = useAPI();
    const [applyDiscount, setApplyDiscount] = React.useState(false);
    const [applyOffer, setApplyOffer] = React.useState(false);

    const totalAmount = cartData.reduce((acc, item) => acc + (item.newPrice || item.price), 0);
    console.log('totalAmount: ', totalAmount);

    const discount = applyDiscount ? totalAmount * 0.1 : 0; // 10% discount
    const offer = applyOffer ? 10 : 0; // 5% offer

    const finalAmount = totalAmount - discount - offer;

    const handleCheckout = () => {
        window.location.href = '/checkout'; // Redirect to checkout page
    };

    return (
        <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
            <div className="cart-drawer-header">
                <h2>Your Cart</h2>
                <button onClick={onClose} className="cart-drawer-close">&times;</button>
            </div>
            <div className="cart-drawer-content">
                {cartData.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    cartData.map(item => (
                        <div key={item.id} className="cart-drawer-item">
                            <img src={item.image} alt={item.name} className="cart-drawer-item-image" />
                            <div className="cart-drawer-item-details">
                                <h3>{item.name}</h3>
                                <p>${item?.newPrice?.toFixed(2) || item.price.toFixed(2)}</p>
                                <div className="cart-drawer-item-controls">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => onUpdateQuantity(item.id, e.target.value)}
                                        min="1"
                                        className="cart-drawer-quantity"
                                    />
                                    <button onClick={() => onRemoveItem(item.id)} className="cart-drawer-remove">Remove</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {cartData.length > 0 && (
                <div className="cart-drawer-footer">
                    <div className="cart-drawer-summary">
                        <div className="cart-drawer-summary-item">
                            <input 
                                type="checkbox" 
                                id="discount" 
                                checked={applyDiscount} 
                                onChange={() => setApplyDiscount(!applyDiscount)} 
                            />
                            <label htmlFor="discount">Apply 10% Discount</label>
                        </div>
                        <div className="cart-drawer-summary-item">
                            <input 
                                type="checkbox" 
                                id="offer" 
                                checked={applyOffer} 
                                onChange={() => setApplyOffer(!applyOffer)} 
                            />
                            <label htmlFor="offer">Apply $10 off Offer</label>
                        </div>
                        <p>Total: ${totalAmount.toFixed(2)}</p>
                        <p>Discount: -${discount.toFixed(2)}</p>
                        <p>Offer: -${offer.toFixed(2)}</p>
                        <h3>Final Amount: ${finalAmount.toFixed(2)}</h3>
                    </div>
                    <button onClick={handleCheckout} className="cart-drawer-checkout">
                        Proceed to Checkout
                    </button>
                </div>
            )}

        </div>
    );
};

export default CartDrawer;
