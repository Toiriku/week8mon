import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EditPropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    price: "",
    location: { address: "", city: "", state: "", zipCode: "" },
    squareFeet: "",
    yearBuilt: ""
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/property/${id}`);
        if (!res.ok) {
          throw new Error("Property not found");
        }
        const data = await res.json();
        setProperty(data);
        setFormData(data); // Set form fields to current property data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/property/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        throw new Error("Failed to update property");
      }
      alert("Property updated successfully");
      navigate(`/property/${id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="edit-property">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>Edit Property</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
            />
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              placeholder="Type"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
            {/* Add more form fields for other properties */}
            <button type="submit">Save Changes</button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditPropertyPage;
