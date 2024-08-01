import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { increaseQuantity, decreaseQuantity, removeItem, clearCart } from '../../redux/cartSlice';
import "./index.css";

const Cart = () => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const getTotalCost = () => {
        return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    const getTotalCount = () => {
        return cart.reduce((count, item) => count + (item.quantity || 1), 0);
    };

    return (
        <div className="cart-cont">
            <div className='cart-top-cont'>
                <h1 className='cart-head'>Your Cart</h1>
                {/* <div className="cart-details"> */}
                    <button onClick={() => dispatch(clearCart())} className="btn btn-primary">Clear Cart</button>
                {/* </div> */}
            </div>
         
            <div className="cart-items">
                {cart.length === 0 ? (<div className='mpty-cont'><p className='mpty-msg'>Your cart is empty <Link to="/properties" className='link-none'>Add items</Link></p></div>) : (<div>
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h2 className='cart-item-title'>{item.title}</h2>
                                <p className='cart-item-price' >Price: ₹ {item.price}</p>
                                <p className='cart-item-quantity '>Quantity: {item.quantity}</p>
                                <div className="quantity-changes">
                                    <button className='quantity-button' onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                                    <span className='quantity'>{item.quantity || 1}</span>
                                    <button className='quantity-button' onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                                </div>
                                <button onClick={() => dispatch(removeItem(item.id))} className="btn btn-primary">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                )}

            </div>
            <div className='cart-bottom'>
                <div>
                    <Link to="/" className="btn btn-primary">Back to Listings</Link>
                </div>
                <div className="cart-summary">
                    <p className='cart-total'>Total Cost: <span className='price-span'>₹ {getTotalCost()}</span></p>
                    <p className='cart-total'>Total Items: <span className='price-span'>{getTotalCount()}</span></p>
                    <Link to="/checkout" className='mt-2'>
                        <button className="btn btn-info">
                            Proceed to Checkout
                        </button>

                    </Link>
                </div>

            </div>
        
        </div>
    );
};

export default Cart;
