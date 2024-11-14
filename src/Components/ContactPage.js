import { Box, Stack } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomizedButtons from "./CustomButton";
import { Button, Card, Pagination, Typography } from "@mui/material";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import UpdateContactModal from "../modals/UpdateContactModal";
import AddContactModal from "../modals/AddContactModal";
import ManIcon from '../assests/man.png';
import ViewIcon from '../assests/eye.png';
import ViewContactModal from "../modals/ViewContactModal";

export default function ContactPage() {
    const [Contacts, setContacts] = useState([]);
    const [selectedContact, setselectedContact] = useState();
    const [selectedContactId, setselectedContactId] = useState();

    const token = useSelector((state) => state.user.token);
    let Search = useSelector((state) => state.user.Search);
    const userId = useSelector((state) => state.user.userDetails.userId);

    const [isLoaded, setisLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);

    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);
    const handleClose3 = () => setOpen3(false);
    const handleClose4 = () => setOpen4(false);


    const handleOpen = () => setOpen(true);
    const handleOpen2 = (contact) => {
        setselectedContact(contact);
        setOpen2(true);
    };
    const handleOpen4 = (contact) => {
        setselectedContact(contact);
        setOpen4(true);
    };
    const handleOpen3 = (contactId) => {
        setselectedContactId(contactId);
        setOpen3(true);
    };
    const [page, setPage] = useState(1);
    useEffect(() => { ShowContacts(); }, [isLoaded, page]);

    const handleRender = () => setisLoaded(!isLoaded);

    useEffect(() => { ShowContacts(); }, [])
    useEffect(() => { ShowContacts(); }, [Search])

    const handlepageChange = (value) => {
        console.log(value);
        setPage(value);
    };

    const handlePagination = (event, value) => {
        handlepageChange(value);
        ShowContacts();
    }

    const ShowContacts = async () => {
        try {
            const res = await axios({
                url: `http://localhost:8080/showcontacts`,
                method: "get",
                params: { pageNo: page - 1, pageSize: 6, value: Search, userId: userId },
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 200) {
                const formattedContacts = res.data.map(contact => ({
                    profileId: contact.profileId,
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    title: contact.title || "N/A",
                    workEmailAddress: contact.emailAddresses?.workEmail || "N/A",
                    personalEmailAddress: contact.emailAddresses?.personalEmail || "N/A",
                    otherEmailAddress: contact.emailAddresses?.otherEmail || "N/A",
                    homePhoneNumber: contact.phoneNumbers?.homeNumber || 0,
                    personalPhoneNumber: contact.phoneNumbers?.personalNumber || 0,
                    workPhoneNumber: contact.phoneNumbers?.workNumber || 0
                }));
                setContacts(formattedContacts);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box flex={6} sx={{ padding: 2 ,boxShadow: 4, borderRadius: 2 }}>
            <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={103}>
                    <h1>Contact Profiles</h1>
                    <CustomizedButtons OnClickHandle={handleOpen} text="Add Contacts" />
                </Stack>
                <Stack direction="column" spacing={2}>
                    <Box
                        sx={{
                            display: 'grid',
                            gap: 1,
                            gridTemplateColumns: 'repeat(2, 1fr)',
                        }}
                    >
                        {Contacts.map((contact, index) => (
                            <Card sx={{ p: 3, position: 'relative' }} key={index}>
                                <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                                    <Button onClick={ () => handleOpen4(contact)}>
                                        <img style={{ height: 35 }} src={ViewIcon} alt="View Icon" />
                                    </Button>
                                </Box>
                                <Stack direction="row" spacing={2}>
                                    <Button>
                                        <img style={{ width: 60 }} src={ManIcon} alt="User Icon" />
                                    </Button>
                                    <Typography variant="h4" color="text.secondary">
                                        {contact.firstName} {contact.lastName}
                                    </Typography>
                                </Stack>
                                <p>Email: {contact.personalEmailAddress}</p>
                                <p>Phone Number: {contact.homePhoneNumber}</p>
                                <p>Title: {contact.title}</p>
                                <Stack spacing={2} direction="row">
                                    <CustomizedButtons OnClickHandle={() => handleOpen3(contact.profileId)} text="Delete" />
                                    <CustomizedButtons OnClickHandle={() => handleOpen2(contact)} text="Update" />
                                </Stack>
                            </Card>
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Pagination count={10} size="medium" page={page} onChange={handlePagination} />
                    </Box>
                </Stack>
                <AddContactModal open={open} handleRender={handleRender} handleClose={handleClose} />
                {open2 && <UpdateContactModal newdata={selectedContact} handleRender={handleRender} open={open2} handleClose={handleClose2} />}
                {open3 && <DeleteConfirmationModal ContactId={selectedContactId} handleRender={handleRender} open={open3} handleClose={handleClose3} />}
                {open4 && <ViewContactModal newdata={selectedContact} handleRender={handleRender} open={open4} handleClose={handleClose4} />}
    

            </Stack>
        </Box>
    );
}
