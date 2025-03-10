import { useState } from "react";

const AddPropertyPage = () => {
  const [property, setProperty] = useState({
    title: "",
    type: "Apartment",
    description: "",
    price: "",
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    squareFeet: "",
    yearBuilt: "",
  });

  const [message, setMessage] = useState(""); // To show success or error message

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("location.")) {
      const key = name.split(".")[1];
      setProperty((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else {
      setProperty((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response = await fetch("api/property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(property),
      });

      if (!response.ok) {
        throw new Error("Failed to add property");
      }

      setMessage("Property added successfully!");
      setProperty({
        title: "",
        type: "Apartment",
        description: "",
        price: "",
        location: { address: "", city: "", state: "", zipCode: "" },
        squareFeet: "",
        yearBuilt: "",
      });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Property</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={submitForm}>
        <label>Property Title:</label>
        <input type="text" name="title" required value={property.title} onChange={handleChange} />

        <label>Property Type:</label>
        <select name="type" value={property.type} onChange={handleChange}>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Commercial">Commercial</option>
        </select>

        <label>Description:</label>
        <textarea name="description" required value={property.description} onChange={handleChange}></textarea>

        <label>Price ($):</label>
        <input type="number" name="price" required value={property.price} onChange={handleChange} />

        <h3>Location Details</h3>

        <label>Address:</label>
        <input type="text" name="location.address" required value={property.location.address} onChange={handleChange} />

        <label>City:</label>
        <input type="text" name="location.city" required value={property.location.city} onChange={handleChange} />

        <label>State:</label>
        <input type="text" name="location.state" required value={property.location.state} onChange={handleChange} />

        <label>ZIP Code:</label>
        <input type="text" name="location.zipCode" required value={property.location.zipCode} onChange={handleChange} />

        <label>Square Feet:</label>
        <input type="number" name="squareFeet" required value={property.squareFeet} onChange={handleChange} />

        <label>Year Built:</label>
        <input type="number" name="yearBuilt" required value={property.yearBuilt} onChange={handleChange} />

        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
