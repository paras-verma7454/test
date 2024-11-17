import React, { useState } from 'react';
import { TextField, Button, Box, Alert, Container } from '@mui/material';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');
    setSuccess('');

    

    try {
      
      const response = await axios.post('/contacts', formData);

      if (response.status === 201) {
        setSuccess('Contact added successfully!');
        setTimeout(() => navigate('/table'), 1500);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: '' });
      }
    } catch (err) {
      console.error('Error adding contact:', err.response.data.message);
      setError(err.response.data.message);
    }
  };

  return (
    <Container>
      <Box sx={{zIndex:'1'}}>
        {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      </Box>
      

    <Box component="form"  onSubmit={handleSubmit} sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      p: 4,
      mt: 5,
      backgroundColor: '#f5f5f5',
      borderRadius: 2,
      boxShadow: 3,
    }} >
      
      <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} sx={{width:'400px'}} required />
      <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} sx={{width:'400px'}} required />
      <TextField label="Email" name="email" value={formData.email} onChange={handleChange} sx={{width:'400px'}} required />
      <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} sx={{width:'400px'}} required/>
      <TextField label="Company" name="company" value={formData.company} onChange={handleChange} sx={{width:'400px'}} required/>
      <TextField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} sx={{width:'400px'}} required/>
      <Button type="submit" variant="contained">Add Contact</Button>
    </Box>
    </Container>
  );
};

export default ContactForm;
