import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Alert,Container } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateContactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const fetchContact = async () => {
    try {
      const response = await axios.get(`/contacts/${id}`);
      setFormData(response.data);
    } catch (error) {
      setError('Failed to load contact data');
    }
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(`/contacts/${id}`, formData);

      if (response.status === 200) {
        setSuccess('Contact updated successfully!');
        setTimeout(() => navigate('/table'), 1500);
      }
    } catch (err) {
      setError('Failed to update contact');
    }
  };

  return (

     <Container>
      <Box >
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
      
      <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} sx={{width:'400px'}}  />
      <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} sx={{width:'400px'}}  />
      <TextField label="Email" name="email" value={formData.email} onChange={handleChange} sx={{width:'400px'}}  />
      <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} sx={{width:'400px'}} />
      <TextField label="Company" name="company" value={formData.company} onChange={handleChange} sx={{width:'400px'}} />
      <TextField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} sx={{width:'400px'}} />
      <Button type="submit" variant="contained">Update Contact</Button>
    </Box>
    </Container>
  );
};

export default UpdateContactForm;
