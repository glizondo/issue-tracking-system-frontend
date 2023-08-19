import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants.js";
import { DataGrid } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import TicketAdd from "./TicketAdd.js";
import TicketUpdate from "./TicketUpdate.js";
import { IconButton } from "@mui/material/";
import DeleteIcon from "@mui/icons-material/Delete";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "@inovua/reactdatagrid-enterprise/theme/blue-light.css";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [open, setOpen] = useState(false);
  const onDelClick = (url) => {
    if (window.confirm("Are you sure to delete?")) {
      fetch(SERVER_URL + "/issuetrackingsystem/tickets/" + url, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            fetchTickets();
            setOpen(true);
          } else {
            alert("Something went wrong!");
          }
        })
        .catch((err) => console.error(err));
    }
  };
  const columns = [
    { field: "Ticket_Title__c", headerName: "Title", width: 200 },
    { field: "Status__c", headerName: "Status", width: 100 },
    { field: "Tier__c", headerName: "Tier", width: 200 },
    { field: "Agent__c", headerName: "Agent", width: 100 },
    { field: "Description__c", headerName: "Description", width: 500 },
    { field: "Resolution__c", headerName: "Resolution", width: 500 },
    {
      field: "Ticket_Creation_Date__c",
      headerName: "Ticket Creation Date",
      width: 160,
    },
    {
      field: "ticket.Id",
      headerName: "",
      sortable: false,
      filterable: false,
      width: 20,
      renderCell: (row) => (
        <TicketUpdate data={row} updateTicket={updateTicket} />
      ),
    },
    {
      field: "Id",
      headerName: "",
      sortable: false,
      filterable: false,
      width: 20,
      renderCell: (row) => (
        <IconButton onClick={() => onDelClick(row.id)}>
          <DeleteIcon color="error" />
        </IconButton>
      ),
    },
  ];
  const addTicket = (ticket) => {
    fetch(SERVER_URL + "/issuetrackingsystem/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    })
      .then((response) => {
        if (response.ok) {
          fetchTickets();
        } else {
          alert("Something went wrong!");
        }
      })

      .catch((err) => console.error(err));
  };

  const updateTicket = (ticket) => {
    fetch(SERVER_URL + "/issuetrackingsystem/tickets", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    })
      .then((response) => {
        if (response.ok) {
          fetchTickets();
        } else {
          alert("Something went wrong!");
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTickets();
  }, []);
  const fetchTickets = () => {
    fetch(SERVER_URL + "/issuetrackingsystem/tickets/all")
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((err) => console.error(err));
  };

  return (
    <React.Fragment className="blue-light">
      <TicketAdd addTicket={addTicket} />
      <div className="blue-light" style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={tickets}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={(row) => row.Id}
          sx={{
            boxShadow: 2,
            border: 3,
            borderColor: "terciary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
        />

        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Ticket deleted"
        />
      </div>
    </React.Fragment>
  );
}

export default TicketList;
