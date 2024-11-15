import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography, Card, Grid2,CardHeader, Divider, FormControl, InputLabel, OutlinedInput, CardContent, CardActions } from '@mui/material';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const ChangePasswordModal = ({ open, handleClose }) => {
    const [form, setformData] = useState({
        oldPassword: "",
        newPassword: ""
    });
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        console.log("this is Data", form);
        console.log("this is token", token);
    }, [form]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setformData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const ChangePassword = async () => {
       
        try {
            const res = await axios({
                url: `http://localhost:8080/ChangePassword`,
                method: "post",
                data: form,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); 
            window.alert(res.data.message);
            if (res.status === 200) {
                window.alert(res.data.message);
                handleClose();
                return;
            }         
        } catch (e) {        
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
                        <CardHeader subheader="The information can be edited" title="Change Password" />
                        <Divider />
                        <CardContent>
                            <Grid2 container direction="column" spacing={2}>
                                <Grid2 item xs={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Old Password</InputLabel>
                                        <OutlinedInput
                                            value={form.oldPassword}
                                            label="Old Password"
                                            name="oldPassword"
                                            type='password'
                                            onChange={handleInputChange}
                                        />
                                    </FormControl>
                                </Grid2>
                                <Grid2 item xs={6}>
                                    <FormControl fullWidth required>
                                        <InputLabel>New Password</InputLabel>
                                        <OutlinedInput
                                            value={form.newPassword}
                                            label="New Password"
                                            name="newPassword"
                                            type='password'
                                            onChange={handleInputChange}
                                        />
                                    </FormControl>
                                </Grid2>
                            </Grid2>
                        </CardContent>
                        <Divider />
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            <Button onClick={handleClose} variant="contained">Cancel</Button>
                            <Button onClick={ChangePassword} variant="contained">Confirm</Button>
                        </CardActions>
                    </Card>
                </form>
            </Box>
        </Modal>
    );
};

export default ChangePasswordModal;
