import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/property')
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching properties');
        setLoading(false);
      });
  }, []);

  return (
    <div className="property-list">
      <h2>Available Properties</h2>
      <div className="property-grid">
        {loading ? (
          <p>Loading properties...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          properties.map((property) => (
            <div key={property._id} className="property-card">
              <Link to={`/property/${property._id}`}>
                <h3>{property.title}</h3>
              </Link>
              <p><strong>Type:</strong> {property.type}</p>
              <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
              <p><strong>Location:</strong> {property.location.city}, {property.location.state}</p>
              <p><strong>Square Feet:</strong> {property.squareFeet} sqft</p>
              <p><strong>Year Built:</strong> {property.yearBuilt}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PropertyListing;
