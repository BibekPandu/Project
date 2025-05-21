import { useState } from "react";
import {
  FaUser,
  FaHome,
  FaIdCard,
  FaCalendarAlt,
  FaCar,
  FaMotorcycle,
  FaBus,
  FaTruck,
  FaGasPump,
  FaCamera,
  FaBatteryFull, // Using FaBatteryFull instead of FaBattery
} from "react-icons/fa";
import "./VehicleRegister.css";
const VehicleRegister = () => {
  const [formData, setFormData] = useState({
    // Owner Details
    ownerFullName: "",
    ownerAddress: "",
    citizenshipNumber: "",
    issuingDistrict: "",
    registrationDate: "",
    ownerPhoto: null,

    // Vehicle Details
    registrationNumber: "",
    vehicleType: "",
    brandModel: "",
    engineNumber: "",
    chassisNumber: "",
    fuelType: "",

    // Registration Details
    initialRegistrationDate: "",
    transportOffice: "",
    renewalDates: "",
    ownershipTransfer: "",
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        ownerPhoto: file,
      });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Vehicle registration submitted successfully!");
    // Here you would typically send the data to your backend
  };

  return (
    <div className="vehicle-register-container">
      <div className="vehicle-register-card">
        <h2 className="vehicle-register-title">Vehicle Registration Form</h2>

        <form onSubmit={handleSubmit} className="vehicle-register-form">
          {/* Owner Details Section */}
          <div className="form-section">
            <h3 className="section-title">
              <FaUser className="section-icon" /> Owner Details
            </h3>

            <div className="input-group">
              <div className="input-field">
                <label>Full Name of Owner</label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="ownerFullName"
                    value={formData.ownerFullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="input-field">
                <label>Address (Permanent or Temporary)</label>
                <div className="input-with-icon">
                  <FaHome className="input-icon" />
                  <input
                    type="text"
                    name="ownerAddress"
                    value={formData.ownerAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="input-group">
              <div className="input-field">
                <label>Citizenship Number</label>
                <div className="input-with-icon">
                  <FaIdCard className="input-icon" />
                  <input
                    type="text"
                    name="citizenshipNumber"
                    value={formData.citizenshipNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="input-field">
                <label>Issuing District</label>
                <input
                  type="text"
                  name="issuingDistrict"
                  value={formData.issuingDistrict}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-field">
                <label>Date of Registration</label>
                <div className="input-with-icon">
                  <FaCalendarAlt className="input-icon" />
                  <input
                    type="date"
                    name="registrationDate"
                    value={formData.registrationDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="input-field photo-upload">
                <label>Photo of the Owner</label>
                <div className="photo-upload-container">
                  <label className="upload-btn">
                    <FaCamera className="upload-icon" />
                    <span>Choose Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </label>
                  {previewImage && (
                    <div className="image-preview">
                      <img src={previewImage} alt="Owner Preview" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Details Section */}
          <div className="form-section">
            <h3 className="section-title">
              <FaCar className="section-icon" /> Vehicle Details
            </h3>

            <div className="input-group">
              <div className="input-field">
                <label>Vehicle Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  placeholder="e.g., BA 2 PA 1234"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-field">
                <label>Vehicle Type</label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="Car">
                    <FaCar /> Car
                  </option>
                  <option value="Motorcycle">
                    <FaMotorcycle /> Motorcycle
                  </option>
                  <option value="Bus">
                    <FaBus /> Bus
                  </option>
                  <option value="Truck">
                    <FaTruck /> Truck
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <div className="input-field">
                <label>Brand/Model</label>
                <input
                  type="text"
                  name="brandModel"
                  placeholder="e.g., Bajaj Pulsar, Hyundai i20"
                  value={formData.brandModel}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-field">
                <label>Engine Number</label>
                <input
                  type="text"
                  name="engineNumber"
                  value={formData.engineNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-field">
                <label>Chassis Number</label>
                <input
                  type="text"
                  name="chassisNumber"
                  value={formData.chassisNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-field">
                <label>Fuel Type</label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Fuel Type</option>
                  <option value="Petrol">
                    <FaGasPump /> Petrol
                  </option>
                  <option value="Diesel">
                    <FaGasPump /> Diesel
                  </option>
                  <option value="Electric">
                    <FaBatteryFull /> Electric
                  </option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          {/* Registration Details Section */}
          <div className="form-section">
            <h3 className="section-title">
              <FaIdCard className="section-icon" /> Registration Details
            </h3>

            <div className="input-group">
              <div className="input-field">
                <label>Date of Initial Registration</label>
                <div className="input-with-icon">
                  <FaCalendarAlt className="input-icon" />
                  <input
                    type="date"
                    name="initialRegistrationDate"
                    value={formData.initialRegistrationDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="input-field">
                <label>Transport Office where registered</label>
                <input
                  type="text"
                  name="transportOffice"
                  value={formData.transportOffice}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-field">
                <label>Renewal Dates</label>
                <input
                  type="date"
                  name="renewalDates"
                  value={formData.renewalDates}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-field">
                <label>Ownership Transfer Records (if applicable)</label>
                <textarea
                  name="ownershipTransfer"
                  value={formData.ownershipTransfer}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Register Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleRegister;
