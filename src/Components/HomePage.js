import { ThemeProvider, createTheme } from "@mui/material";
import { Stack } from "@mui/system";
import SideBar from "./SideBar";
import Appbar from "./AppBar";
import MainPage from "./MainPage";

import { useDispatch, useSelector } from "react-redux";
import SignIn from "../auth/SignIn.js";
import NavBar from "./AppBar";
import { LOGIN_USER } from "../redux/actions/UserAction.js";
import ContactPage from "./ContactPage.js";

export default function HomePage() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch  = useDispatch();
  const token = localStorage.getItem('jwtToken');
  const userId = localStorage.getItem('userId');

 

  

  return (
    loggedIn ? (
      <Stack
      direction={'row'}
      spacing={2}
      justifyContent={'space-between'}
      sx={{ backgroundColor: '#F3F5F8' }}
    >
      <Stack paddingTop={1} flex={1.5}>
        <SideBar />
      </Stack>
      <Stack
        direction={'column'}
        flex={6}
        spacing={3}
        justifyContent={'space-between'}
        paddingTop={1}
        paddingRight={1}
      >
        <NavBar />
     <MainPage></MainPage>
      </Stack>
    </Stack>
    ) : (
      <SignIn/>
     
    )
  );
}
