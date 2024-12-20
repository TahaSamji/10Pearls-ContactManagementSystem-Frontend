import React, { useState } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, Grid2, Link, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../redux/actions/UserAction';
import { toast } from 'react-toastify';







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
    width: '100%',
    marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

export default function SignIn() {
    const [data, setData] = useState({
        email: "",
        password: "",
      });

      const dispatch = useDispatch();
      const nav = useNavigate();

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const loginSubmit = async (event) => {
        event.preventDefault(); 
        try {
          if (data.email === '' || data.password === '') {
            toast.warn("Please enter credentials!", {
              position: "top-right",
            });
            return;
          }
      
          const res = await axios({
            url: "http://localhost:8080/login",
            method: "post",
            data: { email: data.email, password: data.password },
          });
      
          if (res.status === 200) {
      
            dispatch({
              type: LOGIN_USER,
              payload: {
                token: res.data.token,
                userDetails: { email: res.data.email, userId: res.data.userId, name: res.data.name },
              },
            });
      
  
            nav("/")
            return;
          }
        } catch (error) {
          if (error.response  && error.response.data.message) {
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
                    Sign In
                </Typography>
                <Form noValidate>
                    <Grid2  >
                        <Grid2 item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                onChange={handleInputChange}
                                value={data.email}
                                name="email"
                                autoComplete="email"
                            />
                        </Grid2>
                        <Grid2 item xs={12} sx={{mt:2}} >
                            <TextField 
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="Pasword"
                                name="password"
                                type="password"
                                onChange={handleInputChange}
                                value={data.password}
                                autoComplete="password"
                            />
                        </Grid2>
                    </Grid2>
                    <Grid2 container  sx={{mt:2}}>
                    <Button
                       
                       onClick={loginSubmit}
                       fullWidth
                       variant="contained"
                       color="primary"
                   >
                       Sign In
                   </Button>
                    </Grid2>
                   
                    <Grid2 container justifyContent="flex-end" marginTop={1}>
                        <Grid2 item>
                        Dont have an account? 
                            <Link href="/signup" variant="body2">
                                 SignUp
                            </Link>
                        </Grid2>
                    </Grid2>
                </Form>
            </PaperContainer>
            <Box mt={5}>
            </Box>
        </Container>
    );
}
