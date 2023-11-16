import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import UpdateModel from "./UpdateClientModel";

export default function HandleInvoice() {
  const [clients, setClients] = useState([]);
  const [editClientId, setEditClientId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <button>Add Customer</button>
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
                <td>
                  <button onClick={() => handleEditClick(client._id)}>
                    <FaEdit />
                  </button>
                  <button>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
