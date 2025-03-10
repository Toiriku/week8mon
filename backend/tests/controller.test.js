const request = require('supertest');
const app = require('../app'); // Adjust the path to your app file
const Property = require('../models/propertyModel');

// Mocking the Property model if you don't want to connect to a real database
jest.mock('../models/propertyModel');

// Test Suite for Property API
describe("Property API", () => {
  
  // Test for creating a new property
  it("should create a new property", async () => {
    const newProperty = {
      name: 'Sample Property',
      address: '123 Sample St',
      price: 500000,
    };

    // Mock the save function
    Property.prototype.save.mockResolvedValue(newProperty);

    const response = await request(app)
      .post("/api/property")
      .send(newProperty);
    
    expect(response.status).toBe(201); // Created
    expect(response.body.name).toBe(newProperty.name);
    expect(response.body.address).toBe(newProperty.address);
    expect(response.body.price).toBe(newProperty.price);
  });

  // Test for getting all properties
  it("should return all properties", async () => {
    const properties = [
      { name: 'Property 1', address: '123 St', price: 100000 },
      { name: 'Property 2', address: '456 St', price: 200000 },
    ];

    // Mock the find function
    Property.find.mockResolvedValue(properties);

    const response = await request(app).get("/api/property");
    
    expect(response.status).toBe(200); // OK
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe(properties[0].name);
  });

  // Test for getting a property by ID
  it("should return a property with the given ID", async () => {
    const propertyId = "605c72ef1532073f88c3b8bb"; // Example valid propertyId
    const property = {
      _id: propertyId,
      name: 'Sample Property',
      address: '123 Sample St',
      price: 500000,
    };

    // Mock the findById function
    Property.findById.mockResolvedValue(property);

    const response = await request(app).get(`/api/property/${propertyId}`);
    
    expect(response.status).toBe(200); // OK
    expect(response.body._id).toBe(propertyId);
    expect(response.body.name).toBe(property.name);
  });

  // Test for updating a property
  it("should update a property with the given ID", async () => {
    const propertyId = "605c72ef1532073f88c3b8bb";
    const updatedProperty = {
      name: 'Updated Property',
      address: '789 Updated St',
      price: 600000,
    };

    // Mock the findByIdAndUpdate function
    Property.findByIdAndUpdate.mockResolvedValue(updatedProperty);

    const response = await request(app)
      .put(`/api/property/${propertyId}`)
      .send(updatedProperty);
    
    expect(response.status).toBe(200); // OK
    expect(response.body.name).toBe(updatedProperty.name);
    expect(response.body.address).toBe(updatedProperty.address);
    expect(response.body.price).toBe(updatedProperty.price);
  });

  // Test for deleting a property
  it("should delete a property with the given ID", async () => {
    const propertyId = "605c72ef1532073f88c3b8bb";

    // Mock the findByIdAndDelete function
    Property.findByIdAndDelete.mockResolvedValue({ message: "Property deleted successfully" });

    const response = await request(app).delete(`/api/property/${propertyId}`);
    
    expect(response.status).toBe(200); // OK
    expect(response.body.message).toBe('Property deleted successfully');
  });

  // Test for error when missing required fields in creation
  it("should return an error if required fields are missing", async () => {
    const newProperty = {
      name: 'Sample Property',
      // Missing address and price
    };

    const response = await request(app)
      .post("/api/property")
      .send(newProperty);

    expect(response.status).toBe(400); // Bad request
    expect(response.body.error).toBe('Missing required fields');
  });

  // Test for invalid property ID
  it("should return 404 for invalid property ID", async () => {
    const invalidPropertyId = 'invalid-id'; // Invalid ID format
  
    const response = await request(app).get(`/api/property/${invalidPropertyId}`);
    
    expect(response.status).toBe(400); // Bad Request for invalid ID format
    expect(response.body.error).toBe('Invalid property ID');
  });  
});
