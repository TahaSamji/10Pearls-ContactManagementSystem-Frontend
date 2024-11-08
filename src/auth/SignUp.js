import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid2, Link, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
            console.log("f")
            try {
              
            if(data.email === '' || data.password === '' || data.name === '' ){
              window.alert("Please enter credentials");
              return;
            }
           
           
          
              event.preventDefault();
              const res = await axios({
                
                url: "http://localhost:8080/signup",
                method: "post",
                data: { email: data.email ,password:data.password,name:data.name },
              });
                
              if (res.status === 200){
                window.alert(res.data);
        
                console.log(res.data);
                // getprofile(res.data.token);
                
              
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
                    <Grid2 container justifyContent="flex-end">
                        <Grid2 item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid2>
                    </Grid2>
                </Form>
            </PaperContainer>
            <Box mt={5}>
                {/* <Copyright /> */}
            </Box>
        </Container>
    );
}
