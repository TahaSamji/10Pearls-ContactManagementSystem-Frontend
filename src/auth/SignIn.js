import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid2, Link, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/system';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../redux/actions/UserAction';



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

      const loginSubmit = async (event) => {
        console.log("f")
        try {
          
        if(data.email === '' || data.password === ''){
          window.alert("Please enter credentials");
          return;
        }
          event.preventDefault();
          const res = await axios({
            
            url: "http://localhost:8080/login",
            method: "post",
            data: { email: data.email ,password:data.password },
          });
            
          if (res.status === 200){        
            console.log(res.data);
            localStorage.setItem('jwtToken', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            dispatch(
             
                {
                    type: LOGIN_USER,
                    payload : {token:res.data.token,userDetails:{email:res.data.email,userId:res.data.userId,name:res.data.name}}
            
          });
    
            nav("/");
          
          return; 
        }
          
        } catch (e) {
         
          console.error(e);
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
