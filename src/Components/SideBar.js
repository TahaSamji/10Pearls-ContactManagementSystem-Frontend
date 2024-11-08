import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import HomeImage from '../assets/home.png'
import YouTubeIcon from '@mui/icons-material/YouTube';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import Divider from '@mui/material/Divider';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
export default function SideBar() {


    return (
        <Box flex={1.5} sx={{ boxShadow: 4 }} bgcolor={'white'}>
            <List>
                <Typography variant='h5' component={'div'} sx={{ color: 'black' }}>Contact Management System</Typography>
                <Divider sx={{ paddingTop: 10 }} />
                <ListItem disablePadding>

                    <ListItemButton>
                        <ListItemIcon>
                            {/* <img src={HomeImage} alt="" /> */}
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <YouTubeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Shorts" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SubscriptionsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Subscription" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <Typography paddingLeft={2} paddingTop={2} variant='h6'> You</Typography>
            <List >
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <RecentActorsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Your Channel" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HistoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="History" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <PlaylistPlayIcon />
                        </ListItemIcon>
                        <ListItemText primary="Playlist" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SubscriptionsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Your Videos" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <WatchLaterIcon />
                        </ListItemIcon>
                        <ListItemText primary="Watch Later" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ThumbUpOffAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Liked Videos" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <Typography paddingLeft={2} paddingTop={2} variant='h6'> Explore</Typography>
            <List >
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <WhatshotOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Trending" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <MusicNoteOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Music" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SportsEsportsOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gaming" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            <NewspaperIcon />
                        </ListItemIcon>
                        <ListItemText primary="News" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <EmojiEventsOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sports" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />


        </Box>
    );
}