import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import './customerSupport.css';
import customerSupportPicture from '../../assets/customer_support_staff.jpg';

const CustomerSupport = () => {
  const [operatingHours, setOperatingHours] = useState([]);
  const [specialHours, setSpecialHours] = useState([]);
  const [operatingModal, setOperatingModal] = useState(false);
  const [specialModal, setSpecialModal] = useState(false);
  const [newOperatingHour, setNewOperatingHour] = useState({
    dayOfWeek: '',
    open: '',
    close: ''
  });
  const [newSpecialHour, setNewSpecialHour] = useState({
    open: '',
    close: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8080/hours/operating')
      .then(response => setOperatingHours(response.data))
      .catch(error => console.error('Error fetching operating hours:', error));

    axios.get('http://localhost:8080/hours/special')
      .then(response => setSpecialHours(response.data))
      .catch(error => console.error('Error fetching special hours:', error));
  }, []);

  const toggleOperatingModal = () => setOperatingModal(!operatingModal);
  const toggleSpecialModal = () => setSpecialModal(!specialModal);

  const handleOperatingHourChange = (e) => {
    setNewOperatingHour({ ...newOperatingHour, [e.target.name]: e.target.value });
  };

  const handleSpecialHourChange = (e) => {
    setNewSpecialHour({ ...newSpecialHour, [e.target.name]: e.target.value });
  };

  const submitOperatingHour = () => {
    // Handle the submission of the new operating hour
    axios.post('http://localhost:8080/hours/operating', newOperatingHour)
      .then(response => {
        setOperatingHours([...operatingHours, response.data]);
        toggleOperatingModal();
      })
      .catch(error => console.error('Error adding operating hour:', error));
  };

  const submitSpecialHour = () => {
    // Handle the submission of the new special hour
    axios.post('http://localhost:8080/hours/special', newSpecialHour)
      .then(response => {
        setSpecialHours([...specialHours, response.data]);
        toggleSpecialModal();
      })
      .catch(error => console.error('Error adding special hour:', error));
  };

  return (

    <div className="customer-support-container">
      <div className="d-flex justify-content-between">
        <Button color="danger" className="col-md-6" onClick={toggleSpecialModal}>Add Special Hours</Button>
        <Button color="primary" className="col-md-6" onClick={toggleOperatingModal}>Add Operating Hours</Button>
      </div>
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
        <h4>Special Hours</h4>
        {specialHours.length > 0 ? (
          specialHours.map((hour, index) => (
            <p key={index} style={{ color: '#fe3616' }}>{hour.open} - {hour.close}</p>
          ))
        ) : (
          <p>No special hours available.</p>
        )}


        <h4>Operating Hours</h4>
        {operatingHours.length > 0 ? (
          operatingHours.map((hours, index) => (
            <div key={index}>
              <p style={{fontWeight: '700'}}>{hours.dayOfWeek}</p>
                <p>{hours.open} - {hours.close}</p>
            </div>
          ))
        ) : (
          <p>No operating hours available.</p>
        )}
      </div>

      <Modal isOpen={operatingModal} toggle={toggleOperatingModal}>
        <ModalHeader toggle={toggleOperatingModal}>Add Operating Hours</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="dayOfWeek">Days of the Week</Label>
              <Input type="text" name="dayOfWeek" id="dayOfWeek" placeholder="Enter Days of the Week" value={newOperatingHour.dayOfWeek} onChange={handleOperatingHourChange} />
            </FormGroup>
            <FormGroup>
              <Label for="open">Open Time</Label>
              <Input type="text" name="open" id="open" placeholder="Enter opening time" value={newOperatingHour.open} onChange={handleOperatingHourChange} />
            </FormGroup>
            <FormGroup>
              <Label for="close">Close Time</Label>
              <Input type="text" name="close" id="close" placeholder="Enter closing time" value={newOperatingHour.close} onChange={handleOperatingHourChange} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitOperatingHour}>Save</Button>{' '}
          <Button color="secondary" onClick={toggleOperatingModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={specialModal} toggle={toggleSpecialModal}>
        <ModalHeader toggle={toggleSpecialModal}>Add Special Hours</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="open">Open Time</Label>
              <Input type="text" name="open" id="open" placeholder="Enter opening time" value={newSpecialHour.open} onChange={handleSpecialHourChange} />
            </FormGroup>
            <FormGroup>
              <Label for="close">Close Time</Label>
              <Input type="text" name="close" id="close" placeholder="Enter closing time" value={newSpecialHour.close} onChange={handleSpecialHourChange} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitSpecialHour}>Save</Button>{' '}
          <Button color="secondary" onClick={toggleSpecialModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CustomerSupport;
