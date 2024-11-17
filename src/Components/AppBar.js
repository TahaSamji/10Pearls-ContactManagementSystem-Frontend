import React, {  useState } from 'react';
import { AppBar,  TextField, Stack, Button, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProfileIcon from '../assests/profile.png';
import BellIcon from '../assests/bell.png';
import { useDispatch } from 'react-redux';
import { PAGE_CHANGE, UPDATE_SEARCH } from '../redux/actions/UserAction';


export default function NavBar() {
  const dispatch = useDispatch();
  const [value,setValue] = useState("");

  
  const handleInputChange=(e)=>{
   setValue(e.target.value);
   
  }
  const SearchContact = ()=>{
   
    
    dispatch(
      {
      type:UPDATE_SEARCH,
      payload : {Search:value}
    } )
    
    dispatch(
    {type:PAGE_CHANGE,
      payload:{pagetype:"contactPage"}
    }
    )
    
  }
  
  return (
    <AppBar position='static' sx={{ backgroundColor: 'white', width: '100wh', justifyContent: 'center' }}>
      <Toolbar  >
        <Stack direction={'row'} spacing={30} alignItems={'center'} >

          <Stack direction={'row'} spacing={60} alignItems={'center'}>
            <Stack direction={'row'} spacing={0.5} alignItems={'flex-start'}>
              <TextField onChange={(e)=>handleInputChange(e)} sx={{ borderRadius: '50px', width: 400, "& .MuiInputBase-root": { borderRadius: 45, height: 45 } }} label='Search' />
              <Button onClick={SearchContact} sx={{ borderRadius: '50px', borderColor: 'black' }}><SearchIcon></SearchIcon></Button>

            </Stack>
            <Stack alignItems={'self-end'} alignContent={'flex-end'} direction={'row'} >

            
              <Button><img style={{width:30}} src={BellIcon}></img></Button>
              <Button><img style={{width:30}} src={ProfileIcon}></img></Button>

            </Stack>
          </Stack>
        </Stack>
      </Toolbar>

    </AppBar>
  );
}