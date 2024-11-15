// EditProjectModal.js
import axios from 'axios';
import React from 'react';
import { Button, Modal, Typography, Card, CardHeader, Divider, Grid, FormControl, InputLabel, OutlinedInput, CardContent, CardActions, Grid2 } from '@mui/material';
import { Box } from '@mui/material';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const DeleteConfirmationModal = ({ open, handleRender,handleClose,ContactId }) => {
    
 
    const token = useSelector((state) => state.user.token);
  




    const DeleteContact = async () => {
        try {
          const res = await axios({
            url: `http://localhost:8080/delectcontact`,
            method: "post",
            params: { contactId: ContactId },
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.status === 200) {
            window.alert("Contact Deleted Successfully");
            handleClose();
            handleRender();
          }
        } catch (e) {
          window.alert("ERROR");
          console.error(e);
        }
      };
    


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '3px solid #000',
        boxShadow: 5,
        p: 4,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={(event) => { event.preventDefault(); }}>
                    <Card sx={{ p: 5 }}>
                        <CardHeader  title="Are you Sure you want to delete this contact?" />
                  
                     

                                  
                     
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Button  onClick={handleClose} variant="contained">Cancel</Button>
                            <Button sx={{backgroundColor:'red'}} onClick={DeleteContact} variant="contained">Delete Contact</Button>
                        </CardActions>
                    </Card>
                </form>
            </Box>
        </Modal>
    );
};

export default DeleteConfirmationModal;