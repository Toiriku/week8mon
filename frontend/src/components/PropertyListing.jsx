import { useState, useEffect } from "react";
import mockProperties from "./MockProperties"; // Import mock data

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setProperties(mockProperties); // Use mock data
    }, 500);
  }, []);

  return (
    <div className="property-listing">
      <h2>Available Properties</h2>
      <div className="property-grid">
        {properties.length === 0 ? (
          <p>Loading properties...</p>
        ) : (
          properties.map((property) => (
            <div key={property._id} className="property-card">
              <h3>{property.title}</h3>
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
