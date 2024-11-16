import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid2, Link, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const PaperContainer = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
}));

const Form = styled('form')(({ theme }) => ({
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

export default function SignUp() {
        const nav = useNavigate();
        const [data, setData] = useState({
            email: "",
            password: "",
            name:'',
          });
    
          useEffect(() => {
        
            console.log(data);
          }, [data]);
    
          const handleInputChange = (event) => {
            const { name, value } = event.target;
            setData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
          };
    
          const SignUpSubmit = async (event) => {
            event.preventDefault(); 
            try {
             
              if (data.email === '' || data.password === '' || data.name === '') {
                toast.warn("Please fill in all fields!", {
                  position: "top-right",
                });
                return;
              }
        
              const res = await axios({
                url: "http://localhost:8080/signup",
                method: "post",
                data: { email: data.email, password: data.password, name: data.name },
              });
          
              
              if (res.status === 200) {
                toast.success(res.data.message, {
                  position: "top-right",
                  onClose:() => nav("/signin")
                });

               
                return;
              }
            } catch (error) {
             
              if (error.response &&  error.response.data.message) {
                toast.error(error.response.data.message, {
                  position: "top-right",
                });
              } else {
             
                toast.error("An error occurred. Please try again later.", {
                  position: "top-right",
                });
              }
              console.error(error);
            }
          };
          
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <PaperContainer>
                <StyledAvatar>
                    {/* <LockOutlinedIcon /> */}
                </StyledAvatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Form noValidate>
                 
                        <Grid2 item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                onChange={handleInputChange}
                                value={data.name}
                                autoComplete="name"
                            />
                        </Grid2>
                        <Grid2 item xs={12} sx={{mt:2}}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={handleInputChange}
                                value={data.email}
                                autoComplete="email"
                            />
                        </Grid2>
                        <Grid2 item xs={12} sx={{mt:2}}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                onChange={handleInputChange}
                                value={data.password}
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid2>

                    
                    <Button
                    sx={{mt:2}}
                        type="submit"
                        fullWidth
                        onClick={SignUpSubmit}
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                    <Grid2 container justifyContent="flex-end" marginTop={1}>
                        <Grid2 item>
                        Already have an account?
                            <Link href="/signin" variant="body2">
                               Sign in
                            </Link>
                        </Grid2>
                    </Grid2>
                </Form>
            </PaperContainer>
            <Box mt={5}>
                {/* <Copyright /> */}
            </Box>
            <ToastContainer/>
        </Container>
    );
}
