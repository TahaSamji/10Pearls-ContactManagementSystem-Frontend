import React from 'react';
import { AppBar, Box, TextField, Typography, InputAdornment, Stack, Button, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProfileIcon from '../assests/profile.png';
import BellIcon from '../assests/bell.png';


export default function NavBar() {

  return (
    <AppBar position='static' sx={{ backgroundColor: 'white', width: '100wh', justifyContent: 'center' }}>
      <Toolbar  >
        <Stack direction={'row'} spacing={30} alignItems={'center'} >

          <Stack direction={'row'} spacing={60} alignItems={'center'}>
            <Stack direction={'row'} spacing={0.5} alignItems={'flex-start'}>
              <TextField sx={{ borderRadius: '50px', width: 400, "& .MuiInputBase-root": { borderRadius: 45, height: 45 } }} label='Search' />
              <Button sx={{ borderRadius: '50px', borderColor: 'black' }}><SearchIcon></SearchIcon></Button>

            </Stack>
            <Stack alignItems={'self-end'} alignContent={'flex-end'} direction={'row'} >

              {/* <Button>vhvh</Button> */}
              <Button><img style={{width:30}} src={BellIcon}></img></Button>
              <Button><img style={{width:30}} src={ProfileIcon}></img></Button>

            </Stack>
          </Stack>
        </Stack>
      </Toolbar>

    </AppBar>
  );
}