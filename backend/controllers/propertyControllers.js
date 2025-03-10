const Property = require("../models/propertyModel");
const mongoose = require("mongoose");

// GET all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch properties", details: error.message });
  }
};

// POST a new property
const createProperty = async (req, res) => {
  try {
    // Check if required fields are present
    const { name, address, price } = req.body;
    if (!name || !address || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(400).json({ error: "Failed to create property", details: error.message });
  }
};

// GET /properties/:propertyId
// GET /properties/:propertyId
const getPropertyById = async (req, res) => {
  const { propertyId } = req.params;

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ error: "Invalid property ID" });
  }

  try {
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ error: "Failed to fetch property", details: error.message });
  }
};

// PUT /properties/:propertyId
const updateProperty = async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.propertyId, 
      req.body, 
      { new: true }
    );
    
    if (!updatedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ error: "Failed to update property", details: error.message });
  }
};

// DELETE /properties/:propertyId
const deleteProperty = async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.propertyId);
    
    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete property", details: error.message });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
