import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PropertyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteProperty = async (id) => {
    try {
      const res = await fetch(`/api/property/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete property");
      }
      alert("Property deleted successfully");
      navigate("/");  // Redirect to homepage after deletion
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("An error occurred while deleting the property.");
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/property/${id}`);
        if (!res.ok) {
          throw new Error("Property not found or network error");
        }
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const onDeleteClick = (propertyId) => {
    const confirm = window.confirm(
      `Are you sure you want to delete this property? (Property ID: ${propertyId})`
    );
    if (!confirm) return;

    deleteProperty(propertyId);
  };

  const onEditClick = (propertyId) => {
    // Navigate to the Edit page with the property ID
    navigate(`/edit-property/${propertyId}`);
  };

  return (
    <div className="property-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{property.title}</h2>
          <p><strong>Type:</strong> {property.type}</p>
          <p><strong>Description:</strong> {property.description}</p>
          <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
          <p><strong>Location:</strong> {property.location.address}, {property.location.city}, {property.location.state}, {property.location.zipCode}</p>
          <p><strong>Square Feet:</strong> {property.squareFeet} sqft</p>
          <p><strong>Year Built:</strong> {property.yearBuilt}</p>
          <button onClick={() => onDeleteClick(property._id)}>Delete Property</button>
          <button onClick={() => onEditClick(property._id)}>Edit Property</button>
        </>
      )}
    </div>
  );
};

export default PropertyPage;
