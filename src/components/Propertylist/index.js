import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Range } from 'react-range';
import { addToCart } from '../../redux/cartSlice'
import "./index.css";

const properties = [
    {
        id: 1,
        image: 'https://res.cloudinary.com/dnmcjyigq/image/upload/v1722429004/types-of-properties-1_wl0d98.jpg',
        title: 'Mountain Haven in Manali',
        description: 'Nestled amidst the breathtaking mountains of Manali, this serene retreat offers the perfect escape from the hustle and bustle of city life.',
        price: 150000,
        location: 'Manali',
        bedrooms: 3,
        amenities: ['Wi-Fi', 'Spa', 'Pool', 'Kitchen'],
    },
    {
        id: 2,
        image: 'https://res.cloudinary.com/dnmcjyigq/image/upload/v1722429084/8cfddf258cc1442d9f5130e93bf71959_kjwnoz.jpg',
        title: 'Goa Beachside Luxury Villa',
        description: 'Experience the ultimate in luxury and relaxation at this stunning beachfront villa in Goa.',
        price: 450000,
        location: 'Goa',
        bedrooms: 4,
        amenities: ['Wi-Fi', 'Gym', 'Pool', 'Kitchen'],
    },
    {
        id: 3,
        image: 'https://res.cloudinary.com/dnmcjyigq/image/upload/v1722429091/orimark-properties-sahid-nagar-bhubaneshwar-estate-agents-for-residential-rental-3tovu63_esdzhk.jpg',
        title: 'Majestic Heritage Haveli in Jaipur',
        description: 'Step back in time and immerse yourself in the rich history of Jaipur at this exquisite heritage haveli.',
        price: 350000,
        location: 'Jaipur',
        bedrooms: 3,
        amenities: ['Wi-Fi', 'Kitchen'],
    },
    {
        id: 4,
        image: 'https://res.cloudinary.com/dnmcjyigq/image/upload/v1722429158/individual-houses-villas_aj4sjt.webp',
        title: 'Kerala Backwaters Eco Resort',
        description: 'Discover the tranquility of the Kerala backwaters at this eco-friendly resort, where sustainable practices and luxury coexist harmoniously.',
        price: 250000,
        location: 'Kerala',
        bedrooms: 2,
        amenities: ['Wi-Fi', "Parking", "Kitchen", "Gym", "Pool"],
    },
    {
        id: 5,
        image: 'https://res.cloudinary.com/dnmcjyigq/image/upload/v1722429225/unnamed_26_v71hst.jpg',
        title: 'Contemporary Urban Apartment in Mumbai',
        description: 'Located in the heart of Mumbai, this contemporary city apartment offers the perfect blend of style and convenience.',
        price: 400000,
        location: 'Mumbai',
        bedrooms: 2,
        amenities: ['Wi-Fi', 'Fitness Center', 'Rooftop Pool', 'City Views'],
    }
];


const PropertyList = () => {
    const [filters, setFilters] = useState({
        location: '',
        priceRange: [0, 1000000],
        bedrooms: 0,
        amenities: []
    });


    const dispatch = useDispatch();

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const handleAmenityChange = (e) => {
        const { value, checked } = e.target;
        const newAmenities = checked
            ? [...filters.amenities, value]
            : filters.amenities.filter(amenity => amenity !== value);
        setFilters({
            ...filters,
            amenities: newAmenities
        });
    };



    const filteredProperties = properties.filter(property => {
        const priceMatch = property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1];
        return (
            (filters.location === '' || property.location === filters.location) &&
            priceMatch &&
            (filters.bedrooms === 0 || property.bedrooms >= filters.bedrooms) &&
            (filters.amenities.length === 0 || filters.amenities.every(amenity => property.amenities.includes(amenity)))
        );
    });

    return (
        <div className="container-fluid cont">
            <div className="sidebar">
                <div className="filters">
                    <h2>Filter by: </h2>
                    <select className='mt-3 mb-3' name="location" value={filters.location} onChange={handleFilterChange}>
                        <option value="">All Locations</option>
                        {properties.map(eachProperty=>(
                            <option value={eachProperty.location}>{eachProperty.location}</option>
                        ))}
                       
                        {/* <option value="Hyderabad">Hyderabad</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option> */}
                    </select>

                    <div className="price-range">
                        <h3>Price Range</h3>
                        <Range
                            step={10000}
                            min={0}
                            max={1000000}
                            values={filters.priceRange}
                            onChange={(values) => setFilters({ ...filters, priceRange: values })}
                            renderTrack={({ props, children }) => (
                                <div
                                    {...props}
                                    className="range-track"
                                >
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div
                                    {...props}
                                    className="range-thumb"
                                />
                            )}
                        />
                        <div className="price-range-values">
                            <span>₹{filters.priceRange[0]}</span>
                            <span>₹{filters.priceRange[1]}</span>
                        </div>
                    </div>

                    <select name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange}>
                        <option value="0">Any Bedrooms</option>
                        <option value="1">1+ Bedrooms</option>
                        <option value="2">2+ Bedrooms</option>
                        <option value="3">3+ Bedrooms</option>
                    </select>

                    <div className="checkbox-group mt-3 mb-3">
                        <h3>Amenities</h3>
                        <ul>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Wi-Fi"
                                        checked={filters.amenities.includes('Wi-Fi')}
                                        onChange={handleAmenityChange}
                                    /> Wi-Fi
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Parking"
                                        checked={filters.amenities.includes('Parking')}
                                        onChange={handleAmenityChange}
                                    /> Parking
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Kitchen"
                                        checked={filters.amenities.includes('Kitchen')}
                                        onChange={handleAmenityChange}
                                    /> Kitchen
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Gym"
                                        checked={filters.amenities.includes('Gym')}
                                        onChange={handleAmenityChange}
                                    /> Gym
                                </label>
                            </li>
                            <li>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Pool"
                                        checked={filters.amenities.includes('Pool')}
                                        onChange={handleAmenityChange}
                                    /> Pool
                                </label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="product-list">
                <div className="row">
                    {filteredProperties.map(property => (
                        <div key={property.id} className="col-lg-4 col-xxl-4">
                            <div className="property-card mb-4">
                                <img src={property.image} className="card-img-top" alt={property.title} />
                                <div className="property-card-body">
                                    <h5 className="card-title">{property.title}</h5>
                                    <p className="card-text">{property.description}</p>
                                    <p className="card-text price">₹ {property.price}</p>
                                    <p className="card-text"><strong>{property.bedrooms} </strong>Bedrooms</p>
                                    <p className="card-text"><strong>Amenities:</strong> {property.amenities.join(', ')}</p>
                                    <button
                                        onClick={() => dispatch(addToCart(property))}
                                        className="btn btn-primary"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PropertyList;
