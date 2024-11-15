import React, { useRef, useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../assests/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_USER, PAGE_CHANGE } from '../redux/actions/UserAction';
import axios from 'axios';

export default function SideBar() {
    const userId = useSelector((state) => state.user.userDetails.userId);
    const token = useSelector((state) => state.user.token);
    const fileInputRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: LOGOUT_USER });
        navigate('/signin');
    };
    const handleNavigatetoProfilePage = () => {
        dispatch({ type: PAGE_CHANGE, payload: { pagetype: "profilePage" } });
    };
    const handleNavigatetoContactPage = () => {
        dispatch({ type: PAGE_CHANGE, payload: { pagetype: "contactPage" } });
    };
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            ImportContact(file);
            // Reset the file input to allow selecting the same file again
            fileInputRef.current.value = '';
        }        
    };
    const ExportContact = async () => {
        try {
            const res = await axios({
                url: `http://localhost:8080/contactexport`,
                method: "get",
                params: {
                    userId
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                window.alert("Contacts Have been Exported");
                const a = document.createElement('a');
                const file = new Blob([res.data], { type: 'text/vcard' });

                a.href = URL.createObjectURL(file);
                a.download = "Contacts.vcf";
                a.click();

                URL.revokeObjectURL(a.href);
                return;
            }
        } catch (e) {
            console.error(e);
        }
    };
    const ImportContact = async (file) => {
        if (!file) {
            console.error("No file selected");
            return;
        }
        const formData = new FormData();

        formData.append('file',file);
        

        try {
            const res = await axios({
                url: `http://localhost:8080/contactimport`,
                method: "post",
                params: {
                    userId: userId
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
                data: formData
            });

            if (res.status === 200) {
                window.alert("Contacts have been imported successfully!");
                handleNavigatetoContactPage();
            }
        } catch (e) {
            console.error("Error importing contacts:", e);
        }
    };

    return (
        <Box flex={1.5} sx={{ boxShadow: 4, minHeight: 700 }} bgcolor={'white'}>
            <List>
                <img src={Logo} alt="Logo" style={{ padding: 10, width: '80%' }} />
                <Divider sx={{ marginBottom: 2 }} />

                <ListItem disablePadding sx={{ marginBottom: 1.5 }}>
                    <ListItemButton onClick={handleNavigatetoContactPage} sx={{ paddingY: 1.5, paddingX: 3 }}>
                        <ListItemIcon><ContactsIcon /></ListItemIcon>
                        <ListItemText primary="Contacts" sx={{ fontSize: '1rem' }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ marginBottom: 1.5 }}>
                    <ListItemButton onClick={handleNavigatetoProfilePage} sx={{ paddingY: 1.5, paddingX: 3 }}>
                        <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                        <ListItemText primary="My Profile" sx={{ fontSize: '1rem' }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ marginBottom: 1.5 }}>
                    <ListItemButton onClick={ExportContact} sx={{ paddingY: 1.5, paddingX: 3 }}>
                        <ListItemIcon><SubscriptionsIcon /></ListItemIcon>
                        <ListItemText primary="Export Contacts" sx={{ fontSize: '1rem' }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ marginBottom: 1.5 }}>
                    <input
                        accept=".vcf"
                        id="import-file-input"
                        ref={fileInputRef}
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e)=>handleFileSelect(e)}
                    />
                    <ListItemButton sx={{ paddingY: 1.5, paddingX: 3 }}
                        variant="contained"
                        component="span"
                        onClick={() => document.getElementById("import-file-input").click()}
                    >
                        <ListItemIcon><FileUploadIcon /> </ListItemIcon>
                        <ListItemText primary="Import Contacts" sx={{ fontSize: '1rem' }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ marginBottom: 1.5 }}>
                    <ListItemButton onClick={handleNavigatetoProfilePage} sx={{ paddingY: 1.5, paddingX: 3 }}>
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary="Settings" sx={{ fontSize: '1rem' }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ marginBottom: 1.5 }}>
                    <ListItemButton onClick={handleLogout} sx={{ paddingY: 1.5, paddingX: 3 }}>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Logout" sx={{ fontSize: '1rem' }} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
        </Box>
    );
}
