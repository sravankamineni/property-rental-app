import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate , Link} from 'react-router-dom';
import { clearCart } from '../../redux/cartSlice';
import "./index.css";

const Checkout = () => {
    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactInfo({
            ...contactInfo,
            [name]: value
        });
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({
            ...paymentInfo,
            [name]: value
        });
    };

    const handleCheckout = () => {
        alert('Order placed successfully!');
        dispatch(clearCart());
        navigate('/');
    };

    const getTotalCost = () => {
        return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    };

    return (
        <div className="checkout-cont">
            <div className='checkout-top-cont'>
                <h2 className="checkout-head">Checkout</h2>
                <Link to="/cart" className="btn btn-primary">Back to Cart</Link>
            </div>

        
         
            <div className="checkout-details">
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <div className="checkout-items">
                        {cart.length === 0 ? (
                            <p className="empty-cart-message">Your cart is empty. <Link to="/properties" className='link-none'>Add items</Link></p>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="checkout-item">
                                    <img src={item.image} alt={item.title} className="checkout-item-image" />
                                    <div className="checkout-item-details">
                                        <h5 className="checkout-item-title">{item.title}</h5>
                                        <p className="checkout-item-price">Price: ₹ {item.price}</p>
                                        <p className="checkout-item-quantity">Quantity: {item.quantity || 1}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="checkout-total">
                        <p>Total Cost: ₹ {getTotalCost()}</p>
                    </div>
                </div>
                <div className="checkout-form-container">
                    <h3>Contact Information</h3>
                    <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={contactInfo.name}
                                onChange={handleContactChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={contactInfo.email}
                                onChange={handleContactChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={contactInfo.phone}
                                onChange={handleContactChange}
                                required
                            />
                        </div>
                        <h3>Payment Information</h3>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number:</label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={paymentInfo.cardNumber}
                                onChange={handlePaymentChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiryDate">Expiry Date:</label>
                            <input
                                type="text"
                                id="expiryDate"
                                name="expiryDate"
                                value={paymentInfo.expiryDate}
                                onChange={handlePaymentChange}
                                placeholder='MM / YY'
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvv">CVV:</label>
                            <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={paymentInfo.cvv}
                                onChange={handlePaymentChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-info mt-2">Place Order</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
