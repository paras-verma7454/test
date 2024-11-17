import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TablePagination } from '@mui/material';
import { Delete, Edit, ArrowDownward, ArrowUpward } from '@mui/icons-material'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDirection, setSortDirection] = useState('asc'); 
  const [sortedContacts, setSortedContacts] = useState([]);
  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/contacts');
      setContacts(response.data);
      setSortedContacts(response.data); 
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  const handleSort = (column) => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(direction);

    const sorted = [...contacts].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortedContacts(sorted);
  };

  return (
    <TableContainer>
      <Table >
        <TableHead>
          <TableRow sx={{backgroundColor: 'rgb(155 150 150)'}} >
            
            <TableCell
              sx={{ fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => handleSort('firstName')} 
              style={{ display: 'flex', alignItems: 'center',paddingTop: '18px'  }} 
            >
              First Name
              {sortDirection === 'asc' ? ( <ArrowUpward style={{ marginLeft: 8 }} /> ) : ( <ArrowDownward style={{ marginLeft: 8 }} /> )}
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Job Title</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedContacts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.jobTitle}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(contact.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(contact.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={contacts.length}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        rowsPerPageOptions={[10, 20, 30]}
      />
    </TableContainer>
  );
};

export default ContactsTable;
