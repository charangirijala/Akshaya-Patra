import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "react-toastify/dist/ReactToastify.css";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


toast.configure();

const EmployeeDetails = (props) => {
  const Navigate = useNavigate();
  const { state } = useLocation();
  const [employees,setEmployees]=useState([]);
  const ids = state;
  const [values, setValues] = useState({
    name: "",
    phone: "",
    id: ids,
  });

  
  const getEmployeeData = async()=>{
    const res=await fetch("/getallemployees",{
      method:"GET",
    })
    const data=await res.json();
    setEmployees(data.employees);
    //console.log(data);
  }

  const postData = async () => {
    const { name, phone, id } = values;

    const res = await fetch("/employeeassign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        id,
      }),
    });
    await res.json();
    if (res.status === 201) {
      toast.success("Employee Assigned Successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
        hideProgressBar: true,
      });
      Navigate("/ngohome")
    }
  };
  const DisplayData=employees.map((info,i)=>{
    return (
      <tr>
        <Container>
        <Row>
          <Col>
          <td><h5>Name: {info.name}</h5>
          <h5>Phone: {info.phone}</h5></td>
          <hr></hr>
          </Col>
          <Col>
            <Button data-value={info} variant="success" onClick={()=>{
              values.name=info.name;
              values.phone=info.phone;
              postData();
            }}>Assign</Button>
          </Col>
        </Row>
        </Container>
      </tr>
    )
  })
  return (
    <div>
      <div className="mb-2">
      <Button onClick={getEmployeeData} variant="primary" >Get Details</Button></div>
      <h3>List of Delivery Executives:</h3>
      <table style={{width:'100%'}}>
        <thead>
        </thead>
        <tbody>
          {DisplayData}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetails;
