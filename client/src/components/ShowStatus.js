import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {GoogleMap, useJsApiLoader,Marker,Autocomplete,LoadScript,DirectionsRenderer} from '@react-google-maps/api'

const center = {
  lat: 17.3871,
  lng: 78.4916
};
const containerStyle = {
  width: '40rem',
  height: '40rem'
};
const libraries = ['places']

const ShowStatus = (props) => {
  const { state } = useLocation();
  const id = state._id;
  const [employee, setEmployee] = useState([]);
  const [message, setMessage] = useState('');
  const [direcRes,setdirecRes]=useState(null)
  const [dist,setdist]=useState('')
  const [duration,setduration]=useState('')
  const originRef=useRef()
  const destRef=useRef()
  // const {isLoaded}=useJsApiLoader({
  //   googleMapsApiKey:"AIzaSyBaZ4Du0AXqaawvDmHm3lMtkIlYgERGZyI",
  //   libraries,
  // })
  // if(!isLoaded){
  //   console.log("Maps is loading..")
  // }
  //console.log(state)
  async function calculateRoute() {
    if (originRef.current.value === '' || destRef.current.value === '') {
      return
    }
    console.log(originRef.current.value)
    console.log(destRef.current.value)
    //eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setdirecRes(results)
    setdist(results.routes[0].legs[0].distance.text)
    setduration(results.routes[0].legs[0].duration.text)
  }
  const employeedetails = async () => {
    try {
      const res = await fetch("/dispstatus", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id,
        }),
      });
      const data = await res.json();
      setEmployee(data);
    } catch (err) {
      console.log(err);
    }
  };
  const getMessage=async(message)=>{
    //console.log("In get message")
    try {
      const res = await fetch("/displaystatus", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id,
        }),
      });
      const data=await res.json();
      console.log(data.message);
      setMessage(data.message);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    employeedetails();
    getMessage();
  },[]);
  const steps = [
    `Donation has been accepted and initiated by ngo charity employee.`,
    `Charity Employee has picked food from the respective restraunt.`,
    `Food has been donated to the needy people.`,
    `This donation process is now completed.`,
  ];

  const Initiated = () => {
    return (
      <div>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <h6>{label}</h6>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
    );
  };
  const Picked = () => {
    return (
      <div>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={1} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <h6>{label}</h6>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
    );
  };
  const Donated = () => {
    return (
      <div>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={2} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <h6>{label}</h6>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
    );
  };
  const Completed = () => {
    return (
      <div>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={3} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <h6>{label}</h6>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
    );
  };

  const dispemployeename = employee.map((info) => {
    return info.employees.map((i) => {
      return i.name;
    });
  });
  const dispemployeephone = employee.map((info) => {
    return info.employees.map((i) => {
      return i.phone;
    });
  });
  console.log(dispemployeename);
  return (
    
    <div >
      <Container>
      <Row>
        <Col>
        <h1>Assigned Employee</h1>
        <h5>Name: {dispemployeename}</h5>
        <h5>Phone:{dispemployeephone}</h5></Col>
        <Col>
          <h1>Track the location here</h1>
          <Row>
          <Form>
            <Form.Group className="mb-3">
               <Form.Label>Source</Form.Label>
            <Autocomplete>
            <Form.Control type="text" placeholder="Enter source" ref={originRef} />
            </Autocomplete>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Destination</Form.Label>
         <Autocomplete>
         <Form.Control type="text" placeholder="Enter destination" ref={destRef}/>
        </Autocomplete>
      </Form.Group>
      <Button variant="primary" type="button" onClick={calculateRoute}>
        Submit</Button>
      <h3>Distance:{dist}</h3>
      <h3>duration:{duration}</h3>
    </Form>
          </Row>
          <Row>
            <Col>
            {/* <LoadScript googleMapsApiKey="AIzaSyDm4naL49yGJOMekRVU1IipSUrwgTA3piM"  libraries={["places"]} > */}
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
              <Marker position={center}></Marker>
              {direcRes && <DirectionsRenderer directions={direcRes}/>}
            </GoogleMap>
            {/* </LoadScript> */}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
      <div className="statusdetail">
        <h1>Status</h1>
        {(() => {
          if(message==='No status available'){
            return <h3>Donation not yet initiated</h3>
          }
          if (message==='Initiated') {
            
            return <Initiated />;
          } else if (message==='Food picked from Restraunt') {
            return <Picked />;
          } else if (message==='Food Donated to Needy') {
            return <Donated />;
          } else if (message==='Completed!') {
            return <Completed />;
          }
        })()}
        {/* <Completed/> */}
      </div>
    </div>
  );
};

export default ShowStatus;
