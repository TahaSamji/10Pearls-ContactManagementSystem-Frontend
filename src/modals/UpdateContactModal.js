// EditProjectModal.js
import axios from 'axios';
import React from 'react';
import { Button, Modal, Typography, Card, CardHeader, Divider, Grid, FormControl, InputLabel, OutlinedInput, CardContent, CardActions, Grid2 } from '@mui/material';
import { Box } from '@mui/material';
// import { useAppSelector } from '@/app/Redux/store';
// import { Project } from './projects';
import { useEffect, useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';



const UpdateContactModal = ({ open,handleRender, handleClose,newdata }) => {

    
    
    const [data, SetNewData] = useState({
        profileId : newdata.profileId,
        firstName: newdata.firstName,
        lastName: newdata.lastName,
        workEmailAddress: newdata.workEmailAddress,
        personalEmailAddress: newdata.personalEmailAddress,
        workPhoneNumber: newdata.workPhoneNumber,
        homePhoneNumber: newdata.homePhoneNumber,
        personalPhoneNumber: newdata.personalPhoneNumber,
        title: newdata.title
    });
        useEffect(() => {

            console.log("this is Data", data);
        }, [data]);

        const handleInputChange = (event) => {
            const { name, value } = event.target;
            SetNewData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        };  
        
        const token  = useSelector((state) => state.user.token);



    const UpdateContact = async () => {
        try {

          const res = await axios({

            url: `http://localhost:8080/updatecontact`,
            method: "post",
            data:data,
            params:{
             contactId:data.profileId
            },
            headers: {
              Authorization: `Bearer ${token}` // Send token in the Authorization header
            }
          });

           if(res.status == 200){
            handleRender();
            handleClose()
            toast.success(res.data.message, {
              position: "top-right",
            });
            return;

           }}
         catch (e) {
            handleClose()
            toast.error(e.response.data.message, {
                position: "top-right",
                 
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
                        <CardHeader subheader="The information can be edited" title="Edit Contact" />
                         <Divider/>
                         <CardContent>
                            <Grid2 container spacing={3}>
                                <Grid2 sx={{ marginBottom: 1 }} md={6} xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>First Name</InputLabel>
                                        <OutlinedInput defaultValue={data.firstName} value={data.firstName} label="First Name" name="firstName" onChange={handleInputChange} />
                                    </FormControl>
                                </Grid2>
                                <Grid2 md={6} xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Last Name</InputLabel>
                                        <OutlinedInput defaultValue={data.lastName} onChange={handleInputChange} value={data.lastName} label="Last Name" name="lastName" />
                                    </FormControl>
                                </Grid2>
                                <Grid2 md={12} xs={24}>
                                    <FormControl fullWidth>
                                        <InputLabel>Personal Email</InputLabel>
                                        <OutlinedInput label=" Personal Email Address" name="personalEmailAddress" type="text" onChange={handleInputChange} defaultValue={data.personalEmailAddress}
                                            value={data.personalEmaiAddressl} />
                                    </FormControl>
                                </Grid2>
                                <Grid2 md={12} xs={24}>
                                    <FormControl fullWidth>
                                        <InputLabel>Work Email</InputLabel>
                                        <OutlinedInput label="Work Email Address" name="workEmailAddress" type="text" onChange={handleInputChange} defaultValue={data.workEmailAddress}
                                            value={data.workEmail} />
                                    </FormControl>
                                </Grid2>

                                <Grid2 md={6} xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Personal Number</InputLabel>
                                        <OutlinedInput type='Number' defaultValue={data.personalPhoneNumber} onChange={handleInputChange} value={data.personalPhoneNumber} label="Personal Phone Number" name="personalPhoneNumber" />
                                    </FormControl>
                                </Grid2>
                                <Grid2 md={6} xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Work Phone Number</InputLabel>
                                        <OutlinedInput type='Number' defaultValue={data.workPhoneNumber} onChange={handleInputChange} value={data.workPhoneNumber} label="work Phone Number" name="workPhoneNumber" />
                                    </FormControl>
                                </Grid2>
                                <Grid2 md={6} xs={12}>
                                    <FormControl fullWidth required>
                                        <InputLabel>home Phone Number</InputLabel>
                                        <OutlinedInput type='Number' defaultValue={data.homePhoneNumber} onChange={handleInputChange} value={data.homePhoneNumber} label="home Phone Number" name="homePhoneNumber" />
                                    </FormControl>
                                </Grid2>

                                <Grid2 md={12} xs={24}>
                                    <FormControl fullWidth>
                                        <InputLabel>Title</InputLabel>
                                        <OutlinedInput label="Title" name="title" type="text" onChange={handleInputChange} defaultValue={data.title}
                                            value={data.title} />
                                    </FormControl>
                                </Grid2>
                            </Grid2>
                        </CardContent>
                
                                
                          
                        <Divider />
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Button onClick={handleClose}  variant="contained">Cancel</Button>
                            <Button  onClick={UpdateContact} variant="contained">Save Details</Button>
                        </CardActions>
                    </Card>
                </form>
            </Box>
        </Modal>
    );
};

export default UpdateContactModal;