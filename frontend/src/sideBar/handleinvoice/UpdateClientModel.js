import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateClient = (props) => {
  const { onCancel, clientId, getClientlist } = props;

  const [clientData, setClientData] = useState({});
 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  // const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // alert(isModalOpen);
    getClientDetails();
  }, [clientId]);

  // update client find id--------------------------

  const getClientDetails = async () => {
    let token = localStorage.getItem("token");

    let result = await fetch(
      `http://localhost:4040/user/users/${clientId}`, // Use clientId instead of params._id
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    result = await result.json();
    setName(result.data.name);
    setEmail(result.data.email);
    setMobileNo(result.data.mobileNo);
    setCountry(result.data.country);
    setAddress(result.data.address);
    setPincode(result.data.pincode);

    console.log(result);
  };

  const UpdateClientData = async (req, resp) => {
    try {
      let token = localStorage.getItem("token");
      let result = await fetch(`http://localhost:4040/user/users/${clientId}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          email,
          mobileNo,
          country,
          address,
          pincode,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (result) {
        const data = await result.json();
        console.log(data);
        getClientlist();
        onCancel();
      } else {
        console.error("client update failed:", result.status);
      }
    } catch (error) {
      console.error("Error client product:", error);
    }
  };

  return (
    <div className="update_box">
      <h4>Edit client</h4>
      <hr></hr>

      <label>
        <span>*</span>Name :
      </label>
      <input
        placeholder="Enter Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>
        <span>*</span>Email :
      </label>
      <input
        placeholder="Enter Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>

      <label>
        <span>*</span>Mobile Number :
      </label>
      <input
        placeholder="Enter Mobile Number"
        type="number"
        value={mobileNo}
        onChange={(e) => setMobileNo(e.target.value)}
      ></input>

      <label>
        <span>*</span>Country :
      </label>
      <input
        placeholder="Enter Country Name"
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      ></input>

      <label>
        <span>*</span>Address :
      </label>
      <input
        placeholder="Enter Address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></input>

      <label>
        <span>*</span>Pincode :
      </label>
      <input
        placeholder="Enter Pincode"
        type="number"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      ></input>

      <div className="edit_button">
        <button onClick={() => onCancel()} className="cancel_btn">
          cancel
        </button>
        <button  onClick={UpdateClientData} className="ok_btn">
          OK
        </button>
      </div>
    </div>
  );
};

export default UpdateClient;
