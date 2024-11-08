import { Button, Card, Pagination, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomizedButtons from "./CustomButton";
import ManIcon from '../assests/man.png'
import AddContactModal from "../modals/AddContactModal";
import UpdateContactModal from "../modals/UpdateContactModal";
import { useSelector } from "react-redux";

const initialUsers = [
  {
    firstName: "Ali",
    lastName: "Khan",
    workEmailAddress: "ali.work@example.com",
    personalEmailAddress: "ali.personal@example.com",
    otherEmailAddress: "ali.other@example.com",
    profileId: 1,
    homePhoneNumber: 1234567890,
    personalPhoneNumber: 1122334455,
    workPhoneNumber: 2233445566,
    title: "Developer"
  },
  {
    firstName: "Sara",
    lastName: "Ahmed",
    workEmailAddress: "sara.work@example.com",
    personalEmailAddress: "sara.personal@example.com",
    otherEmailAddress: "sara.other@example.com",
    profileId: 2,
    homePhoneNumber: 9876543210,
    personalPhoneNumber: 6655443322,
    workPhoneNumber: 5566778899,
    title: "Designer"
  },
  {
    firstName: "John",
    lastName: "Doe",
    workEmailAddress: "john.work@example.com",
    personalEmailAddress: "john.personal@example.com",
    otherEmailAddress: "john.other@example.com",
    profileId: 3,
    homePhoneNumber: 1112223333,
    personalPhoneNumber: 9988776655,
    workPhoneNumber: 3344556677,
    title: "Manager"
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    workEmailAddress: "jane.work@example.com",
    personalEmailAddress: "jane.personal@example.com",
    otherEmailAddress: "jane.other@example.com",
    profileId: 4,
    homePhoneNumber: 4445556666,
    personalPhoneNumber: 7788990011,
    workPhoneNumber: 5566778899,
    title: "Analyst"
  },
  {
    firstName: "Mike",
    lastName: "Brown",
    workEmailAddress: "mike.work@example.com",
    personalEmailAddress: "mike.personal@example.com",
    otherEmailAddress: "mike.other@example.com",
    profileId: 5,
    homePhoneNumber: 7778889999,
    personalPhoneNumber: 3322110099,
    workPhoneNumber: 6655443322,
    title: "Engineer"
  }
];


export default function MainPage() {
  const [Contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedContact, setselectedContact] = useState();
  const token = useSelector((state) => state.user.token);

  const handleOpen = () => {

    setOpen(true); 
  };
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = (contact) => {
    console.log(contact);
    setselectedContact(contact);
    setOpen2(true); 
  };
  const handleClose2 = () => setOpen2(false);


  useEffect(()=>{ShowContacts()},[]);
  const DeleteContact = async (id) => {
    try {
      const res = await axios({
        url: `http://localhost:8080/delectcontact`,
        method: "post",
        params:{
          contactId:id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
       if(res.status == 200){
        window.alert("Contact Deleted Successfully");
        return;
       }
       } catch (e) {
      window.alert("ERROR");
      console.error(e);
    }
  };

  const ShowContacts = async () => {
    try {
      const res = await axios({
        url: `http://localhost:8080/showcontacts`,
        method: "get",
        params: {
          pageNo: 0,
          pageSize: 4
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
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
        console.log(formattedContacts);
      }
    } catch (e) {
      console.error(e);
    }
  };
  
      
    


  return (

    <Box
      flex={6}
      sx={{



        padding: 2

      }}
    >
      <Stack direction={'column'} spacing={2}>
        <Stack direction={'row'} spacing={103}>

        <h1>User Profiles</h1>
        <CustomizedButtons  OnClickHandle={()=>{handleOpen()}} text={'Add Contacts'}></CustomizedButtons>
        
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)'
          }}
        >

          {Contacts.map((user, index) => (
            <Card sx={{ p: 3, justifyContent: 'center' }} key={index}>
              <Stack direction={'row'} spacing={2}>
              <Button><img style={{width:60}} src={ManIcon}></img></Button>

              <Typography variant="h4" color="text.secondary" alignContent={'center'} justifyContent={'center'} >
                {user.firstName}{' '}{user.lastName}
              </Typography>

              </Stack>

              <p>Email: {user.personalEmailAddress}</p>
              <p>Phone Number: {user.homePhoneNumber}</p>
              <p>Title: {user.title}</p>
              <Stack spacing={2} direction={'row'} >
              <CustomizedButtons  OnClickHandle={()=>{DeleteContact(user.profileId)}} text={'Delete'}></CustomizedButtons>
              <CustomizedButtons OnClickHandle={()=>{handleOpen2(user)}} text={'Update'}></CustomizedButtons>
              </Stack>

            </Card>

          ))}
          <Pagination count={3} size="small" page={2}   />
        </Box>
                
        <AddContactModal open={open} handleClose={()=>handleClose()} ></AddContactModal>
        {open2 && <UpdateContactModal  newdata={selectedContact}  open={open2} handleClose={()=>handleClose2()}></UpdateContactModal>}

      </Stack>


    </Box>

  )
};