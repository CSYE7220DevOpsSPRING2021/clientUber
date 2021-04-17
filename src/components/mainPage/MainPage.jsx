import React, { useState, useContext }  from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import BookingPage from "../Booking/BookingPage"
import DetailPage from "../DetailPage/DetailPage"
import AddBus from "../addBus/AddBus"


const localStorageAuthKey = 'twtr:auth';
function getAccessToken() {
  if (typeof Storage !== 'undefined') {
      try {
        var keys = JSON.parse(localStorage.getItem(localStorageAuthKey));
        return keys.username;
        // the refresh token is keys.refresh

      } catch (ex) {
          console.log(ex);
      }
  } else {
      // No web storage Support :-(
  }
}


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
        Product of Junma & Shams
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const Footer = () => (
    <div className="footer">
      <Copyright/>
    </div>
  );
  

export default function MainPage() {
    const [page, setPage] = useState("BOOKING");
    const bookingSet=(e)=>{
        e.preventDefault();
        setPage("BOOKING");
    }
    const detailSet=(e)=>{
        e.preventDefault();
        setPage("DETAIL");
    }
    const BusSet=(e)=>{
      e.preventDefault();
      setPage("BUS");
  }

  const userType=getAccessToken();
  
  


    return (<>
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Navbar.Brand href="#home">Uber</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link onClick={(event)=>bookingSet(event)}>Booking</Nav.Link>
                    <Nav.Link onClick={(event)=>detailSet(event)}>Detail Page</Nav.Link>
                    {userType=='admin'?<Nav.Link onClick={(event)=>BusSet(event)}>Add Bus</Nav.Link>:''}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        {page=="BOOKING"?<div className='rowHeight' >
        <BookingPage/>
        </div>
        :page=="DETAIL"?<>
        <DetailPage />
        </>:<>
        <AddBus/>
        </>}
        <Footer/>
    </>)
}