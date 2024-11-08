import { ThemeProvider, createTheme } from "@mui/material";
import { Stack } from "@mui/system";
import SideBar from "./SideBar";
import Appbar from "./AppBar";
import MainPage from "./MainPage";

import { useSelector } from "react-redux";
import SignIn from "../auth/SignIn.js";

export default function HomePage() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  console.log(loggedIn)

  return (
    loggedIn ? (
      <Stack
      direction={'row'}
      spacing={2}
      justifyContent={'space-between'}
      sx={{ backgroundColor: '#B1B5C3' }}
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
        <Appbar />
        <MainPage />
      </Stack>
    </Stack>
    ) : (
      <SignIn/>
     
    )
  );
}
