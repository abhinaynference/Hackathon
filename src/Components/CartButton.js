import React from 'react';
import './Style.css';

export default function CartButton({ itemCount, onClick }) {
  return (
    <div className="cart-button" onClick={onClick}>
      <div className="cart-icon">
        🛒
      </div>
      {itemCount > 0 && <div className="item-count">{itemCount}</div>}
    </div>
  );
}