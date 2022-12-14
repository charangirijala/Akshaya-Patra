import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import PendingIcon from "@mui/icons-material/Pending";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
toast.configure();

const OngoingDonationEmp = (props) => {
  const Navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  const callConfirmPage = async () => {
    try {
      const res = await fetch("/donationinprogress", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callConfirmPage();
  });

  const donationStatus = (e) => {
    let id = e.currentTarget.id;
    Navigate("/donationstatus", { state: id });
  };

  const handleDelete = async (e) => {
    let id = e.currentTarget.id;

    const res = await fetch("/deletedonation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    await res.json();
    if (res.status === 200) {
      toast.success("Deleted!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
        hideProgressBar: true,
      });
    }
  };

  const DisplayData = requests.map((info, i) => {
    return (
      <tr key={i}>
        <td>{info.name}</td>
        <td>{info.address}</td>
        <td>{info.phone}</td>
        <td>{info.items}</td>
        <td style={{ width: 0 }}>
          <Stack direction="row" spacing={2}>
            <Button
              className="btnconfirm"
              variant="contained"
              endIcon={<PendingIcon />}
              id={info._id}
              onClick={donationStatus}
            >
              Update Status
            </Button>
            <Button
              className="btnconfirm"
              variant="contained"
              endIcon={<DeleteIcon />}
              id={info._id}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Stack>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>{DisplayData}</tbody>
        </table>
      </div>
    </>
  );
};

export default OngoingDonationEmp;
