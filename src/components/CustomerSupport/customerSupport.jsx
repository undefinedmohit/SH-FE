import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './customerSupport.css';
import customerSupportPicture from '../../assets/customer_support_staff.jpg';

const CustomerSupport = () => {
  const [operatingHours, setOperatingHours] = useState([]);
  const [specialHours, setSpecialHours] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    dayOfWeek: '',
    open: '',
    close: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8080/hours/operating')
      .then(response => setOperatingHours(response.data))
      .catch(error => console.error('Error fetching operating hours:', error));

    axios.get('http://localhost:8080/hours/special')
      .then(response => setSpecialHours(response.data))
      .catch(error => console.error('Error fetching special hours:', error));
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/hours/operating', formData)
      .then(response => {
        setOperatingHours([...operatingHours, response.data]);
        handleCloseModal();
      })
      .catch(error => console.error('Error adding operating hours:', error));
  };

  return (
    <div className="customer-support-container">
      <div className="customer-support-section">
        <img src={customerSupportPicture} alt="Customer Support" className="customer-support" />
        <h2>Questions?</h2>
        <p>Our Customer Support will be opening late today. We apologize for any inconvenience.</p>
      </div>

      <div className="contact-methods">
        <div className="contact-method">
          <i className="fas fa-phone"></i>
          <span>Call: 888-551-7600</span>
          <span className="availability">Available 8am</span>
        </div>
        <div className="contact-method">
          <i className="fas fa-comment"></i>
          <span>Text: 888-551-7600</span>
          <span className="availability">Available 8am</span>
        </div>
        <div className="contact-method">
          <i className="fas fa-comments"></i>
          <span>Live Chat</span>
          <span className="availability">Available 8am</span>
        </div>
        <div className="contact-method">
          <i className="fas fa-envelope"></i>
          <span>Email</span>
          <span className="availability">Response by Sun</span>
        </div>
      </div>

      <div className="hours-section">
        <h3>Special Hours</h3>
        {specialHours.length > 0 ? (
          <p>{specialHours[0].open} - {specialHours[0].close}</p>
        ) : (
          <p>No special hours available.</p>
        )}
        <h3>Operating Hours</h3>
        {operatingHours.length > 0 ? (
          operatingHours.map((hours, index) => (
            <div key={index}>
              <p>{hours.dayOfWeek}: {hours.open} - {hours.close}</p>
            </div>
          ))
        ) : (
          <p>No operating hours available.</p>
        )}
      </div>


      <button className="add-hours-btn" onClick={handleOpenModal}>
        Add Operating Hours
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add Operating Hours</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="dayOfWeek">Day of Week:</label>
                <input
                  type="text"
                  id="dayOfWeek"
                  name="dayOfWeek"
                  value={formData.dayOfWeek}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="open">Open Time:</label>
                <input
                  type="text"
                  id="open"
                  name="open"
                  value={formData.open}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="close">Close Time:</label>
                <input
                  type="text"
                  id="close"
                  name="close"
                  value={formData.close}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">Submit</button>
              <button type="button" className="close-btn" onClick={handleCloseModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSupport;
