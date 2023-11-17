import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import AddClientModel from "./AddClientModel";
import UpdateModel from "./UpdateClientModel";

export default function HandleInvoice() {
  const [clients, setClients] = useState([]);
  const [editClientId, setEditClientId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    getClientlist();
  };

  const handleOpen = () => {
    setShow(true);
  };

  //Delete client data --------------------------------

  const deleteClientData = async (clientId) => {
    try {
      let token = localStorage.getItem("token");
      let result = await fetch(`http://localhost:4040/user/users/${clientId}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      result = await result.json();
      if (result) {
        getClientlist();
        console.log(result);
      }
    } catch (error) {
      console.log("Error fetching user delete:", error);
    }
  };



  const getClientlist = async () => {
    let token = localStorage.getItem("token");
    try {
      let result = await fetch("http://localhost:4040/user/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      result = await result.json();
      setClients(result.data);
    } catch (error) {
      console.error("Error fetching client list:", error);
    }
  };

  const handleEditClick = (clientId) => {
    setEditClientId(clientId);
  };

  const handleCancelEdit = () => {
    setEditClientId(null);
  };

  useEffect(() => {
    getClientlist();
  }, []);

  return (
    <>
      {editClientId !== null && (
        <UpdateModel
          clientId={editClientId}
          onCancel={handleCancelEdit}
          getClientlist={getClientlist}
        />
      )}
      <div className="handle_invoice">
        <div className="invoice_header">
          <h3>Client Management</h3>
          <input
            className="search_bar"
            type="text"
            placeholder="Search Customer"
          />
          <button type="button" onClick={handleOpen}>
            Add Customer
          </button>
        </div>

        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>MobileNo</th>
              <th>Country</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.mobileNo}</td>
                <td>{client.country}</td>
                <td>{client.address}</td>
                <td>{client.pincode}</td>
                <td className="action_button">
                  <button
                    className="faedit"
                    onClick={() => handleEditClick(client._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="fatrash"
                    onClick={() => deleteClientData(client._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddClientModel show={show} handleClose={handleClose} />
    </>
  );
}
