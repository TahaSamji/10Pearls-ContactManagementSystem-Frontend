import axios from 'axios';
import React from 'react';
import { Button, Modal, Card, CardHeader, Divider, FormControl, InputLabel, OutlinedInput, CardContent, CardActions, Grid2 } from '@mui/material';
import { Box } from '@mui/material';

import {  useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';



const AddContactModal = ({ open, handleRender,handleClose }) => {
    const [newContact, setNewContact] = useState({
        firstName: "Mike",
        lastName: "Brown",
        workEmailAddress: "mike@example.com",
        personalEmailAddress: "mike@gmail.com",
        workPhoneNumber: 1122334455,
        homePhoneNumber: 1234567890,
        personalPhoneNumber: 9876543210,
        title: "Engineer"
    });
    const token = useSelector((state) => state.user.token);
  
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewContact((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
   function  Valid(){
    console.log(newContact.homePhoneNumber.toString().length);
    if(newContact.homePhoneNumber.toString().length === 11 && newContact.personalPhoneNumber.toString().length === 11 && newContact.workPhoneNumber.toString().length === 11 ){
      return true;
    }else{
        return false;
    }
   }

    const AddContact = async () => {
        try {
           const isValid =  Valid();
           console.log(isValid);
           if(isValid==false){
            toast.error("Contacts must have 11 digits!", {
                position: "top-right",
             
              });
            return;
           }
        
          const res = await axios({
            url: `http://localhost:8080/addcontact`,
            method: "post",
            data:newContact,
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
           if(res.status == 200){
            handleRender();
            handleClose()
            toast.success(res.data.message, {
              position: "top-right",
           
            });
            return;
           }
           } catch (e) {
           
            toast.error(e.response.data.message, {
              position: "top-right",
              onClose:()=> handleClose()
            });     
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
                        <CardHeader subheader="The information can be edited" title="Add Contact" />
                        <Divider />
                        <CardContent>
                            <Grid2 container spacing={3}>
                                <Grid2 sx={{ marginBottom: 1 }} md={6} xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>First Name</InputLabel>
                                        <OutlinedInput defaultValue={newContact.firstName} value={newContact.firstName} label="First Name" name="firstName" onChange={handleInputChange} />
                                    </FormControl>
                                </Grid2>
                                <Grid2 md={6} xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Last Name</InputLabel>
                                        <OutlinedInput defaultValue={newContact.lastName} onChange={handleInputChange} value={newContact.lastName} label="Last Name" name="lastName" />
                                    </FormControl>
                                </Grid2>
                                <Grid2 md={12} xs={24}>
                                    <FormControl fullWidth>
                                        <InputLabel>Personal Email</InputLabel>
                                        <OutlinedInput label=" Personal Email Address" name="personalEmailAddress" type="text" onChange={handleInputChange} defaultValue={newContact.personalEmailAddress}
                                            value={newContact.personalEmailAddress} />
                                    </FormControl>
                                </Grid2>
                                <Grid2 md={12} xs={24}>
                                    <FormControl fullWidth>
                                        <InputLabel>Work Email</InputLabel>
                                        <OutlinedInput label="Work Email Address" name="workEmailAddress" type="text" onChange={handleInputChange} defaultValue={newContact.workEmailAddress}
                                            value={newContact.workEmailAddress} />
                                    </FormControl>
                                </Grid2>

                                <Grid2 md={6} xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Personal Number</InputLabel>
                                        <OutlinedInput type='Number' defaultValue={newContact.personalPhoneNumber} onChange={handleInputChange} value={newContact.personalNumber} label="Personal Phone Number" name="personalPhoneNumber" />
                                    </FormControl>
                                </Grid2>
                                <Grid2 md={6} xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Work Phone Number</InputLabel>
                                        <OutlinedInput type='Number' defaultValue={newContact.workPhoneNumber} onChange={handleInputChange} value={newContact.workPhoneNumber} label="work Phone Number" name="workPhoneNumber" />
                                    </FormControl>
                                </Grid2>
                                <Grid2 md={6} xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>home Phone Number</InputLabel>
                                        <OutlinedInput type='Number' defaultValue={newContact.homePhoneNumber} onChange={handleInputChange} value={newContact.homePhoneNumber} label="home Phone Number" name="homePhoneNumber" />
                                    </FormControl>
                                </Grid2>

                                <Grid2 md={12} xs={24}>
                                    <FormControl fullWidth>
                                        <InputLabel>Title</InputLabel>
                                        <OutlinedInput label="Title" name="title" type="text" onChange={handleInputChange} defaultValue={newContact.title}
                                            value={newContact.title} />
                                    </FormControl>
                                </Grid2>
                            </Grid2>
                        </CardContent>
                        <Divider />
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Button onClick={handleClose} variant="contained">Cancel</Button>
                            <Button onClick={AddContact} variant="contained">Add Contact</Button>
                        </CardActions>
                    </Card>
                </form>

            </Box>
        </Modal>
    );
};

export default AddContactModal;