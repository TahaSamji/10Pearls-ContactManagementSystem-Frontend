import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import CustomizedButtons from "./CustomButton";
import Logo from '../assests/profile.png';
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_USER } from "../redux/actions/UserAction";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';


export default function ProfilePage() {
    const details = useSelector((state) => state.user.userDetails);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: LOGOUT_USER });
        navigate('/signin');
    };

    return (
        <Box flex={8} sx={{ borderRadius:10,padding: 2, backgroundColor: 'white', height: '100vh', maxHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <Stack direction="column" alignItems="center" spacing={2}>
                    <img style={{ height: 150, maxWidth: '100%', objectFit: 'cover' }} src={Logo} alt="Profile Logo" />
                    <Typography variant="h5">Full Name: {details.name}</Typography>
                    <Typography variant="h5">Email: {details.email}</Typography>
                </Stack>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <CustomizedButtons OnClickHandle={handleOpen} text="Change Password" />
                <CustomizedButtons OnClickHandle={handleLogout} text="Logout" />
            </Box>

            <ChangePasswordModal  open={open} handleClose={handleClose} />
        </Box>
    );
}
