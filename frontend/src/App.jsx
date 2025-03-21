import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddPropertyPage from "./pages/AddPropertyPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import PropertyDetails from "./components/PropertyDetails";
import EditPropertyPage from "./components/EditProperty";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-property" element={<AddPropertyPage />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/edit-property/:id" element={<EditPropertyPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
