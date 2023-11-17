import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function AddClintModel({ show, handleClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const [error, setError] = useState(false);

  const addClientData = async () => {
    if (!name || !email || !mobileNo || !country || !address || !pincode) {
      setError(true);
      return false;
    }
    const userId = localStorage.getItem("token")._id;
    let token = localStorage.getItem("token");
    await fetch("http://localhost:4040/user/users", {
      method: "post",
      body: JSON.stringify({
        name,
        email,
        mobileNo,
        country,
        address,
        pincode,
        userId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log("error", error);
      });

    handleClose();
  };

  return (
    <Modal className="addclient_model" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <h3>Create a New Customer</h3>
        <br />
        <hr />
      </Modal.Header>
      <div className="addclient_form">
        <label>
          <span>*</span>Name :
        </label>{" "}
        <br></br>
        <input
          placeholder="Enter Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br />
        {error && !name && <h6 className="error-validate">Enter vaild name</h6>}
        <label>
          {" "}
          <span>*</span>Email :{" "}
        </label>{" "}
        <br></br>
        <input
          placeholder="Enter Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>{" "}
        <br></br>
        {error && !email && (
          <h6 className="error-validate">Enter vaild email</h6>
        )}
        <label>
          {" "}
          <span>*</span>Mobile Number :{" "}
        </label>{" "}
        <br></br>
        <input
          placeholder="Enter Mobile Number"
          type="number"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        ></input>{" "}
        <br></br>
        {error && !mobileNo && (
          <h6 className="error-validate">Enter vaild mobile number</h6>
        )}
        <label>
          {" "}
          <span>*</span>Country :
        </label>{" "}
        <br></br>
        <input
          placeholder="Enter Country Name"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        ></input>{" "}
        <br></br>
        {error && !country && (
          <h6 className="error-validate">Enter vaild country</h6>
        )}
        <label>
          {" "}
          <span>*</span>Address :{" "}
        </label>{" "}
        <br></br>
        <input
          placeholder="Enter Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>{" "}
        <br></br>
        {error && !address && (
          <h6 className="error-validate">Enter vaild address</h6>
        )}
        <label>
          {" "}
          <span>*</span>Pincode :{" "}
        </label>{" "}
        <br></br>
        <input
          placeholder="Enter Pincode"
          type="number"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        ></input>{" "}
        <br></br>
        {error && !pincode && (
          <h6 className="error-validate">Enter vaild pincode</h6>
        )}
      </div>

      <div className="addclient_button">
        <Button
          className="addclient_cancelbutton"
          variant="secondary"
          onClick={handleClose}
        >
          <span> Cancel</span>
        </Button>
        <Button
          className="addclient_okbutton"
          variant="primary"
          onClick={addClientData}
        >
          ok
        </Button>
      </div>
    </Modal>
  );
}
